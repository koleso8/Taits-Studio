// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { SocialNav } from "@/components/SocialNav"
// import Link from "next/link"

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Left side - Flower image */}
//       <div className="hidden md:block md:w-1/2 relative">
//         <Image
//           src="/auth_page.png"
//           alt="Beautiful flower with soft cream and pink petals"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute top-6 left-6 ">
//           <div className="flex flex-col">
//             <Link href="/">
//               <Image
//                 src="/logo.png"
//                 alt="logo"
//                 className="object-cover"
//                 width={98}
//                 height={52}
//               />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Login form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-20 ">
//         <div className="">
//           <div className="md:hidden text-black font-bold">
//             <div className="flex flex-col">
//               <Link href="/">
//                 <Image
//                   src="/logo.png"
//                   alt="logo"
//                   className="object-cover"
//                   width={98}
//                   height={52}
//                 />
//               </Link>
//             </div>
//           </div>

//           <div className="h-screen pt-64 pb-20 flex flex-col justify-between">

//             <div className="">
//               <h1 className="text-center  font-bold text-GRAY text-4xl tracking-tight mb-2">ДАВАЙТЕ ПОГОВОРИМО ПРО ВАШЕ ЗАМОВЛЕННЯ</h1>
//               <p className="text-base text-center text-GRAY font-[300] mb-10">Розкажіть нам про ваші вимоги до проекту щоб ми змогли підібрати вам ідеального дизайнера для вашого запиту</p>
//               <form className="flex flex-col gap-3 ">
//                 <textarea
//                   placeholder="Ваше повідомлення"
//                   className="h-44 px-4 py-2 border-2 border-GRAY rounded-lg resize-y placeholder:text-[#adadad] text-GRAY"
//                 ></textarea>
//                 <Button
//                   type="submit"
//                   className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
//                 >
//                   ЗРОБИТИ ЗАМОВЛЕННЯ
//                 </Button>
//               </form>

//             </div>

//             <SocialNav />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }








"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProduct } from "../../../actions/product-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"

export function AddProductForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await addProduct(formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        // Reset form
        e.currentTarget.reset()
        setPreview(null)
        // Refresh the page after a short delay
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">ДОДАТИ НОВИЙ ТОВАР</h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Назва товару</Label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Категорія</Label>
          <Input id="category" name="category" defaultValue="Графіка" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Автор</Label>
          <Input id="author" name="author" defaultValue="tait.tss" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isFree" name="isFree" value="true" />
          <Label htmlFor="isFree">Безкоштовний</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Ціна (якщо не безкоштовний)</Label>
          <Input id="price" name="price" type="number" min="0" defaultValue="0" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isTemplate" name="isTemplate" value="true" />
          <Label htmlFor="isTemplate">Це шаблон</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dimensions">Розміри (наприклад, 1512 x 982 px)</Label>
          <Input id="dimensions" name="dimensions" defaultValue="1512 x 982 px" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Зображення</Label>
          <Input id="image" name="image" type="file" accept="image/*" required onChange={handleImageChange} />

          {preview && (
            <div className="mt-2">
              <p className="text-sm mb-1">Попередній перегляд:</p>
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full h-auto max-h-48 rounded-md"
              />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Завантаження...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Додати товар
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
