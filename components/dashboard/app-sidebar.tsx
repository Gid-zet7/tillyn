"use client";
import { useEffect, useState } from "react";
import { getUsersession } from "@/lib/actions";
import {
  UserCircle2,
  Home,
  ListOrdered,
  Package,
  // Search,
  Settings,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { User2 } from "lucide-react";
import { ChevronUp, ChevronDown } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "http://localhost:3000/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "http://localhost:3000/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "#",
    icon: ListOrdered,
  },
  {
    title: "Users",
    url: "http://localhost:3000/dashboard/users",
    icon: UserCircle2,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [session, setSession] = useState<User>();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getUsersession();
        setSession(userSession);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tillyn</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.title === "Home" ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="flex w-full items-center justify-between">
                        {item.title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <LayoutDashboard />
                              <span>Dashboard</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : item.title === "Products" ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="flex w-full items-center justify-between">
                        {item.title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <Package />
                              <span>All products</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a
                              href={
                                "http://localhost:3000/dashboard/products/new"
                              }
                            >
                              <PlusCircle />
                              <span>Add product</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="p-6">
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`${session?.picture}`} alt="profile" />
                    <AvatarFallback>
                      <User2 />
                    </AvatarFallback>
                  </Avatar>{" "}
                  {session?.first_name || "Username"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <LogoutLink>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] p-4 hover:bg-slate-100 rounded-2xl"
                >
                  {/* <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <span className="p-4 text-red-400"> Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </LogoutLink>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
