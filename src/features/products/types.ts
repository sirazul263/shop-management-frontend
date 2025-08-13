export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  brand_id: string;
  price: string;
  sell_price: number;
  quantity: number;
  imeis: {
    id: number;
    imei: string;
  }[];
  user: {
    id: number;
    name: string;
    email: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
  };
  brand: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
  };
  created_at: string;
  updated_at: string;
  image: string | null;
};
