"use client";
import { useEffect, useState } from "react";
import { getUsersession } from "@/lib/actions";
import {
  UserCircle2,
  Home,
  ListOrdered,
  Package,
  PlusCircle,
  LayoutDashboard,
  UserCircleIcon,
} from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import Link from "next/link";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Menu items.
const items = [
  {
    title: "Home",
    url: `${SERVER_URL}/dashboard`,
    icon: Home,
  },
  {
    title: "Products",
    url: `${SERVER_URL}/dashboard/products`,
    icon: Package,
  },
  {
    title: "Orders",
    url: `${SERVER_URL}/dashboard/orders`,
    icon: ListOrdered,
  },
  {
    title: "Users",
    url: `${SERVER_URL}/dashboard/users`,
    icon: UserCircle2,
    adminOnly: true, // Add a flag to indicate admin-only items
  },
  {
    title: "Profile",
    url: "#",
    icon: UserCircleIcon,
  },
];

export function AppSidebar() {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isAdmin = !isLoading && getPermission("admin")?.isGranted;
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
          <Link href={"/"}>
            <SidebarGroupLabel>Tillyn</SidebarGroupLabel>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Skip rendering admin-only items if the user is not an admin
                if (item.adminOnly && !isAdmin) return null;

                return item.title === "Home" ? (
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
                            <Link href={item.url}>
                              <LayoutDashboard />
                              <span>Dashboard</span>
                            </Link>
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
                            <Link href={item.url}>
                              <Package />
                              <span>All products</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href={`${SERVER_URL}/dashboard/products/new`}>
                              <PlusCircle />
                              <span>Add product</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : item.title === "Orders" ? (
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
                            <Link href={item.url}>
                              <ListOrdered />
                              <span>All Orders</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : item.title === "Users" ? (
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
                            <Link href={item.url}>
                              <User2 />
                              <span>Users</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`${SERVER_URL}/profile/${session?.preferred_email}`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
