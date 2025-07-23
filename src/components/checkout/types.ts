// components/checkout/types.ts
export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  img: string;
};

// Renomeamos o tipo para OrderSummaryData para evitar conflito
export type OrderSummaryData = {
  tax: number;
  subtotal: number;
  iva: number;
  total: number;
};

export type PaymentMethod = 'card' | 'wallet' | 'paypal' | 'qrcode' | null;