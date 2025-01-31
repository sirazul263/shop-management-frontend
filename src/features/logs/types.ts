export type Log = {
  id: number;
  operation: string;
  type: string;
  remark: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
};
