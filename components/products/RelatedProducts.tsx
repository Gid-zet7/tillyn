import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/slices/cartSlice";
import { getProductByCategory } from "@/lib/actions";

import Card from "../homepage/Card";
import { ThriftSkeletonCard } from "../homepage/Thrift/ThriftSkeleton";

type Props = {
  productId: string;
  category: string;
};

export default function RelatedProducts({ productId, category }: Props) {
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();
  // const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const relatedProductsData = await getProductByCategory(category);
        setRelatedProducts(relatedProductsData);
      } catch {
        setIsError(true);
        setErrorMessage("Failed to fetch");
      } finally {
        setIsLoading(false);
        setIsSuccess(true);
      }
    };
    fetchCategories();
  }, [category]);

  const filteredRelatedProducts = relatedProducts.filter((item) => {
    return item._id !== productId;
  });

  let content;

  if (isLoading)
    content = (
      <section className="flex flex-col items-center justify-center mt-20 md:mt-40">
        <ThriftSkeletonCard />
      </section>
    );
  if (isError)
    content = (
      <section className="flex flex-col items-center justify-center">
        {errorMessage}
      </section>
    );

  if (isSuccess)
    content = (
      <section className=" mt-20 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <div className="px-5 lg:max-w-7xl">
          <div className="relative p-8 border rounded-md">
            <div className="text-2xl font-bold mb-6 text-black/50">
              You may also like
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-6">
              {filteredRelatedProducts.map(
                (relatedProduct: Product, index: number) => (
                  <Card
                    key={index}
                    productId={relatedProduct._id}
                    price={relatedProduct.price}
                    ratings={relatedProduct.ratings}
                    imageSrc={relatedProduct.image_url}
                    title={relatedProduct.name}
                    addToCart={() => dispatch(addToCart(relatedProduct))}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    );
  return <div>{content}</div>;
}
