import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  activePage?: "home" | "services" | "shop" | "designers" | "messenger"
}

export default function Header({ activePage }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <div className="flex flex-col">
            <span className="font-bold text-black">Taits</span>
            <span className="font-bold text-black">Studio</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`text-sm ${activePage === "home" ? "bg-pink-500 text-white px-4 py-1 rounded-full" : "text-gray-700"}`}
          >
            ГОЛОВНА
          </Link>
          <Link
            href="/services"
            className={`text-sm ${activePage === "services" ? "bg-pink-500 text-white px-4 py-1 rounded-full" : "text-gray-700"}`}
          >
            ПОСЛУГИ
          </Link>
          <Link
            href="/shop"
            className={`text-sm ${activePage === "shop" ? "bg-pink-500 text-white px-4 py-1 rounded-full" : "text-gray-700"}`}
          >
            МАГАЗИН
          </Link>
          <Link
            href="/designers"
            className={`text-sm ${activePage === "designers" ? "bg-pink-500 text-white px-4 py-1 rounded-full" : "text-gray-700"}`}
          >
            ДИЗАЙНЕРИ
          </Link>
          <Link
            href="/messenger"
            className={`text-sm ${activePage === "messenger" ? "bg-pink-500 text-white px-4 py-1 rounded-full" : "text-gray-700"}`}
          >
            МЕСЕНДЖЕР
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Input
            type="search"
            placeholder="Пошук..."
            className="w-40 h-8 pl-2 pr-8 text-sm border border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <Button className="bg-yellow-300 hover:bg-yellow-400 text-black text-xs h-8 px-4 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          УВІЙТИ
        </Button>
      </div>
    </header>
  )
}
