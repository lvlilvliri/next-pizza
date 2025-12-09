import { PaymentData } from "../../@types/wayforpay";



export const openPaymentWidget = (paymentData: PaymentData): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    if (
      typeof window === "undefined" ||
      // @ts-ignore
      typeof window.Wayforpay === "undefined"
    ) {
      return reject(new Error("Wayforpay script is not available on window."));
    }

    // @ts-ignore
    const wayforpay = new window.Wayforpay();

    wayforpay.run(
      {
        merchantAccount: paymentData.merchantAccount,
        merchantDomainName: paymentData.merchantDomainName,
        merchantSignature: paymentData.merchantSignature,
        orderReference: paymentData.orderReference,
        orderDate: paymentData.orderDate,
        amount: paymentData.amount,
        currency: paymentData.currency,
        productName: paymentData.productName,
        productCount: paymentData.productCount,
        productPrice: paymentData.productPrice,
        clientFirstName: paymentData.clientFirstName,
        clientLastName: paymentData.clientLastName,
        clientEmail: paymentData.clientEmail,
        clientPhone: paymentData.clientPhone,
        // returnUrl: куда вернуть пользователя после оплаты (страница успеха/ошибки)
        returnUrl: paymentData.returnUrl,
        // serviceUrl: серверный callback WayForPay -> ваш бекенд
        serviceUrl: paymentData.serviceUrl,
        language: "UA",
      },
      (response: any) => {
        resolve(response);
      },
      (response: any) => {
        console.error("WayForPay declined payment", response);
        reject(new Error("Оплата отклонена"));
      },
      (response: any) => {
        console.log("Pending:", response);
      }
    );
  });
};
