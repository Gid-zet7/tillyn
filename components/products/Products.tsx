"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { getProductByCategory } from "@/lib/actions";
import { SkeletonCard } from "@/components/skeleton/Skeleton";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Define the structure of the products state
type ProductsState = {
  [key: string]: {
    [key: string]: Product[];
  };
};

// Define the structure of the activeCategory state
interface ActiveCategory {
  type: keyof typeof categories;
  category: string;
}

// Define the categories structure
const categories = {
  Men: ["Tops", "Shorts", "Pants", "Outerwear", "Top and Down set"],
  Women: ["Tops", "Bottoms", "Dresses", "Outerwear"],
} as const;

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsState>({});
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>({
    type: "Men",
    category: "Tops",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const fetchPromises = categories[activeCategory.type].map((cat) =>
          getProductByCategory(`${activeCategory.type} ${cat}`)
        );
        const results = await Promise.all(fetchPromises);
        const data = Object.fromEntries(
          categories[activeCategory.type].map((cat, index) => [
            cat,
            results[index] as Product[],
          ])
        );
        setProducts((prev) => ({ ...prev, [activeCategory.type]: data }));
      } catch {
        setIsError(true);
        setErrorMessage("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const renderProducts = (category: string) => {
    const selectedProducts = products[activeCategory.type]?.[category] || [];
    return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedProducts.map((item: Product) => (
          <Card key={item._id} className="cursor-pointer relative group">
            <CardContent
              style={{ backgroundImage: `url(${item.image_url})` }}
              className="bg-cover bg-center h-48 md:h-64 rounded-lg flex flex-col items-center justify-end p-4 text-white transition-all duration-300 group-hover:brightness-75"
            >
              <h3 className="text-sm md:text-lg font-bold">{item.name}</h3>
              <Button
                variant={"outline"}
                className="text-sm md:text-lg text-black"
              >
                ₵{item.price}
              </Button>
              <Button
                className="bg-white text-black mt-2 hover:text-white"
                onClick={() =>
                  router.push(`${SERVER_URL}/products/${item._id}`)
                }
              >
                View Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    );
  };

  return (
    <main>
      <section className="lg:flex lg:flex-col w-screen">
        <div>
          <div className="relative md:p-8 border rounded-md">
            <div className="flex flex-wrap gap-3 p-2">
              {Object.keys(categories).map((type) => (
                <Button
                  key={type}
                  variant={"outline"}
                  className={`mb-6 ${
                    activeCategory.type === type ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveCategory({
                      type: type as keyof typeof categories,
                      category: "Men",
                    })
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
            <hr className="my-5" />
            <div className="flex gap-3 flex-wrap p-2">
              {categories[activeCategory.type].map((category) => (
                <Button
                  key={category}
                  variant={"outline"}
                  className={`mb-6 ${
                    activeCategory.category === category ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveCategory((prev) => ({ ...prev, category }))
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <hr className="my-5" />
            <div className="flex overflow-x-scroll lg:overflow-x-hidden lg:flex-wrap scrollbar-hide space-x-4 p-3 md:p-6 lg:space-y-3">
              {isLoading ? (
                <SkeletonCard />
              ) : isError ? (
                <AlertDestructive message={errorMessage} />
              ) : (
                renderProducts(activeCategory.category)
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
