import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Download } from "lucide-react"

export default function ProductDetailPage({ }) {
  // В реальном приложении здесь был бы запрос к API для получения данных о товаре
  // Для примера используем статические данные
  const product = {
    title: "БАНЕР РЕКЛАМА ЛІТНІХ РОЗВАГ",
    category: "Графіка",
    author: "tait.tss",
    isFree: true,
    format: "PNG",
    dimensions: "1512 x 982 px",
    size: "904 KB",
    image: "/summer.png",
  }

  return (

    <main className="">
      <div className="flex  gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md  w-full max-w-[552px]">
          <Image src={product.image} alt={product.title} width={600} height={400} className="w-full h-auto object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col stretch">
          <div className="text-sm text-gray-500 mb-8">{product.category}</div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-11">
            <div className="mr-2 font-bold">АВТОР <span className=" text-ROZA">{product.author}</span></div>
            {product.isFree && (
              <span className="bg-ROZA text-white text-xs font-bold px-3 py-1 rounded-lg tracking-widest ">БЕЗКОШТОВНО</span>
            )}
          </div>

          <div className="flex h-full flex-col justify-between">
            <ul className="space-y-1 ">
              <li className="flex items-center">
                <span className="text-gray-700 mr-2">•</span>
                <span>{product.format}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-700 mr-2">•</span>
                <span>{product.dimensions}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-700 mr-2">•</span>
                <span>Розмір {product.size}</span>
              </li>
            </ul>
            <a href={product.image} download className="w-56 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-base font-bold rounded-md p-5 transition-all ease-linear duration-300 flex items-center gap-4 h-9">
              <Download className="" size={24} strokeWidth="2px" />
              ЗАВАНТАЖИТИ
            </a>
          </div>
        </div>
      </div>
    </main>

  )
}
