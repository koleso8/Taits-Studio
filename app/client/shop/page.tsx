import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center">
          <Link href="/client" className="mr-8">
            <div className="flex flex-col">
              <span className="font-bold text-black">Taits</span>
              <span className="font-bold text-black">Studio</span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/client" className="text-gray-700 text-sm">
              ГОЛОВНА
            </Link>
            <Link href="/client/services" className="text-gray-700 text-sm">
              ПОСЛУГИ
            </Link>
            <Link href="/client/shop" className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm">
              МАГАЗИН
            </Link>
            <Link href="/client/designers" className="text-gray-700 text-sm">
              ДИЗАЙНЕРИ
            </Link>
            <Link href="/client/messenger" className="text-gray-700 text-sm">
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

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-gradient-to-b from-pink-400 to-yellow-300 rounded-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-6">ФІЛЬТРУВАТИ</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Checkbox
                    id="all-designs"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                    defaultChecked
                  />
                  <label htmlFor="all-designs" className="ml-2 text-sm font-medium">
                    ВСІ ДИЗАЙНИ
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="templates"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  />
                  <label htmlFor="templates" className="ml-2 text-sm font-medium">
                    ШАБЛОНИ
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="original-designs"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  />
                  <label htmlFor="original-designs" className="ml-2 text-sm font-medium">
                    ОРИГІНАЛЬНІ ДИЗАЙНИ
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="free"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  />
                  <label htmlFor="free" className="ml-2 text-sm font-medium">
                    БЕЗКОШТОВНІ
                  </label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="paid"
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  />
                  <label htmlFor="paid" className="ml-2 text-sm font-medium">
                    ПЛАТНІ
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product 1 */}
              <div className="bg-cyan-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-4xl font-bold">Summer</h3>
                    <p className="text-sm">is coming</p>
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <div className="w-24 h-24 relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-pink-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-4xl font-bold">STRAWBERRY</h3>
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 bg-yellow-300 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-pink-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <div className="absolute inset-0 flex items-center justify-center text-black p-4">
                    <h3 className="text-2xl font-bold italic">your text</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white px-4 py-8 mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ПРО НАС</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ми – креативна дизайн-агенція, що створює унікальні проекти, автоматизує робочі процеси та забезпечує
                зручну співпрацю між клієнтами і дизайнерами.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                </Link>
                <Link href="#" className="text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                </Link>
                <Link href="#" className="text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">КОНТАКТИ</h3>
              <p className="text-sm text-gray-600 mb-1">КАТЕРИНА ТАІЦЬКА</p>
              <p className="text-sm text-gray-600 mb-4">KATERYNATAITSKA@GMAIL.COM</p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-6 py-2 rounded-md">
                ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
