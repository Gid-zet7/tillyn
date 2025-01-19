import { Card } from "@/components/ui/card";
import React from "react";

export default function LoaderSimple() {
  return (
    <div>
      <Card className="fixed flex justify-center items-center max-w-2xl rounded-3xl py-4 bg-white w-20 md:w-fit p-4 md:p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <span className="loader "></span>
      </Card>
      <div className="overlay"></div>
    </div>
  );
}
