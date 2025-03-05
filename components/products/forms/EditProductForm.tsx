"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { useUpdateProductMutation } from "@/redux/slices/productsApiSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import LoaderSimple from "@/components/Loader/Loader-simple/page";
import { getAllCategories } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  productId: string;
};

export default function EditProductForm({ productId }: Props) {
  const { product } = useGetProductsQuery(productId, {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId] as Product | undefined,
    }),
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState<File | string | null>(null);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading product page:", err);
      }
    };

    if (product) {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setRatings(product?.ratings);
      setSize(product?.size);
      setBrand(product?.brand);
      setStock(product?.stock);
      setFile(product?.image_url || null);
      setNewImageSelected(false);
      setCategory(product?.category?.name);
    }
    fetchCategories();
  }, [product]);

  const validateSizeFormat = (value: string) => {
    // Empty is valid as it will be caught by required field validation
    if (!value.trim()) {
      setSizeError("");
      return true;
    }

    // Check if the string follows the format: "S, M, L" or "S,M,L"
    const sizePattern = /^[A-Za-z0-9]+(?:\s*,\s*[A-Za-z0-9]+)*$/;
    const isValid = sizePattern.test(value.trim());

    if (!isValid) {
      setSizeError("Please enter sizes in the correct format (e.g., S, M, L)");
      return false;
    }

    setSizeError("");
    return true;
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSize(value);
    validateSizeFormat(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setNewImageSelected(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate size format before submission
    if (!validateSizeFormat(size)) {
      return;
    }

    const formData = new FormData();
    formData.append("id", productId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("ratings", ratings.toString());
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("stock", stock.toString());
    formData.append("category", category);

    // Only append new image if one was selected
    if (newImageSelected && file instanceof File) {
      formData.append("image", file);
    }

    try {
      const response = await updateProduct(formData).unwrap();
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
      setNewImageSelected(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const categoryOption = categories.map((category, i) => {
    return (
      <SelectItem value={category.name} key={i}>
        {category.name}
      </SelectItem>
    );
  });

  if (isLoading) return <LoaderSimple />;

  return (
    <>
      <div className="flex flex-col-reverse w-full md:w-[60rem] px-4 md:px-0">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold my-4 grid place-content-center mt-6">
            Edit product
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="mb-4 flex gap-10">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold mb-2 text-xs"
                >
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="block font-semibold text-xs mb-2"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-2 border rounded"
                  // placeholder="enter your last name..."
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  value={price}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-semibold text-xs mb-2"
              >
                Product description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded min-h-[100px]"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
              <div>
                <label
                  htmlFor="ratings"
                  className="block font-semibold mb-2 text-xs"
                >
                  Rating <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ratings?.toString()}
                  onValueChange={(value) => setRatings(parseFloat(value))}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select rating</SelectLabel>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="4.5">4.5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block font-semibold mb-2 text-xs"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select category</SelectLabel>
                      {categoryOption}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
              <div>
                <label
                  htmlFor="size"
                  className="block font-semibold mb-2 text-xs"
                >
                  Available size(s) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    id="size"
                    className={`w-full p-2 border rounded ${
                      sizeError ? "border-red-500" : ""
                    }`}
                    onChange={handleSizeChange}
                    value={size}
                    placeholder="Enter sizes separated by commas (e.g. S, M, L, XL)"
                  />
                  {sizeError ? (
                    <p className="text-xs text-red-500">{sizeError}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Enter sizes separated by commas (e.g. S, M, L, XL)
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="stock"
                  className="block font-semibold text-xs mb-2"
                >
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full p-2 border rounded"
                  // placeholder="enter your last name..."
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                  value={stock}
                  required
                />
              </div>
            </div>

            <div>
              <div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
                  <Label htmlFor="picture">Picture</Label>

                  {file && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500">Current Image:</p>
                      <Image
                        src={
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file)
                        }
                        alt="Current Product"
                        className="h-32 w-32 object-cover border rounded-md"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}

                  <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full py-6 rounded-md"
              >
                Save
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="w-full bg-black/50 py-6 rounded-md"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
