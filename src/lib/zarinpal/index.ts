import ZarinPal from "zarinpal-node-sdk";

const zarinpal = new ZarinPal({
  merchantId: "your-merchant-id",
  sandbox: true,
});

export default zarinpal;
