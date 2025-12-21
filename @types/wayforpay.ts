export type WayforpayTransactionStatus =
  | "Approved"
  | "Pending"
  | "InProcessing"
  | "WaitingAuthComplete"
  | "Declined"
  | "Expired"
  | "Voided"
  | "RefundInProcessing"
  | "Refunded";

export type PaymentData = {
  merchantAccount: string;
  merchantDomainName: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: string;
  amount: string;
  currency: string;
  productName: string[];
  productCount: string[];
  productPrice: string[];
  clientFirstName: string;
  clientLastName: string;
  clientEmail?: string;
  clientPhone: string;
  returnUrl?: string;
  serviceUrl?: string;
  paymentSystems?: string;
  defaultPaymentSystem?: string;
};

export type PaymentCallbackData = {
  merchantAccount: string;
  orderReference: string;
  amount: string;
  currency: string;
  authCode?: string;
  cardPan?: string;
  transactionStatus: WayforpayTransactionStatus | string;
  reasonCode?: string;
  processingDate?: string;
  merchantSignature: string;
};

export type WayforpayCallbackBody = PaymentCallbackData;
