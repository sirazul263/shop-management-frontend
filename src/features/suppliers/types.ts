export type Supplier = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
};
