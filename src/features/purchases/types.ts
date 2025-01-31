export type Purchase = {
  id: number;
  total: string;
  supplier_id: number;
  discount_type: string | null;
  discount_amount: string | null;
  payment_method: string;
  payment_status: PaymentStatus;
  notes: string | null;
  purchase_date: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  supplier: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
  };
  items: [
    {
      id: number;
      quantity: number;
      total_amount: string;
      unit_amount: string;
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
    }
  ];
  created_at: string;
  updated_at: string;
};

export enum PaymentStatus {
  PAID = "PAID",
  DUE = "DUE",
  UNPAID = "UNPAID",
}
