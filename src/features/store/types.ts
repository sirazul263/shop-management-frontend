export type Store = {
  id: string;
  image: string | null;
  name: string;
  description: string;
  address: string;
  phone: string;
  status: string;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
};
