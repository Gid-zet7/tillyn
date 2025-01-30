"use client";
import React from "react";
import { useGetUsersQuery } from "@/redux/slices/usersApiSlice";
import UserCard from "@/components/user/cards/UserCard";
import LoaderSimple from "@/components/Loader/Loader-simple/page";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";

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

  if (isLoading) content = <LoaderSimple />;

  if (isError) {
    const errorMessage =
      "data" in error && error.data
        ? (error.data as { message?: string })?.message || "An error occurred"
        : "An unknown error occurred";

    content = (
      <section className="flex flex-col items-center justify-center px-2">
        <AlertDestructive message={errorMessage} />
      </section>
    );
  }

  if (isSuccess) {
    const { ids } = users;

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
