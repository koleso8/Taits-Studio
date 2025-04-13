"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialNav } from "@/components/SocialNav";
import { Loader2, Plus, Upload } from "lucide-react";
import { addProduct } from "@/app/actions/product-actions";

export default function EditProfilePage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: ''
  })

  useEffect(() => {
    const savedData = localStorage.getItem('cardData')
    if (savedData) {
      setCardData(JSON.parse(savedData))
    }
  }, [])

  // Обработчик изменения файла для предпросмотра
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 32 * 1024 * 1024) {
        setMessage({ type: "error", text: "Файл занадто великий (макс. 32 МБ)" });
        setPreview(null);
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
    // Удаляем поле image, если файл не загружен
    if (!formData.get("image")) {
      formData.delete("image");
    }

    try {
      const result = await addProduct(formData);

      if (result.success) {
        setMessage({ type: "success", text: "Дані успішно збережено" });
        setPreview(null);
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: "Помилка при збереженні даних" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при збереженні даних" });
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
          alt="Flower background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-6 left-6">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={98} height={52} />
          </Link>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-20">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-6">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={98} height={52} />
            </Link>
          </div>

          <div className="min-h-screen flex flex-col justify-between pt-32">

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-[100px]">
              <h1 className="text-center font-bold text-gray-800 text-3xl md:text-4xl tracking-tight mb-6">
                ВВЕДІТЬ НОВІ ДАНІ ПРО ПРО СЕБЕ
              </h1>
              <div>
                <Label className="hidden" htmlFor="name">Прізвище Ім’я</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Прізвище Ім'я"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div>
                <Label className="hidden" htmlFor="spec">Посада</Label>
                <Input
                  id="spec"
                  name="spec"
                  placeholder="Посада"
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div className="relative">
                <Label className="hidden" htmlFor="image">Фото профілю</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
                <Upload className="pointer-events-none absolute right-0 top-0 text-white p-3 bg-GRAY h-12 w-12 flex items-center justify-center rounded-r-lg z-10" />
                <p className="pointer-events-none absolute left-1 top-1 h-10 w-96 bg-white flex items-center px-4 text-gray-400">
                  Фото профілю
                </p>

                {preview && (
                  <div className="">
                    <img
                      src={preview}
                      alt="Preview"
                      className=" absolute -top-[440px] right-1/2 transform translate-x-1/2 w-[1800px] h-[1800px] max-w-[180px] max-h-[180px] rounded-full border-4 shadow-xl object-cover"
                    />
                  </div>
                )}
              </div>



              <div className="relative">
                <Label className="hidden" htmlFor="card">Банківська карта</Label>
                <Link href="/addCard">
                  <Input
                    readOnly
                    id="card"
                    name="card"
                    placeholder="Банківська карта"
                    value={cardData.cardNumber}
                    className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                  />
                </Link>
                <Plus className="pointer-events-none absolute right-0 top-0 text-white p-3 bg-GRAY h-12 w-12 flex items-center justify-center rounded-r-lg" />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-YELLOW text-gray-800 hover:bg-yellow-500 text-xl font-bold rounded-md transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Збереження...
                  </>
                ) : (
                  "ЗБЕРЕГТИ ЗМІНИ"
                )}
              </Button>

              {message && (
                <div
                  className={`p-3 mt-4 rounded-md text-center ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                  {message.text}
                </div>
              )}
            </form>

            <div className="pb-11 mt-6">
              <SocialNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}