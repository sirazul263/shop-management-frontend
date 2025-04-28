"use client";

import { useStoreId } from "@/hooks/use-store-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface NavigationProps {
  routes: {
    label: string;
    href: string;
    icon: ReactNode;
    activeIcon: ReactNode;
  }[];
}

const Navigation = ({ routes }: NavigationProps) => {
  const pathname = usePathname();
  const storeId = useStoreId();
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/${storeId}/${item.href}`;
        const isActive = pathname === fullHref;
        const icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-1.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              {icon}
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
export default Navigation;
