import { PaymentStatus } from "../purchases/types";

export type Sell = {
  id: number;
  invoice_id: string;
  total: string;
  supplier_id: number;
  name: string;
  phone: string;
  address: string;
  discount_type: string | null;
  discount_amount: string | null;
  payment_method: string;
  payment_status: PaymentStatus;
  notes: string | null;
  total_paid: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  items: {
    id: number;
    quantity: number;
    total_amount: string;
    unit_amount: string;
    imei: string | null;
    product: {
      id: number;
      slug: string;
      name: string;
      quantity: number;
      sell_price: string | null;
      image: string | null;
      category: {
        id: number;
        name: string;
        image: string | null;
      };
      brand: {
        id: number;
        name: string;
        image: string | null;
      };
    };
  }[];
  created_at: string;
  updated_at: string;
};
