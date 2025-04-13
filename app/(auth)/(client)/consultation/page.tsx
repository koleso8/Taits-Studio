"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialNav } from "@/components/SocialNav";
import Link from "next/link";

export default function ConsultationPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Проверка авторизации
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!user || !user.id) {
      router.push("/login");
    }
  }, [router]);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (!inputValue.trim()) {
        throw new Error("Введіть текст консультації");
      }

      // Сохраняем текст в localStorage
      localStorage.setItem("consultationMessage", inputValue);

      setMessage({ type: "success", text: "Запит на консультацію відправлено" });
      setInputValue("");
      setTimeout(() => {
        router.push("/messenger/1"); // Редирект на чат с дефолтным дизайнером
      }, 1000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Помилка при відправці" });
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
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={98} height={52} />
          </Link>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-20">
        <div className="">
          <div className="md:hidden text-black font-bold">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={98} height={52} />
            </Link>
          </div>

          <div className="h-screen pt-28 pb-3 flex flex-col justify-between">
            <div>
              <h1 className="text-center font-bold text-GRAY text-4xl tracking-tight mb-2">
                ДАВАЙТЕ ОБГОВОРИМО ВАШІ ПИТАННЯ
              </h1>
              <p className="text-base text-center text-GRAY font-[300] mb-10">
                Так ми зможемо підібрати вам ідеального дизайнера для вирішення ваших питань та безкоштовної консультанії
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-auto">
                <textarea
                  placeholder="Ваше повідомлення"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="h-44 px-4 py-2 border-2 border-GRAY rounded-lg resize-y placeholder:text-[#adadad] text-GRAY"
                ></textarea>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-500 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
                  disabled={isSubmitting}
                >
                  ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
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
            </div>

            <SocialNav />
          </div>
        </div>
      </div>
    </div>
  );
}