"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Получение пользователей из localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Неправильна пошта або пароль");
      return;
    }

    // Сохранение текущего пользователя
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Перенаправление в зависимости от типа пользователя
    if (user.userType === "client") {
      router.push("/shop");
    } else {
      router.push(`/designers/${user.id}`);
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

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-96">
          <div className="md:hidden text-black font-bold">
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

          <div className="h-screen pt-64 pb-20 flex flex-col justify-between">
            <div>
              <h1 className="text-center font-bold text-GRAY text-4xl tracking-tight">
                УВІЙДІТЬ В СВІЙ ОБЛІКОВИЙ ЗАПИС
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-3">
                <Input
                  type="email"
                  placeholder="Електронна пошта"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Пароль"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
                >
                  УВІЙТИ
                </Button>
              </form>
            </div>

            <div className="text-center">
              <p className="text-base text-GRAY font-[300]">
                Немає облікового запису? Приєднуйтесь до нас!
              </p>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="mt-2 w-full h-12 px-4 border-2 border-[GRAY] rounded-lg text-GRAY text-xl font-bold transition-all ease-linear duration-300"
                >
                  ЗАРЕЄСТРУВАТИСЬ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}