import React from "react";
import { useGetUsersQuery } from "@/redux/slices/usersApiSlice";
import { EntityId } from "@reduxjs/toolkit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

type Props = {
  userId: EntityId;
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UserCard({ userId }: Props) {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId] as User | undefined,
    }),
  });

  if (user) {
    const last_name_initial = user.last_name
      .split(" ")
      .filter((word: string) => word.length > 0)
      .map((word: string) => word[0].toUpperCase())
      .join("");

    const first_name_initial = user.first_name
      .split(" ")
      .filter((word: string) => word.length > 0)
      .map((word: string) => word[0].toUpperCase())
      .join("");

    return (
      <TableRow key={user._id}>
        <TableCell className="font-medium">
          <Link href={`${SERVER_URL}/dashboard/users/${user.email}`}>
            <Avatar className="w-8 h-8">
              <AvatarImage src={`${user.picture}`} alt="profile" />
              <AvatarFallback>
                {first_name_initial} {last_name_initial}
              </AvatarFallback>
            </Avatar>
          </Link>
        </TableCell>
        <TableCell className="font-medium">{user.first_name}</TableCell>
        <TableCell>{user.last_name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone_number || "N/A"}</TableCell>
        <TableCell>{user.address?.address_line1 || "N/A"}</TableCell>
        <TableCell>{user.address?.address_line2 || "N/A"}</TableCell>
        <TableCell>{user.address?.city || "N/A"}</TableCell>
      </TableRow>
    );
  }
}
