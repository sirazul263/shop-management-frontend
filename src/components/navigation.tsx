"use client";

import { useStoreId } from "@/hooks/use-store-id";
import { cn } from "@/lib/utils";
import {
  ChartBarStacked,
  Code,
  HexagonIcon,
  Logs,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  WeightIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Categories",
    href: "categories",
    icon: ChartBarStacked,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Brands",
    href: "brands",
    icon: HexagonIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Products",
    href: "products",
    icon: ShoppingCartIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Purchase History",
    href: "purchases",
    icon: ShoppingBagIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Sales History",
    href: "sells",
    icon: WeightIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "New Sale",
    href: "sells/create",
    icon: WeightIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Suppliers",
    href: "suppliers",
    icon: Code,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Logs",
    href: "logs",
    icon: Logs,
    activeIcon: UserIcon,
  },
  {
    label: "Settings",
    href: "settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Users",
    href: "users",
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

const Navigation = () => {
  const pathname = usePathname();
  const storeId = useStoreId();
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/${storeId}/${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
export default Navigation;
