"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarMenuOption, AppSidebarMenuItem } from "./app-sidebar-menu-item";
import { AlertDialog } from "../alert-dialog/alert-dialog";

const items: SidebarMenuOption[] = [
  {
    title: "Análise de Alagamentos",
    url: "/alagamentos",
    icon: "Waves",
  },
  {
    title: "Mapa",
    url: "/mapa",
    icon: "Map",
  },
  {
    title: "Notificações",
    url: "/notificacoes",
    icon: "Bell",
  },
  {
    title: "Perguntas Frequentes",
    url: "/perguntas-frequentes",
    icon: "TableOfContents",
  },
  {
    title: "Suporte",
    url: "/suporte",
    icon: "Info",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="mt-14">
        <SidebarGroup className="h-full">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarMenuItem key={item.title} {...item} />
              ))}
              <AlertDialog
                title="Você tem certeza?"
                description="Deseja realmente sair?"
                onConfirmNavigateTo="/"
              >
                <AppSidebarMenuItem key="Sair" title="Sair" icon="LogOut" />
              </AlertDialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
