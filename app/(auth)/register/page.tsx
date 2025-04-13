"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { ChoseUserType } from "@/components/ChoseUserType";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [userType, setUserType] = useState<"client" | "designer">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nicname, setNicname] = useState("");
  const [spec, setSpec] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUserTypeChange = (type: "client" | "designer") => {
    setUserType(type);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Валидация
    if (!name || !email || !password) {
      setError("Заповніть усі обов'язкові поля");
      return;
    }
    if (userType === "designer" && (!nicname || !spec)) {
      setError("Для дизайнера нікнейм та спеціалізація обов'язкові");
      return;
    }

    // Формирование объекта пользователя
    const newUser = {
      id: Date.now(), // Уникальный ID на основе времени
      avatar: "/placeholderUser.png",
      name: name.toUpperCase(),
      nicname: userType === "designer" ? nicname : undefined,
      spec: userType === "designer" ? spec : undefined,
      email,
      password, // В реальном приложении пароли нужно хешировать
      regDate: new Date().toLocaleDateString("uk-UA"),
      works: 0,
      finishedProjects: 0,
      userType,
    };

    // Сохранение в localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user: any) => user.email === email)) {
      setError("Користувач з такою поштою вже існує");
      return;
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Перенаправление на страницу логина
    router.push("/login");
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

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8">
        <div className="w-96">
          <div className="md:hidden text-black font-bold mb-8">
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

          <div className="h-screen pt-44 pb-20 flex flex-col justify-between items-center">
            <div className="flex flex-col items-center">
              <h1 className="w-[410px] text-center font-bold text-GRAY text-4xl tracking-tight">
                РЕЄСТРАЦІЯ ОБЛІКОВОГО ЗАПИСУ
              </h1>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col mt-10 gap-3 max-w-96 w-full"
              >
                {/* User type selector */}
                <ChoseUserType onChange={handleUserTypeChange} />

                <Input
                  type="text"
                  placeholder="Ім'я та Фамілія"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                {userType === "designer" && (
                  <>
                    <Input
                      type="text"
                      placeholder="Нікнейм"
                      className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                      value={nicname}
                      onChange={(e) => setNicname(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Спеціалізація"
                      className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                      value={spec}
                      onChange={(e) => setSpec(e.target.value)}
                    />
                  </>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full h-12 bg-YELLOW hover:bg-yellow-300 text-GRAY text-xl font-bold rounded-lg transition-all ease-linear duration-300"
                >
                  ЗАРЕЄСТРУВАТИСЬ
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center w-full">
              <p className="text-base text-GRAY font-[300]">
                Вже маєте зареєстрований обліковий запис?
              </p>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="mt-2 max-w-96 w-full h-12 border-2 border-GRAY text-GRAY text-xl font-bold rounded-lg transition-all ease-linear duration-300"
                >
                  УВІЙТИ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}