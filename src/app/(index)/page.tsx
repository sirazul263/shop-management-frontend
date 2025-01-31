import { cookies } from "next/headers";
import StoreClient from "./client";
import { redirect } from "next/navigation";
const StorePage = () => {
  const cookieStore = cookies();
  const storeId = cookieStore.get("storeId")?.value;
  if (storeId) {
    redirect(`/${storeId}`);
  }
  return <StoreClient />;
};
export default StorePage;
