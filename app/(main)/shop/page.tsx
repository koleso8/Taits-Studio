import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { PageTemp } from "@/components/PageTemp"
import { Card } from "@/components/Card"

export default function ShopPage() {
  return (

    <div className="">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 shrink-0 sticky">
          <Card className="p-6  ">
            <h2 className="text-xl font-bold mb-6">ФІЛЬТРУВАТИ</h2>
            <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />
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

              <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />

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

              <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />

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
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 transition-all ease-linear duration-200">
            {/* Product 1 */}
            <Link href="/shop/summer-banner" className="block">
              <Image src={"/summer.png"} alt={"summer"} width={300} height={196} className="shadow-xl hover:shadow-2xl hover:scale-105  transition-all ease-linear duration-200" />
            </Link>

            {/* Product 2 */}
            <Link href="/shop/strawberry" className="block">
              <Image src={"/strawberry.png"} alt={"strawberry"} width={300} height={196} className="shadow-xl hover:shadow-2xl hover:scale-105  transition-all ease-linear duration-200" />
            </Link>

            {/* Product 3 */}
            <Link href="/shop/your-text" className="block">
              <Image src={"/template.png"} alt={"template"} width={300} height={196} className="shadow-xl hover:shadow-2xl hover:scale-105  transition-all ease-linear duration-200" />
            </Link>


          </div>
        </div>
      </div>
    </div>

  )
}
