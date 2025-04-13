"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { LogIn, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const isClient = false;
const user = {
  id: 1,
};

export default function Header() {
  const pathname = usePathname();

  // Функция для определения активной страницы
  const getActivePage = (pathname: string): string => {
    if (!pathname) return "home";

    if (pathname === "/") return "home";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/shop")) return "shop";
    if (pathname.startsWith("/designers")) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 2 && segments[0] === "designers" && !isNaN(Number(segments[1]))) {
        if (isClient && pathname.startsWith("/designers")) return "designers";
        return "designersID";
      }
      return "designers";
    }
    if (pathname.startsWith("/messenger")) return "messenger";
    return "home";
  };

  const activePage = getActivePage(pathname);
  const isLogedIn = true;

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white h-[100px]">
      <div className="flex items-center flex-1 justify-between">
        <Link href="/" className="mr-40">
          <div className="mr-auto">
            <Image
              src="/logo_color.png"
              alt="logo"
              className="min-w-[134px]"
              width={134}
              height={75}
            />
          </div>
        </Link>
        <nav className="hidden md:flex gap-2 items-center ">
          {!isClient && (
            <Link
              href={`/designers/${user.id}`}
              className={`text-base px-4 py-2 font-bold ${activePage === "designersID" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
                }`}
            >
              ПРОФІЛЬ
            </Link>
          )}
          {isClient && <Link
            href="/"
            className={`text-base px-4 py-2 font-bold ${activePage === "home" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            ГОЛОВНА
          </Link>}
          {isClient && <Link
            href="/services"
            className={`text-base px-4 py-2 font-bold ${activePage === "services" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            ПОСЛУГИ
          </Link>}
          <Link
            href="/shop"
            className={`text-base px-4 py-2 font-bold ${activePage === "shop" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            МАГАЗИН
          </Link>
          {isClient && <Link
            href="/designers"
            className={`text-base px-4 py-2 font-bold ${activePage === "designers" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            ДИЗАЙНЕРИ
          </Link>}
          <Link
            href="/messenger"
            className={`text-base px-4 py-2 font-bold ${activePage === "messenger" ? "bg-ROZA text-white rounded-xl" : "text-GRAY"
              }`}
          >
            МЕСЕНДЖЕР
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <Input
            type="search"
            placeholder="Пошук..."
            className="w-64 h-10 px-4 ml-9 border border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Search color="#353535" />
          </div>
        </div>
        <Link href="/login">
          <Button className="ml-9 bg-YELLOW hover:bg-yellow-400 text-black text-base font-semibold h-10 px-4 rounded-md">
            <LogIn color="#353535" strokeWidth={3} className={isLogedIn && 'rotate-180'} />
            {!isLogedIn ? "УВІЙТИ" : "ВИЙТИ"}
          </Button>
        </Link>
      </div>
    </header>
  );
}