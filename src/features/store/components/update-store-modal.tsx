"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { Store } from "../types";
import { UpdateStoreForm } from "./update-store-form";
import { Dispatch, SetStateAction } from "react";

interface UpdateSoreModalProps {
  data: Store;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const UpdateStoreModal = ({ data, show, setShow }: UpdateSoreModalProps) => {
  return (
    <ResponsiveModal open={show} onOpenChange={setShow}>
      <UpdateStoreForm onCancel={() => setShow(false)} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateStoreModal;
