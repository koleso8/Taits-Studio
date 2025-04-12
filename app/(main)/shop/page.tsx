import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-pink-50">

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
              <Link href="/shop/summer-banner" className="block">
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
              </Link>

              {/* Product 2 */}
              <Link href="/shop/strawberry" className="block">
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
              </Link>

              {/* Product 3 */}
              <Link href="/shop/your-text" className="block">
                <div className="bg-pink-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <div className="absolute inset-0 flex items-center justify-center text-black p-4">
                      <h3 className="text-2xl font-bold italic">your text</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
