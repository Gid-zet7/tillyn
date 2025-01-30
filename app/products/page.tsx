"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/components/homepage/Card";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { getProductByCategory } from "@/lib/actions";
import { SkeletonCard } from "@/components/skeleton/Skeleton";

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
  const dispatch = useDispatch();

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
      } catch (error) {
        console.log(error);
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
    return selectedProducts.map((product: Product) => (
      <Card
        key={product._id}
        productId={product._id}
        price={product.price}
        ratings={product.ratings}
        imageSrc={product.image_url}
        title={product.name}
        stock={product.stock}
        addToCart={() => dispatch(addToCart(product))}
      />
    ));
  };

  return (
    <main>
      <section className="lg:flex lg:flex-col w-screen">
        <div className="px-5">
          <div className="relative p-4 md:p-8 border rounded-md">
            <div className="flex flex-wrap gap-3">
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
            <div className="flex gap-3 flex-wrap">
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
                <section className="flex flex-col items-center justify-center">
                  {errorMessage}
                </section>
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
