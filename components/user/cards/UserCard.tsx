import React from "react";
import { useGetUsersQuery } from "@/redux/slices/usersApiSlice";
import { EntityId } from "@reduxjs/toolkit";
import Link from "next/link";

type Props = {
  userId: EntityId;
};

export default function UserCard({ userId }: Props) {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId] as User | undefined,
    }),
  });

  if (user) {
    return (
      <div>
        <Link href={`users/${user.email}`}>{user.first_name}</Link>
      </div>
    );
  }
}
