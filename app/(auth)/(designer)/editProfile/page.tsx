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

export default function EditProfilePage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    spec: "",
    avatar: "",
  });
  const router = useRouter();

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  // Загрузка данных текущего пользователя и банковской карты
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
      setFormData({
        name: user.name || "",
        spec: user.spec || "",
        avatar: user.avatar || "",
      });
      setPreview(user.avatar || null);
    } else {
      router.push("/login"); // Редирект, если пользователь не авторизован
    }

    const savedCardData = localStorage.getItem("cardData");
    if (savedCardData) {
      setCardData(JSON.parse(savedCardData));
    }
  }, [router]);

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
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFormData((prev) => ({ ...prev, avatar: "" }));
    }
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (!currentUser) {
        throw new Error("Користувач не авторизований");
      }

      // Обновляем currentUser
      const updatedUser = {
        ...currentUser,
        name: formData.name || currentUser.name,
        spec: formData.spec || currentUser.spec,
        avatar: formData.avatar || currentUser.avatar,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Обновляем массив users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) =>
        String(u.id) === String(currentUser.id) ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setCurrentUser(updatedUser);
      setMessage({ type: "success", text: "Дані успішно збережено" });
      (e.target as HTMLFormElement).reset();
      router.refresh();
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
          {(!currentUser || currentUser?.userType === "client") && (
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={98} height={52} />
            </Link>)}
          {currentUser?.userType === "designer" && (
            <Link
              href={`/designers/${currentUser.id}`}>
              <Image src="/logo.png" alt="logo" width={98} height={52} />
            </Link>)}
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
                ВВЕДІТЬ НОВІ ДАНІ ПРО СЕБЕ
              </h1>
              <div>
                <Label className="hidden" htmlFor="name">Прізвище Ім’я</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Прізвище Ім'я"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-2 border-GRAY rounded-lg h-12 placeholder:text-gray-400 placeholder:text-base"
                />
              </div>

              <div>
                <Label className="hidden" htmlFor="spec">Посада</Label>
                <Input
                  id="spec"
                  name="spec"
                  placeholder="Посада"
                  value={formData.spec}
                  onChange={handleInputChange}
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
                      className="absolute -top-[440px] right-1/2 transform translate-x-1/2 w-[1800px] h-[1800px] max-w-[180px] max-h-[180px] rounded-full border-4 shadow-xl object-cover"
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