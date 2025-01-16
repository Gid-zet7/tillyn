"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/actions";

type Props = {
  email: string;
};

export default function UserProfile({ email }: Props) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(email);
        setUser(userData);
      } catch (err) {
        console.error("Error loading user page:", err);
      }
    };

    fetchData();
  }, [email]);

  return (
    <>
      <main>
        <div>
          <h1>{user?.email}</h1>
        </div>
      </main>
    </>
  );
}
