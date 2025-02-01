import type { Metadata } from "next";
import Checkout from "@/components/checkout/Checkout";

export const metadata: Metadata = {
  title: `Tillyn | Secure Checkout - Complete Your Purchase`,
  description: `Securely complete your purchase at Tillyn's checkout page. Enjoy a fast, easy, and hassle-free shopping experience. Review your order and proceed to payment with confidence!`,
};

export default function CheckoutPage() {
  return <Checkout />;
}
