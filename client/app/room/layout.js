import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";

export default function Layout({ children }) {
  return (
    <div>
    
    <SidebarProvider>
      <div>
        <AppSidebar />
      </div>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </div>
  );
}
