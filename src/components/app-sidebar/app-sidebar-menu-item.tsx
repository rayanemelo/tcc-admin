"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  Bell, Map,
  Waves, Info,
  TableOfContents,
  LogOut
} from "lucide-react";

const menuIconMap = {
  Waves,
  Map,
  Bell,
  TableOfContents,
  Info,
  LogOut,
};

type MenuIconMap = keyof typeof menuIconMap;

export type SidebarMenuOption = {
  title: string;
  url?: string;
  icon: MenuIconMap;
};

type Props = React.ComponentProps<typeof ShadcnSidebarMenuItem> &
  SidebarMenuOption;

const AppSidebarMenuItem = React.forwardRef<HTMLLIElement, Props>(
  ({ url, title, icon, ...props }, ref) => {
    const pathname = usePathname();
    const isSelected = (url: string) => pathname === url;
    const IconComponent = menuIconMap[icon as keyof typeof menuIconMap];

    const renderTitle = (title: string) => (
      <>
        <IconComponent />
        <span>{title}</span>
      </>
    );
    return (
      <ShadcnSidebarMenuItem
        {...props}
        ref={ref}
        className={twMerge(
          url && isSelected(url) ? "bg-sidebar-primary/10 rounded-md" : ""
        )}
      >
        <SidebarMenuButton asChild>
          {url ? (
            <a href={url}>{renderTitle(title)}</a>
          ) : (
            <span className="cursor-pointer">{renderTitle(title)}</span>
          )}
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);

AppSidebarMenuItem.displayName = "AppSidebarMenuItem";

export { AppSidebarMenuItem };
