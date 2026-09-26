import { CategoryModel } from "./category.model";
import { CreateCategoryType, UpdateCategoryType } from "./category.schema";

export const CreateCategoryService = async (dto: CreateCategoryType) => {
  const { name, parentId, slug } = dto;
  const ExsitsCategory = await CategoryModel.findOne({ slug });
  if (ExsitsCategory) {
    throw new Error("Category already exists");
  }

  if (parentId) {
    const parentCategory = await CategoryModel.findById(parentId);
    if (!parentCategory) throw new Error("Parent Category does not exists");
    const category = await CategoryModel.create({
      name,
      slug,
      parentId,
      parentsId: [...(parentCategory.parentsId ?? []), parentId],
    });
    parentCategory.subCategories = [
      ...parentCategory.subCategories,
      category._id,
    ];
    await parentCategory.save();
    return true;
  }

  await CategoryModel.create({
    name,
    slug,
  });
  return true;
};

export const GetCategoryService = async () => {
  const Categories = await CategoryModel.find({
    parentsId: { $size: 0 },
  }).populate({
    path: "subCategories",
    populate: {
      path: "subCategories", // go deeper if needed
    },
  });
  console.log("Cate", Categories);
  return Categories;
};

export const UpdateCategoryService = async (
  id: string,
  dto: UpdateCategoryType,
) => {
  const { name, slug, parentId } = dto;

  const category = await CategoryModel.findById(id);
  if (!category) throw new Error("Category not found");

  // 1. آپدیت slug (با چک تکراری)
  if (slug && slug !== category.slug) {
    const slugExists = await CategoryModel.findOne({
      slug,
      _id: { $ne: category._id },
    });
    if (slugExists) throw new Error("Slug already exists");
    category.slug = slug;
  }

  // 2. آپدیت name
  if (name) category.name = name;

  // 3. مدیریت والد (فقط اگه parentId توی dto ارسال شده)
  if (parentId !== undefined) {
    const oldParentId = category.parentId?.toString() ?? null;
    const newParentId = parentId?.toString() ?? null;

    // فقط وقتی والد واقعاً عوض شده
    if (oldParentId !== newParentId) {
      // الف) جدا کردن از والد قبلی
      if (oldParentId) {
        await CategoryModel.findByIdAndUpdate(oldParentId, {
          $pull: { subCategories: category._id },
        });
      }

      // ب) تبدیل به ریشه
      if (newParentId === null) {
        category.parentId = null;
        category.parentsId = [];
      }
      // ج) وصل کردن به والد جدید
      else {
        const newParent = await CategoryModel.findById(newParentId);
        if (!newParent) throw new Error("Parent category not found");

        // چک چرخه: والد جدید نباید خودش یا یکی از نوادگانش باشه
        if (
          newParent._id.equals(category._id) ||
          newParent.parentsId.some((p) => p.equals(category._id))
        ) {
          throw new Error("Cannot set a descendant as parent (cycle detected)");
        }

        category.parentId = newParent._id;
        category.parentsId = [...newParent.parentsId, newParent._id];

        // اضافه کردن به subCategories والد جدید (بدون تکرار)
        await CategoryModel.findByIdAndUpdate(newParentId, {
          $addToSet: { subCategories: category._id },
        });
      }
    }
  }

  await category.save();
  return true;
};

export const DeleteCategoryService = async (id: string) => {
  const category = await CategoryModel.findById(id);
  if (!category) throw new Error("category not Found");

  if (!!category.parentId) {
    await CategoryModel.findByIdAndUpdate(category.parentId, {
      $pull: { subCategories: category._id },
    });
  }
  await CategoryModel.deleteOne({ _id: id });
  return true;
};
