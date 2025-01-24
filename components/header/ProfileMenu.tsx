"use client";
import Link from "next/link";
import * as React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const ProfileMenu = ({ session }: any) => {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isAdmin = !isLoading && getPermission("admin")?.isGranted;
  const last_name_initial = session.last_name
    .split(" ")
    .filter((word: string) => word.length > 0)
    .map((word: string) => word[0].toUpperCase())
    .join("");

  const first_name_initial = session.first_name
    .split(" ")
    .filter((word: string) => word.length > 0)
    .map((word: string) => word[0].toUpperCase())
    .join("");

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
              <AvatarImage src={`${session?.picture}`} alt="profile" />
              <AvatarFallback>
                {first_name_initial} {last_name_initial}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`http://localhost:3000/profile/${session.preferred_email}`}
              >
                Profile
              </Link>
            </DropdownMenuItem>
            {isAdmin ? (
              <Link href={"http://localhost:3000/dashboard"}>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
            ) : null}
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Log out</LogoutLink>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ProfileMenu;
