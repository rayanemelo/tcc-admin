import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type AdminPrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({
  children,
}: Readonly<AdminPrivateLayoutProps>) {

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className="flex items-center justify-between bg-sidebar h-14 w-full border-b border-sidebar-border fixed top-0 z-10 pr-6">
        <SidebarTrigger className="ml-2" />
      </div>
      <main className="w-full pt-20 px-6 h-screen flex flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}
