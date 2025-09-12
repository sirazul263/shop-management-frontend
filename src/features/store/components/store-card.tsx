"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { StoreActions } from "./store-actions";
import { Store } from "../types";
import { SettingsIcon } from "lucide-react";
interface StoreCardProps {
  store: Store;
}
export const StoreCard = ({ store }: StoreCardProps) => {
  const { id, image, name, description, address, phone, status } = store;
  const router = useRouter();
  // Navigate to store details page when clicked
  const handleSelect = () => {
    Cookies.set(
      "store",
      JSON.stringify({
        name: name,
        id: id,
        image: image,
        description: description,
        address: address,
        phone: phone,
      })
    );
    router.push(`/${id}`);
  };
  return (
    <Card className="w-full max-w-md mx-auto shadow-md border">
      {/* Header with Store Image */}
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={image || "./logo.svg"}
            alt={name}
            className="h-full w-full object-cover rounded-t-lg"
            loading="lazy"
            fill
          />
          {status === "ACTIVE" && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Content with Store Info */}
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <StoreActions data={store}>
            <Button variant="ghost" className="size-8 p-0">
              <SettingsIcon className="size-4" />
            </Button>
          </StoreActions>
        </div>

        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-sm mt-3">
          <span className="font-semibold">Address: </span>
          {address}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Phone: </span>
          {phone}
        </p>
      </CardContent>

      {/* Footer with Actions */}
      <CardFooter className="flex justify-between p-4">
        <Button className="w-full ml-2" onClick={handleSelect}>
          Select
        </Button>
      </CardFooter>
    </Card>
  );
};
