import { DottedSeparator } from "@/components/dotted-separator";
import AnalyticsCard from "./analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AnalyticsType } from "../types";

interface AnalyticsProps {
  data: AnalyticsType | null;
}
export const Analytics = ({ data }: AnalyticsProps) => {
  if (!data) return null;
  return (
    <div>
      <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
        <div className="w-full flex flex-row">
          <div className="flex items-center flex-1">
            <AnalyticsCard
              title={"Total Category"}
              value={data.categories}
              variant={3 > 0 ? "up" : "down"}
              increaseValue={3}
            />
            <DottedSeparator direction="vertical" />
          </div>

          <div className="flex items-center flex-1">
            <AnalyticsCard
              title={"Total Brands"}
              value={data.brands}
              variant={3 > 0 ? "up" : "down"}
              increaseValue={3}
            />
            <DottedSeparator direction="vertical" />
          </div>

          <div className="flex items-center flex-1">
            <AnalyticsCard
              title={"Total Products"}
              value={data.products}
              variant={1 > 0 ? "up" : "down"}
              increaseValue={1}
            />
            <DottedSeparator direction="vertical" />
          </div>

          <div className="flex items-center flex-1">
            <AnalyticsCard
              title={"Total Suppliers"}
              value={data.suppliers}
              variant={-1 > 0 ? "up" : "down"}
              increaseValue={-1}
            />
            <DottedSeparator direction="vertical" />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="my-10">
        <p className="mb-4 text-xl font-bold">Purchase Summary</p>
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
          <div className="w-full flex flex-row">
            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Purchase Today"}
                value={data.totalPurchaseToday}
                variant={3 > 0 ? "up" : "down"}
                increaseValue={3}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Amount"}
                value={data.totalPurchaseAmountToday}
                variant={3 > 0 ? "up" : "down"}
                increaseValue={3}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Purchase This Month"}
                value={data.totalPurchasesThisMonth}
                variant={1 > 0 ? "up" : "down"}
                increaseValue={1}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Amount"}
                value={data.totalPurchaseAmountThisMonth}
                variant={-1 > 0 ? "up" : "down"}
                increaseValue={-1}
              />
              <DottedSeparator direction="vertical" />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="my-10">
        <p className="mb-4 text-xl font-bold">Sales Summary</p>
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
          <div className="w-full flex flex-row">
            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Sale Today"}
                value={data.totalSalesToday}
                variant={3 > 0 ? "up" : "down"}
                increaseValue={3}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Amount"}
                value={data.totalSalesAmountToday}
                variant={3 > 0 ? "up" : "down"}
                increaseValue={3}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Sales This Month"}
                value={data.totalSalesThisMonth}
                variant={1 > 0 ? "up" : "down"}
                increaseValue={1}
              />
              <DottedSeparator direction="vertical" />
            </div>

            <div className="flex items-center flex-1">
              <AnalyticsCard
                title={"Total Amount"}
                value={data.totalSalesAmountThisMonth}
                variant={-1 > 0 ? "up" : "down"}
                increaseValue={-1}
              />
              <DottedSeparator direction="vertical" />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
