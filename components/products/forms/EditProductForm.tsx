"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { useUpdateProductMutation } from "@/redux/slices/productsApiSlice";

type Props = {
  productId: string;
};

export default function EditProductForm({ productId }: Props) {
  const { product } = useGetProductsQuery(productId, {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setRatings(product?.ratings);
      setSize(product?.size);
      setBrand(product?.brand);
      setStock(product?.stock);
      setFile(product?.image_url);
      setCategory(product?.category);
    }
  }, [product]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("id", productId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("ratings", ratings.toString());
      formData.append("size", size);
      formData.append("brand", brand);
      formData.append("stock", stock.toString());
      formData.append("category", category);
      formData.append("image", file);
    } else {
      console.error("No file selected");
      console.log("Please select a product image");
    }
    try {
      const response = await updateProduct(formData).unwrap();
      console.log("Product updated successfully:", response);

      // Reset form state
      setName("");
      setDescription("");
      setPrice(0);
      setRatings(0);
      setSize("");
      setBrand("");
      setStock(0);
      setCategory("");
      setFile(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const categories = ["Men", "Women"];

  const categoryOption = categories.map((category, i) => {
    return <option key={i}> {category} </option>;
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="lg:w-3/4 px-4 md:px-10 flex-1 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold my-4 grid place-content-center mt-6">
            Edit product
          </h1>
          <form onSubmit={handleSubmit} className="w-full lg:w-3/5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Product name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-semibold text-xs mb-2 text-black"
              >
                Product description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block font-semibold text-xs mb-2 text-black"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                className="w-full p-2 border rounded text-black"
                // placeholder="enter your last name..."
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ratings"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Rating <span className="text-red-500">*</span>
              </label>
              <select
                id="ratings"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setRatings(Number(e.target.value))}
                value={ratings}
              >
                <option>--Select rating--</option>
                <option>4</option>
                <option>4.5</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Available size(s) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="size"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setSize(e.target.value)}
                value={size}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Your Brand Label <span className="text-red-500">*</span>
              </label>
              <select
                id="brand"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              >
                <option>--Select status--</option>
                <option>Tillyn</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block font-semibold text-xs mb-2 text-black"
              >
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                className="w-full p-2 border rounded text-black"
                // placeholder="enter your last name..."
                onChange={(e) => setStock(Number(e.target.value))}
                value={stock}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>--Select category--</option>
                {categoryOption}
              </select>
            </div>
            <div>
              <div>
                <div className="flex flex-col items-center justify-center p-5">
                  <input
                    onChange={handleFileChange}
                    id="files"
                    type="file"
                    accept="image/*"
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-700 py-6 text-white rounded-md"
              >
                Add Product
              </button>
              <button
                type="button"
                className="w-full bg-black/50 py-6 text-white rounded-md"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
