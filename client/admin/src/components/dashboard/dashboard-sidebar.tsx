import { forwardRef, type ComponentProps } from "react";

// react router
import { NavLink, useLocation } from "react-router";

// framer motion
import { motion } from "framer-motion";

// react icons
import { MdLogout } from "react-icons/md";

// Hooks
import { useAppNavigate } from "@/hooks/use-app-navigate";

// ICON
import { FabricFusionIcon } from "@/icons";

// shadcn/ui
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../library/shadcn-components/ui/sidebar";

// data
import { dashboardSidebarData } from "@/data/dashboard-sidebar-data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DashboardSidebar = forwardRef<ComponentProps<typeof Sidebar>>((props, _ref) => {
  const { goTo } = useAppNavigate();

  const { pathname } = useLocation();

  return (
    <Sidebar {...props} className="!border-none">
      <SidebarHeader>
        <motion.button layout onClick={() => goTo("/dashboard")} className="flex w-full cursor-pointer flex-col items-center justify-center">
          <FabricFusionIcon className="size-22" />

          <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.125 }}>
            <span className="font-della-respira flex text-xs font-semibold">Fabric Fusion</span>
          </motion.div>
        </motion.button>
      </SidebarHeader>

      <SidebarContent className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {dashboardSidebarData.map((item, index) => {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel className="font-della-respira uppercase">{item.title}</SidebarGroupLabel>

              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {item.items.map((subItem, indexTwo) => {
                    return (
                      <SidebarMenuItem key={indexTwo}>
                        <SidebarMenuButton
                          asChild
                          className="group/menu-button hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 font-della-respira h-9 gap-3 rounded-md bg-gradient-to-r font-medium hover:bg-transparent [&>svg]:size-auto"
                          isActive={pathname === subItem.url}
                        >
                          <NavLink to={subItem.url} role="link">
                            {subItem.icon ? (
                              <div className="text-lg">
                                <subItem.icon className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary size-5" aria-hidden="true" focusable="false" />
                              </div>
                            ) : null}

                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-border mx-2 -mt-px border-t" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 h-9 cursor-pointer gap-3 rounded-md bg-gradient-to-r font-medium hover:bg-transparent [&>svg]:size-auto">
              <MdLogout className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary" size={22} aria-hidden="true" focusable="false" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});

export default DashboardSidebar;
