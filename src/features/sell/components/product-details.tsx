import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/features/products/types";
import { numberWithCommas } from "@/lib/utils";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product | undefined;
}
export const ProductDetails = ({ product }: ProductDetailsProps) => {
  if (!product) {
    return null;
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2 ">
            {product.image && (
              <div className="size-16 relative rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt="Image"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium leading-none pb-1">
              {product.brand.name} {product.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              ৳ {numberWithCommas(product.sell_price)} (Selling Price)
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Category</Label>
          <Input
            id="width"
            defaultValue={product.category.name}
            className="col-span-2 h-8"
            disabled
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Purchase Price</Label>
          <Input
            id="maxWidth"
            defaultValue={`৳ ${numberWithCommas(product.price)}`}
            className="col-span-2 h-8"
            disabled
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">In Stock</Label>
          <Input
            id="maxWidth"
            defaultValue={product.quantity}
            className="col-span-2 h-8"
            disabled
          />
        </div>{" "}
      </div>
    </div>
  );
};
