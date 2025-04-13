"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialNav } from "@/components/SocialNav";
import { Loader2, Upload } from "lucide-react";
import { addProduct } from "@/app/actions/product-actions";

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
  const [fileSize, setFileSize] = useState<string>("0 KB");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  // Загрузка текущего пользователя и проверка авторизации
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Обработчик изменения файла для предпросмотра и вычисления размера
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 32 * 1024 * 1024) {
        setMessage({ type: "error", text: "Файл занадто великий (макс. 32 МБ)" });
        setPreview(null);
        setFileSize("0 KB");
        return;
      }

      const sizeInKB = file.size / 1024;
      let formattedSize: string;

      if (sizeInKB < 1024) {
        formattedSize = `${sizeInKB.toFixed(2)} KB`;
      } else {
        const sizeInMB = sizeInKB / 1024;
        formattedSize = `${sizeInMB.toFixed(2)} MB`;
      }

      setFileSize(formattedSize);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileSize("0 KB");
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const price = Number(formData.get("price")) || 0;
    formData.set("isFree", price === 0 ? "true" : "false");

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

        setMessage({ type: "success", text: "Шаблон успішно додано" });
        setPreview(null);
        setFileSize("0 KB");
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: "Помилка при додаванні шаблону" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при додаванні шаблону" });
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

          <div className="min-h-screen flex flex-col justify-between pt-10">
            <h1 className="text-center font-bold text-gray-800 text-3xl md:text-4xl tracking-tight mb-6">
              ВВЕДІТЬ ДАНІ ПРО НОВИЙ ШАБЛОН
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-auto">
              {/* Скрытое поле для автора */}
              <input
                type="hidden"
                name="author"
                value={currentUser?.nicname || currentUser?.name || "Невідомий автор"}
              />

              <div className="">
                <Label className="hidden" htmlFor="category">Назва роботи</Label>
                <Input
                  id="category"
                  name="category"
                  required
                  placeholder="Напрямок"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div className="relative">
                <Label className="hidden" htmlFor="image">Завантажте файл</Label>
                <Input
                  placeholder="Завантажте файл"
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
                <Upload
                  className="pointer-events-none absolute right-0 top-0 text-white p-3 bg-GRAY h-12 w-12 flex items-center justify-center rounded-r-lg z-10"
                />
                <p className="pointer-events-none absolute left-1 top-1 h-10 w-96 bg-white flex items-center px-4 text-gray-400">
                  Завантажте файл
                </p>
              </div>
              {preview && (
                <div className="absolute left-[120px] top-1/2 transform -translate-y-1/2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-auto max-w-[600px] min-w-[500px] min-h-[200px] max-h-[400px] rounded-md border-4 shadow-2xl object-cover"
                  />
                </div>
              )}

              <div className="">
                <Label className="hidden" htmlFor="title">Назва роботи</Label>
                <Input
                  placeholder="Назва роботи"
                  id="title"
                  name="title"
                  required
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div className="">
                <Label className="hidden" htmlFor="format">Формат</Label>
                <Input
                  placeholder="Формат: наприклад PNG"
                  id="format"
                  name="format"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div className="">
                <Label className="hidden" htmlFor="dimensions">Параметри в пікселях</Label>
                <Input
                  placeholder="Параметри в пікселях: наприклад 1512 x 982 px"
                  id="dimensions"
                  type="text"
                  name="dimensions"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div className="">
                <Label className="hidden" htmlFor="size">Розмір</Label>
                <Input
                  placeholder="Розмір: наприклад 1 Mb"
                  id="size"
                  name="size"
                  type="text"
                  value={fileSize}
                  readOnly
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base bg-gray-100"
                />
              </div>

              <div className="">
                <Label className="hidden" htmlFor="price">Ціна в грн</Label>
                <Input
                  placeholder="Ціна в грн: наприклад 0 або 100"
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-YELLOW text-gray-800 hover:bg-yellow-500 text-xl font-bold rounded-md transition-all ease-linear duration-300"
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

              {message && (
                <div
                  className={`p-3 mb-4 rounded-md text-center ${message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {message.text}
                </div>
              )}
            </form>

            <div className="pb-5">
              <SocialNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}