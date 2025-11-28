import * as React from "react";

interface Props {
  orderId: number;
  totalAmount?: number;
  paymentUrl: string;
}

export function PayOrderTemplate({
  orderId,
  totalAmount,
  paymentUrl,
}: Props) {
  return (
    <div>
      <h1>Order #{orderId}</h1>

      <p>
        Pay for the order in the amount of <b>{totalAmount}</b> ₴. Follow{" "}
        <a href={paymentUrl}>this link</a> to pay.
      </p>
    </div>
  );
}
