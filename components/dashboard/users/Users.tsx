"use client";
import React, { useState } from "react";
import { useGetUsersQuery } from "@/redux/slices/usersApiSlice";
import UserCard from "@/components/user/cards/UserCard";
import LoaderSimple from "@/components/Loader/Loader-simple/page";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Users() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = ids.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(ids.length / usersPerPage);

    content = (
      <>
        <Table className="w-2/5 md:w-4/5 border-collapse border border-gray-300 shadow-lg rounded-lg overflow-x-auto">
          {/* <TableCaption className="text-lg font-semibold py-4"></TableCaption> */}
          <TableHeader className="">
            <TableRow className="border-b border-gray-300">
              <TableHead className="w-[150px] p-4">Avatar</TableHead>
              <TableHead className="w-[150px] p-4 text-left">
                First Name
              </TableHead>
              <TableHead className="p-4 ">Last Name</TableHead>
              <TableHead className="p-4 ">Email</TableHead>
              <TableHead className="p-4 ">Phone</TableHead>
              <TableHead className="p-4 ">Address line 1</TableHead>
              <TableHead className="p-4 ">Address line 2</TableHead>
              <TableHead className="p-4 ">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((userId) => (
              <UserCard key={userId} userId={userId} />
            ))}
          </TableBody>
          <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <div className="flex justify-center gap-4 items-center">
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  <span className="text-sm font-medium ">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>
    );
  }
  return (
    <main className="p-6">
      <div className="w-screen">{content}</div>
    </main>
  );
}
