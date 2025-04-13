import { isClient, user } from "@/app/utils/test.js";
export default function ProductDetailPage({ }) {

  return (
    <div className=" flex items-center">
      <h2 className="text-2xl text-GRAY  w-72 text-center  mx-auto">{isClient ? "ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З ДИЗАЙНЕРАМИ" : "ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З КЛІЄНТАМИ"}</h2> :

    </div>
  )
}