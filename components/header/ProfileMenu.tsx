"use client";
import * as React from "react";
// import { signIn, signOut } from "next-auth/react";
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
// import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";
// import Avatar from "@mui/material/Avatar";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

const ProfileMenu = ({ session }: any) => {
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //   null
  // );

  // const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseProfileMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const router = useRouter();
  const last_name_initial = session.last_name
    .split(" ")
    .filter((word: string) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join("");

  const first_name_initial = session.first_name
    .split(" ") // Split the name by spaces
    .filter((word: string) => word.length > 0) // Remove any empty strings
    .map((word) => word[0].toUpperCase()) // Get the first letter of each word and convert to uppercase
    .join("");

  return (
    <>
      <div>
        {/* <Tooltip title="Open profile menu"> */}
        {/* <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}> */}

        {/* </IconButton> */}
        {/* </Tooltip> */}
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
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
