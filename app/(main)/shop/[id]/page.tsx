"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Download } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getProducts, type Product } from "../../../actions/product-actions"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await getProducts()
        const foundProduct = products.find((p) => p.id === Number.parseInt(id as string))
        setProduct(foundProduct || null)
      } catch (error) {
        console.error("Failed to load product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center font-bold text-[40px] text-gray-700 mb-11">ТОВАР НЕ ЗНАЙДЕНО</h2>
        <Link
          href="/shop"
          className="text-base px-4 py-2 font-bold text-gray-700 border-2 border-gray-700 rounded-xl hover:bg-gray-700 hover:text-white transition-all ease-linear duration-300 flex"
        >
          <ArrowLeft className="mr-2" /> МАГАЗИН
        </Link>
      </div>
    )
  }

  return (
    <main className="">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md w-full max-w-[552px]">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={1512}
            height={982}
            className="w-full h-auto object-cover"
            unoptimized={product.image.startsWith("http")} // For external images
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col stretch">
          <div className="text-sm text-gray-500 mb-8">{product.category}</div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-11">
            <div className="mr-2 font-bold">
              АВТОР <span className="text-pink-500">{product.author}</span>
            </div>
            <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-lg tracking-widest">
              {product.isFree ? "БЕЗКОШТОВНО" : `${product.price} ГРН`}
            </span>
          </div>

          <div className="flex h-full flex-col justify-between">
            <ul className="space-y-1">
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

            {product.isFree ? (
              <a
                href={product.image}
                download
                className="w-56 bg-[#fee685] text-gray-700 hover:bg-yellow-300 text-base font-bold rounded-md p-5 transition-all ease-linear duration-300 flex items-center gap-4 h-9 mt-8"
              >
                <Download size={24} strokeWidth={2} />
                ЗАВАНТАЖИТИ
              </a>
            ) : (
              <Link
                href={"/payment"}
                className="w-56 bg-[#fee685] text-gray-700 hover:bg-yellow-300 text-base font-bold rounded-md p-5 transition-all ease-linear duration-300 flex items-center gap-4 h-9 mt-8"
              >
                КУПИТИ
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
