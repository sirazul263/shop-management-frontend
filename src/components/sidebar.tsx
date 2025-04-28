"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { DottedSeparator } from "./dotted-separator";
import Navigation from "./navigation";
import {
  BadgeDollarSign,
  BarcodeIcon,
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
import { GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const homeRoutes = [
    {
      label: "Home",
      href: "",
      icon: <GoHome className="size-5 text-neutral-500" />,
      activeIcon: <GoHomeFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Sell",
      href: "sells/create",
      icon: <BadgeDollarSign className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Purchase",
      href: "purchases/create",
      icon: <BarcodeIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Product",
      href: "products/create",
      icon: <ShoppingCartIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
  ];

  const historyRoutes = [
    {
      label: "Purchase History",
      href: "purchases",
      icon: <ShoppingBagIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Sales History",
      href: "sells",
      icon: <WeightIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Product List",
      href: "products",
      icon: <ShoppingCartIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
  ];

  const others = [
    {
      label: "Categories",
      href: "categories",
      icon: <ChartBarStacked className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Brands",
      href: "brands",
      icon: <HexagonIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },

    {
      label: "Suppliers",
      href: "suppliers",
      icon: <Code className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Logs",
      href: "logs",
      icon: <Logs className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Settings",
      href: "settings",
      icon: <SettingsIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
    {
      label: "Users",
      href: "users",
      icon: <UserIcon className="size-5 text-neutral-500" />,
      activeIcon: <GoCheckCircleFill className="size-5 text-neutral-500" />,
    },
  ];

  const [storeName, setStoreName] = useState<string>("");
  useEffect(() => {
    const store = Cookies.get("store");
    if (store) {
      setStoreName(JSON.parse(store).name);
    }
  }, []);

  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <div className="flex items-center">
          <p className="font-bold">{storeName}</p>
        </div>
      </Link>
      <DottedSeparator className="mt-4" />
      <Navigation routes={homeRoutes} />
      <DottedSeparator className="my-4" />
      <Navigation routes={historyRoutes} />
      <DottedSeparator className="my-4" />
      <Navigation routes={others} />
    </aside>
  );
};
export default Sidebar;
