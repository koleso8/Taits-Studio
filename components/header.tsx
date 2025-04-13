"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { LogIn, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Загрузка текущего пользователя из localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    }
    const defaultDesigner = {
      email: "1@example.com",
      password: "123",
      id: "1",
      userType: "designer",
      avatar: "/ava.png",
      name: "ТАІЦЬКА КАТЕРИНА",
      nicname: "tai.tss",
      spec: "Графічний дизайнер",
      regDate: "29/03/2025",
      works: 2,
      finishedProjects: 1,
    };

    // Загружаем пользователей из localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Проверяем, есть ли дефолтный дизайнер в users, если нет — добавляем
    const defaultDesignerExists = users.some((u: any) => u.id === defaultDesigner.id);
    if (!defaultDesignerExists) {
      users.push(defaultDesigner);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  // Функция для определения активной страницы
  const getActivePage = (pathname: string): string => {
    if (!pathname) return "home";

    if (pathname === "/") return "home";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/shop")) return "shop";
    if (pathname.startsWith("/designers")) {
      const segments = pathname.split("/").filter(Boolean);
      if (
        segments.length === 2 &&
        segments[0] === "designers" &&
        !isNaN(Number(segments[1]))
      ) {
        if (currentUser?.userType === "client" && pathname.startsWith("/designers"))
          return "designers";
        return "designersID";
      }
      return "designers";
    }
    if (pathname.startsWith("/messenger")) return "messenger";
    return "home";
  };

  const activePage = getActivePage(pathname);
  const isLogedIn = !!currentUser;

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white h-[100px]">

      <div className="flex items-center flex-1 justify-between">
        {(!currentUser || currentUser?.userType === "client") && (
          <Link href="/" className="">
            <div className="mr-40">
              <Image
                src="/logo_color.png"
                alt="logo"
                className="min-w-[134px]"
                width={134}
                height={75}
              />
            </div>
          </Link>
        )}
        {currentUser?.userType === "designer" && (
          <Link
            href={`/designers/${currentUser.id}`}>
            <div className="mr-40">
              <Image
                src="/logo_color.png"
                alt="logo"
                className="min-w-[134px]"
                width={134}
                height={75}
              />
            </div>
          </Link>

        )}

        <nav className="hidden md:flex gap-2 items-center">

          {/* ПРОФІЛЬ доступен только дизайнерам */}
          {currentUser?.userType === "designer" && (
            <Link
              href={`/designers/${currentUser.id}`}
              className={`text-base px-4 py-2 font-bold ${activePage === "designersID" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              ПРОФІЛЬ
            </Link>
          )}
          {/* ГОЛОВНА доступна всем */}
          {(!currentUser || currentUser?.userType === "client") && (
            <Link
              href="/"
              className={`text-base px-4 py-2 font-bold ${activePage === "home" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              ГОЛОВНА
            </Link>)}

          {/* ПОСЛУГИ доступна только неавторизованным пользователям или клиентам */}
          {(!currentUser || currentUser?.userType === "client") && (
            <Link
              href="/services"
              className={`text-base px-4 py-2 font-bold ${activePage === "services" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              ПОСЛУГИ
            </Link>
          )}

          {/* МАГАЗИН доступен всем (как было) */}
          <Link
            href="/shop"
            className={`text-base px-4 py-2 font-bold ${activePage === "shop" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            МАГАЗИН
          </Link>

          {/* ДИЗАЙНЕРИ доступна только неавторизованным пользователям или клиентам  */}
          {(!currentUser || currentUser?.userType === "client") && (
            <Link
              href="/designers"
              className={`text-base px-4 py-2 font-bold ${activePage === "designers" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              ДИЗАЙНЕРИ
            </Link>
          )}



          {/* МЕСЕНДЖЕР доступен только авторизованным пользователям */}
          {isLogedIn && (
            <Link
              href="/messenger"
              className={`text-base px-4 py-2 font-bold ${activePage === "messenger" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              МЕСЕНДЖЕР
            </Link>
          )}
        </nav>
      </div>
      <div className="flex items-center">
        {/* <div className="relative">
          <Input
            type="search"
            placeholder="Пошук..."
            className="w-64 h-10 px-4 ml-9 border border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Search color="#353535" />
          </div>
        </div> */}
        {isLogedIn ? (
          <Button
            onClick={handleLogout}
            className="ml-9 bg-YELLOW hover:bg-yellow-400 text-black text-base font-semibold h-10 px-4 rounded-md"
          >
            <LogIn color="#353535" strokeWidth={3} className="rotate-180" />
            ВИЙТИ
          </Button>
        ) : (
          <Link href="/login">
            <Button className="ml-9 bg-YELLOW hover:bg-yellow-400 text-black text-base font-semibold h-10 px-4 rounded-md">
              <LogIn color="#353535" strokeWidth={3} />
              УВІЙТИ
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}