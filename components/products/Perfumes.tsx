"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { SkeletonCard } from "../skeleton/Skeleton";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";
import { getPerfumes } from "@/lib/actions";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function Perfumes() {
  const [perfumes, setPerfumes] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //   const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setIsLoading(true);
        const data = await getPerfumes();
        if (!data) throw new Error("Failed to fetch perfumes");
        setPerfumes(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  if (isLoading) return <SkeletonCard />;
  if (isError) return <AlertDestructive message="Failed to load perfumes" />;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {perfumes.map((item) => (
        <Card key={item._id} className="cursor-pointer relative group">
          <CardContent
            style={{ backgroundImage: `url(${item.image_url})` }}
            className="bg-cover bg-center h-48 md:h-64 rounded-lg flex flex-col items-center justify-end p-4  transition-all duration-300 group-hover:brightness-75"
          >
            <Button variant={"outline"} className="text-sm md:text-lg ">
              ₵{item.price}
            </Button>
            <Button
              className="mt-2 transition-colors duration-300"
              onClick={() => router.push(`${SERVER_URL}/products/${item._id}`)}
            >
              View Product
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
