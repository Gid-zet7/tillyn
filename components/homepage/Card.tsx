import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Card({
  imageSrc,
  // title,
  price,
  // ratings,
  productId,
  stock,
  addToCart,
}: {
  imageSrc: string;
  title: string;
  productId: string;
  addToCart: () => void;
  price?: number;
  ratings?: number;
  stock?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const isDashboard = pathname.includes("dashboard");
  return (
    <div
      style={{ backgroundImage: `url(${imageSrc})` }}
      className={`relative bg-no-repeat bg-cover bg-center cursor-pointer flex w-72 h-72 flex-shrink-0 items-center justify-center p-6 group`}
    >
      {stock === 0 && (
        <span className="absolute bg-red-500 text-white font-semibold text-sm rounded-md px-2 py-1 top-5 left-5">
          out of stock
        </span>
      )}
      {/* Overlay container for hover content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-lg">
        {/* Display price */}
        <p className="text-white text-lg font-semibold mb-2">${price}</p>

        {/* Add to Cart button */}
        <div className=" flex flex-col gap-2">
          {isDashboard ? (
            <Button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200"
              onClick={() =>
                router.push(`/dashboard/products/${productId}/edit`)
              }
            >
              Edit Product
            </Button>
          ) : (
            <Button
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              onClick={() => {
                addToCart();

                toast({
                  title: "Added product to cart ",
                  action: (
                    <ToastAction altText="check">
                      <CheckCircle2 />
                    </ToastAction>
                  ),
                });
              }}
            >
              Add to Cart
            </Button>
          )}
          <Button
            className="bg-black/50 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors duration-200"
            onClick={() => router.push(`${SERVER_URL}/products/${productId}`)}
          >
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
}
