"use client";
import React from "react";
import { useGetUsersQuery } from "@/redux/slices/usersApiSlice";
import UserCard from "@/components/user/cards/UserCard";

export default function UsersPage() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <div className="loader-container">
        <h1>Loading...</h1>
      </div>
    );

  if (isError) {
    console.log(error);
    content = <p className="errmsg">error </p>;
  }

  if (isSuccess) {
    const { ids } = users;
    console.log(users);

    content =
      ids?.length &&
      ids.map((userId) => <UserCard key={userId} userId={userId} />);
  }
  return (
    <main>
      <div>{content}</div>
    </main>
  );
}
