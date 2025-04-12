"use client";

import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  category: string;
  author: string;
  isFree: boolean;
  price: number;
  format: string;
  dimensions: string;
  size: string;
  image: string;
  downloads: number;
}

const products: Product[] = [
  {
    id: 1,
    title: "Банер реклама літніх розваг",
    category: "Графіка",
    author: "tait.tss",
    isFree: true,
    price: 0,
    format: "PNG",
    dimensions: "1512 x 982 px",
    size: "904 KB",
    image: "/summer.png",
    downloads: 0,
  },
  {
    id: 2,
    title: "Банер реклама газового напою",
    category: "Графіка",
    author: "tait.tss",
    isFree: false,
    price: 50,
    format: "PNG",
    dimensions: "1512 x 982 px",
    size: "1.48 MB",
    image: "/strawberry.png",
    downloads: 0,
  },
  {
    id: 3,
    title: "Шаблон для банеру або логотипу",
    category: "Графіка",
    author: "tait.tss",
    isFree: true,
    price: 0,
    format: "PNG",
    dimensions: "1512 x 982 px",
    size: "1.48 MB",
    image: "/template.png",
    downloads: 0,
  },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  console.log(productId);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (<div className="flex flex-col items-center justify-center">
      <h2 className="text-center font-bold text-[40px] text-GRAY mb-11">ТОВАР НЕ ЗНАЙДЕНО</h2>
      <Link
        href="/shop"
        className={"text-base px-4 py-2 font-bold text-GRAY border-2 border-GRAY rounded-xl hover:bg-GRAY hover:text-white transition-all ease-linear duration-300 flex"}
      >
        <ArrowLeft className="mr-2" /> МАГАЗИН
      </Link>
    </div>)
  }

  return (
    <main className="">
      <div className="flex gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md w-full max-w-[552px]">
          <Image
            src={product.image}
            alt={product.title}
            width={1512}
            height={982}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col stretch">
          <div className="text-sm text-gray-500 mb-8">{product.category}</div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-11">
            <div className="mr-2 font-bold">
              АВТОР <span className="text-ROZA">{product.author}</span>
            </div>
            <span className="bg-ROZA text-white text-xs font-bold px-3 py-1 rounded-lg tracking-widest">
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
            <a
              href={product.image}
              download
              className="w-56 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-base font-bold rounded-md p-5 transition-all ease-linear duration-300 flex items-center gap-4 h-9"
            >
              <Download size={24} strokeWidth={2} />
              ЗАВАНТАЖИТИ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}