"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SocialNav } from "@/components/SocialNav"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation" // Змінено з next/router на next/navigation
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: ""
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    localStorage.setItem('cardData', JSON.stringify(formData))
    router.back()
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Flower image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/auth_page.png"
          alt="Beautiful flower with soft cream and pink petals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-6 left-6">
          <div className="flex flex-col">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                className="object-cover"
                width={98}
                height={52}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-20">
        <div className="max-w-96">
          <div className="md:hidden text-black font-bold">
            <div className="flex flex-col">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  className="object-cover"
                  width={98}
                  height={52}
                />
              </Link>
            </div>
          </div>

          <div className="h-screen pt-64 pb-20 flex flex-col justify-between">
            <div>
              <h1 className="text-center font-bold text-GRAY text-4xl tracking-tight mb-10">
                ВВЕДІТЬ СВОЇ БАНКІВСЬКІ ДАНІ
              </h1>

              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="Номер картки"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
                <div className="flex">
                  <Input
                    type="text"
                    name="expiry"
                    placeholder="ДД/ММ"
                    className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY rounded-r-none"
                    value={formData.expiry}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY rounded-l-none border-l-0"
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  type="text"
                  name="cardHolder"
                  placeholder="Прізвище Ім’я"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-500 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
                >
                  ДОДАТИ КАРТКУ
                </Button>
              </form>
            </div>

            <SocialNav />
          </div>
        </div>
      </div>
    </div>
  )
}