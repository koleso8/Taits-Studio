import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // В реальном приложении здесь был бы запрос к API для получения данных о товаре
  // Для примера используем статические данные
  const product = {
    id: params.id,
    title: "БАНЕР РЕКЛАМА ЛІТНІХ РОЗВАГ",
    category: "Графіка",
    author: "tait.tss",
    isFree: true,
    format: "PNG",
    dimensions: "1512 x 982 px",
    size: "904 KB",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CVc3RiVNWL9Oeb68L83g9uKqV9J9M7.png",
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <Header activePage="shop" />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-cyan-500 rounded-lg overflow-hidden shadow-md">
            <Image src="/placeholder.svg" alt={product.title} width={600} height={400} className="w-full h-auto" />
          </div>

          {/* Product Details */}
          <div>
            <div className="text-sm text-gray-500 mb-2">{product.category}</div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center mb-6">
              <div className="mr-2">АВТОР {product.author}</div>
              {product.isFree && (
                <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">БЕЗКОШТОВНО</span>
              )}
            </div>

            <ul className="space-y-2 mb-8">
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

            <Button className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              ЗАВАНТАЖИТИ
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
