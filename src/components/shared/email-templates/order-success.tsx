import React from "react";
import { CartItemDTO } from "../../../../shared/services/dto/cart.dto";

interface Props {
  className?: string;
  orderId?: number;
  totalAmount?: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({
  className,
  orderId,
  totalAmount,
  items,
}) => {
  return (
    <div className={className}>
      <h1>Thanks for paying your order! </h1>
      <p>Your order #${orderId} has been payed successfully. Items list: </p>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productVariant.product.name} - Quantity: {item.quantity} -
            Price: {item.productVariant.price} UAH
          </li>
        ))}
      </ul>
      <p>Total Amount: {totalAmount} UAH</p>
    </div>
  );
};
