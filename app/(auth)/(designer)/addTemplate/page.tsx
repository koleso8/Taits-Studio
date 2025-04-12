"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { addProduct } from "../../../actions/product-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialNav } from "@/components/SocialNav";
import { Loader2 } from "lucide-react";

// Определяем тип Product на клиенте
interface Product {
  id: number;
  title: string;
  category: string;
  author: string;
  isFree: boolean;
  price: number;
  format: string;
  dimensions: string;
  size: string;
  image: string;
  downloads: number;
  isTemplate: boolean;
  createdAt: string;
}

export default function AddProductPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Обработчик изменения файла для предпросмотра
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 32 * 1024 * 1024) {
        setMessage({ type: "error", text: "Файл занадто великий (макс. 32 МБ)" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const price = Number(formData.get("price")) || 0;
    formData.set("isFree", price === 0 ? "true" : "false"); // Устанавливаем isFree в зависимости от цены

    try {
      const result = await addProduct(formData);

      if (result.success && result.newProduct) {
        const storedProducts = localStorage.getItem("user-products");
        let userProducts: Product[] = [];

        if (storedProducts) {
          try {
            userProducts = JSON.parse(storedProducts);
          } catch (error) {
            console.error("Failed to parse stored products:", error);
          }
        }

        userProducts.push(result.newProduct);
        localStorage.setItem("user-products", JSON.stringify(userProducts));

        setMessage({ type: "success", text: result.message });
        setPreview(null);
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при додаванні продукту" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Flower image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/auth_page.png"
          alt="Beautiful flower with soft cream and pink petals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-6 left-6">
          <div className="flex flex-col">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                className="object-cover"
                width={98}
                height={52}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-20">
        <div className="w-full max-w-md">
          <div className="md:hidden text-black font-bold mb-6">
            <div className="flex flex-col">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  className="object-cover"
                  width={98}
                  height={52}
                />
              </Link>
            </div>
          </div>

          <div className="min-h-screen flex flex-col justify-center">
            <h1 className="text-center font-bold text-gray-800 text-3xl md:text-4xl tracking-tight mb-6">
              ВВЕДІТЬ ДАНІ ПРО НОВИЙ ШАБЛОН
            </h1>

            {message && (
              <div
                className={`p-3 mb-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Скрытые поля для категории и автора */}
              <input type="hidden" name="category" value="Графіка" />
              <input type="hidden" name="author" value="tait.tss" />

              <div className="space-y-2">
                <Label htmlFor="title">Назва роботи</Label>
                <Input id="title" name="title" required className="border-gray-300 rounded-md" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Завантажте файл</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="border-gray-300 rounded-md"
                />
                {preview && (
                  <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2">
                    <img
                      src={preview}
                      alt="Preview"
                      className=" h-auto max-w-96 rounded-md border-4 shadow-2xl"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Формат</Label>
                <Input
                  id="format"
                  name="format"
                  defaultValue="PNG"
                  className="border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Параметри в пікселях</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  defaultValue="1512 x 982 px"
                  className="border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Розмір</Label>
                <Input
                  id="size"
                  name="size"
                  defaultValue="1 MB"
                  className="border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Ціна в грн</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue="0"
                  className="border-gray-300 rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-yellow-400 text-gray-800 hover:bg-yellow-500 text-xl font-bold rounded-md transition-all ease-linear duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Завантаження...
                  </>
                ) : (
                  "ЗАВАНТАЖИТИ НОВИЙ ШАБЛОН"
                )}
              </Button>
            </form>

            <div className="mt-8">
              <SocialNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}