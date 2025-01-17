"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "./mobile-sidebar";
import { UserButton } from "@/features/auth/components/user-button";
const pathnameMap = {
  categories: {
    title: "Categories",
    description: "View all of your categories",
  },
  brands: {
    title: "Brands",
    description: "View all of your brands",
  },
  members: {
    title: "All Members",
    description: "All the members of your project",
  },
  suppliers: {
    title: "Suppliers",
    description: "View all of your suppliers",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your products",
};

const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey =
    pathname.split("/").length === 2
      ? (pathnameParts[1] as keyof typeof pathnameMap)
      : (pathnameParts[2] as keyof typeof pathnameMap);
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;
  return (
    <nav className="pt-4 px-6 flex justify-between items-center">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
export default Navbar;
