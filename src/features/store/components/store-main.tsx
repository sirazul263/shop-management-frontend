"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StoreCard } from "./store-card";
import { Store } from "../types";
import { useCreateStoreModal } from "../hooks/use-create-store-modal";
import CreateStoreModal from "./create-store-modal";
import { AlertCircle } from "lucide-react";
interface StoreCardProps {
  stores: Store[];
}
export const StoreMain = ({ stores }: StoreCardProps) => {
  const { open } = useCreateStoreModal();
  return (
    <div>
      <CreateStoreModal />
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" height={40} width={40} alt="Logo" />{" "}
            <p className="ms-1">Amirul Telecom</p>
          </div>
          <Button onClick={open}>Create New Store</Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          <h1 className="text-4xl font-bold text-center text-neutral-900">
            Amirul Telecom
          </h1>
          <p className="text-lg text-center text-neutral-600">
            Manage your store easily with this simple application.
          </p>
        </div>
        {stores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {stores.map((store: Store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">
                  No store found
                </h2>
                <p className="text-gray-500">
                  Please create a new store to continue
                </p>
              </div>
              <Button onClick={open}>Create New Store</Button>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
