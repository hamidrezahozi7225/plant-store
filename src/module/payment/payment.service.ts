import axios from "axios";
// import zarinpal from "../../lib/zarinpal";
import { PaymentRequestSchema } from "./payment.schema";
import { PaymentModel } from "./payment.model";
import { BasketModel } from "../basket/basket.model";
import { OrderModel } from "../order/order.model";

const zarinpal = axios.create({
  baseURL: "https://sandbox.zarinpal.com/pg/v4",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

export const PaymentRequestService = async (dto: PaymentRequestSchema) => {
  const { amount, userId } = dto;
  console.log("miad inja");
  const res = await axios.post(
    "https://sandbox.zarinpal.com/pg/v4/payment/request.json",
    {
      merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      amount,
      callback_url: "http://localhost:3001/payment/verify",
      referrer_id: "xxxx",
      description: "Transaction description.",
      metadata: {
        mobile: "09121234567",
        email: "info.test@gmail.com",
      },
    },
  );

  if (res?.data?.data?.code === 100) {
    const authority = res?.data?.data.authority;
    const redirectUrl = `https://sandbox.zarinpal.com/pg/StartPay/${authority}`;
    await PaymentModel.create({
      amount,
      userId,
      authority: res?.data?.data?.authority,
    });
    return {
      redirectUrl,
    };
  } else return false;
};

export const PaymentVerifyService = async (
  authority: string,
  status: "OK" | "NOK",
) => {
  if (status === "OK") {
    const payment = await PaymentModel.findOne({ authority });
    if (!payment) throw new Error("payment not found");
    try {
      const { data: result } = await zarinpal.post("/payment/verify.json", {
        merchant_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        amount: payment.amount,
        authority: authority,
      });

      if (
        result.data &&
        (result.data.code === 100 || result.data.code === 101)
      ) {
        const basket = await BasketModel.find({ userId: payment.userId });
        if (!basket.length) throw new Error("basket not found");

        payment.card_pan = result.data.card_pan;
        payment.ref_id = result.data.ref_id;
        payment.amount = result.data.fee;

        await OrderModel.create({
          products: basket,
        });
        await BasketModel.deleteMany({ userId: payment.userId });

        await payment.save();
        return { ref_id: result.data.ref_id, card_pan: result.data.card_pan };
      } else {
        const errorMsg = result.errors?.message || "Verification failed";
        throw new Error(
          `Zarinpal error (code ${result.errors?.code}): ${errorMsg}`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
};
