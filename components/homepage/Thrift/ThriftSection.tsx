import React from "react";
import Card from "../Card";
import { Button } from "../../ui/button";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { getProductByCategory } from "@/lib/actions";
import { ThriftSkeletonCard } from "./ThriftSkeleton";
import ParallaxText from "@/components/ParallaxText";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";

const minera = localFont({
  src: "../../../app/fonts/Minera-Extrabold.otf",
  // weight: "100 900",
});

export default function ThriftSection() {
  const [allThrift, setAllThrift] = React.useState<Product[]>([]);
  const [thriftWomenProducts, setThriftWomenProducts] = React.useState<
    Product[]
  >([]);
  const [thrifMenProducts, setThrifMenProducts] = React.useState<Product[]>([]);
  const [showAllThrift, setShowAllThrift] = React.useState(true);
  const [showWomenThrift, setShowWomenThrift] = React.useState(false);
  const [showMenThrift, setShowMenThrift] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();

  const toggleAllThrift = () => {
    setShowAllThrift((prevState) => !prevState);
    setShowMenThrift(false);
    setShowWomenThrift(false);
  };
  const toggleWomenThrift = () => {
    setShowWomenThrift((prevState) => !prevState);
    setShowAllThrift(false);
    setShowMenThrift(false);
  };
  const toggleMenThrift = () => {
    setShowMenThrift((prevState) => !prevState);
    setShowAllThrift(false);
    setShowWomenThrift(false);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        const fetchPromises = [
          getProductByCategory("Women Thrift"),
          getProductByCategory("Men Thrift"),
        ];
        const [WomenThrift, MenThrift] = await Promise.all(fetchPromises);

        setThriftWomenProducts(WomenThrift);
        setThrifMenProducts(MenThrift);
        setAllThrift(WomenThrift.concat(MenThrift));
        setIsSuccess(true);
      } catch {
        setIsError(true);
        setErrorMessage("Failed to fetch thrift products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  let content;
  if (isLoading)
    content = (
      <section className="h-screen snap-start flex flex-col items-center justify-center">
        <ThriftSkeletonCard />
      </section>
    );

  if (isError)
    content = (
      <section className="h-screen snap-start flex flex-col items-center justify-center">
        <div className="max-w-6xl">
          <AlertDestructive message={errorMessage} />
        </div>
      </section>
    );

  if (isSuccess)
    content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 1,
          delay: 0.3,
        }}
        className="h-screen snap-start flex flex-col justify-center items-center bg-black overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.5,
            mass: 1,
            delay: 0.3,
          }}
          className={`${minera.className} h-screen snap-start flex flex-col justify-center items-center bg-black text-white`}
        >
          <ParallaxText baseVelocity={-1}>
            FASHION STANS AND FLY KINGS ? *
          </ParallaxText>
          <ParallaxText baseVelocity={1}>NOT THE SAME BLUEPRINT *</ParallaxText>
        </motion.div>
        <div className="px-5 lg:max-w-7xl w-full">
          <div className="relative p-4 md:p-8 border rounded-md">
            <div className="flex gap-3">
              <Button className="mb-6">Thrift</Button>
              <Button className="mb-6" onClick={toggleAllThrift}>
                All
              </Button>
              <Button className="mb-6" onClick={toggleMenThrift}>
                Men
              </Button>
              <Button className="mb-6" onClick={toggleWomenThrift}>
                Women
              </Button>
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-3 md:p-6">
              {showAllThrift ? (
                allThrift.map((product: any, index) => (
                  <Card
                    key={index}
                    productId={product._id}
                    price={product.price}
                    ratings={product.ratings}
                    imageSrc={product.image_url}
                    title={product.name}
                    stock={product.stock}
                    addToCart={() => dispatch(addToCart(product))}
                  />
                ))
              ) : showWomenThrift ? (
                thriftWomenProducts.map((product: any, index) => (
                  <Card
                    key={index}
                    productId={product._id}
                    price={product.price}
                    ratings={product.ratings}
                    imageSrc={product.image_url}
                    title={product.name}
                    stock={product.stock}
                    addToCart={() => dispatch(addToCart(product))}
                  />
                ))
              ) : showMenThrift ? (
                thrifMenProducts.map((product: any, index) => (
                  <Card
                    key={index}
                    productId={product._id}
                    price={product.price}
                    ratings={product.ratings}
                    imageSrc={product.image_url}
                    title={product.name}
                    stock={product.stock}
                    addToCart={() => dispatch(addToCart(product))}
                  />
                ))
              ) : (
                <h1>Oops.. something went wrong!</h1>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {content}
    </div>
  );
}
