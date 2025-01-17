export type Brand = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  image: string | null;
};
