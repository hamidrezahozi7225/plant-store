import { UserModel } from "../auth/auth.model";
import { AddChargeWalletType } from "./wallet.schema";
import zarinpal from "../../lib/zarinpal";
import { WalletModel } from "./wallet.model";
import { PaymentModel } from "../payment/payment.model";

export const AddChargeWalletService = async (
  userId: string,
  dto: AddChargeWalletType,
) => {
  const { amount } = dto;
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("user not found");

  console.log("user", user);

  const res = await zarinpal.post("/payment/request.json", {
    merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    amount,
    callback_url: "http://localhost:3001/wallet/verify",
    referrer_id: "xxxx",
    description: "Transaction description.",
    metadata: {
      mobile: "09121234567",
      email: "info.test@gmail.com",
    },
  });

  if (res?.data?.data?.code === 100) {
    const authority = res?.data?.data.authority;
    const redirectUrl = `https://sandbox.zarinpal.com/pg/StartPay/${authority}`;
    await PaymentModel.create({
      amount,
      userId,
      authority,
    });
    return {
      redirectUrl,
    };
  } else return false;
};

export const VerifyWalletVerifyService = async (
  Authority: string,
  status: "OK" | "NOK",
) => {
  try {
    const Payment = await PaymentModel.findOne({ authority: Authority });
    if (!Payment) throw new Error("not found paymnet");

    const { data: result } = await zarinpal.post("/payment/verify.json", {
      merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      amount: Payment.amount,
      authority: Authority,
    });
    if (status === "OK") {
      if (
        result.data &&
        (result.data.code === 100 || result.data.code === 101)
      ) {
        Payment.card_pan = result.data.card_pan;
        Payment.ref_id = result.data.ref_id;
        const wallet = await WalletModel.findOne({ userId: Payment.userId });
        if (!wallet) {
          await WalletModel.create({
            userId: Payment.userId,
            amount: Payment.amount,
          });
        } else {
          wallet.amount = Payment.amount + (wallet.amount ?? 0);
          await wallet.save();
        }
        Payment.amount = result.data.fee;
        await Payment.save();
        return { ref_id: result.data.ref_id, card_pan: result.data.card_pan };
      }
    } else {
      const errorMsg = result.errors?.message || "Verification failed";
      throw new Error(
        `Zarinpal error (code ${result.errors?.code}): ${errorMsg}`,
      );
    }
  } catch (error) {
    throw error;
  }
};
