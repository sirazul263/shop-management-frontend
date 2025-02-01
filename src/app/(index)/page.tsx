import { cookies } from "next/headers";
import StoreClient from "./client";
import { redirect } from "next/navigation";
const StorePage = () => {
  const cookieStore = cookies();
  const store = cookieStore.get("store")?.value;
  if (store) {
    const storeId = JSON.parse(store).id;
    redirect(`/${storeId}`);
  }
  return <StoreClient />;
};
export default StorePage;
