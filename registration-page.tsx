"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function RegistrationPage() {
  const [userType, setUserType] = useState<"client" | "designer">("client")

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Flower image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IXbeSYuX0HHB0PUqyufQJx02ciPEPE.png"
          alt="Beautiful flower with soft cream and pink petals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-6 left-6 text-black font-bold">
          <div className="flex flex-col">
            <span>Taits</span>
            <span>Studio</span>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden text-black font-bold mb-8">
            <div className="flex flex-col">
              <span>Taits</span>
              <span>Studio</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">РЕЄСТРАЦІЯ</h1>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">ОБЛІКОВОГО ЗАПИСУ</h1>
          </div>

          {/* User type selector */}
          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                userType === "client" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => setUserType("client")}
            >
              КЛІЄНТ
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                userType === "designer" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => setUserType("designer")}
            >
              ДИЗАЙНЕР
            </button>
          </div>

          <form className="mt-8 space-y-4">
            <Input type="text" placeholder="Ім'я та Фамілія" className="h-12 px-4 border border-gray-300 rounded-md" />
            <Input
              type="email"
              placeholder="Електронна пошта"
              className="h-12 px-4 border border-gray-300 rounded-md"
            />
            <Input type="password" placeholder="Пароль" className="h-12 px-4 border border-gray-300 rounded-md" />
            <Button
              type="submit"
              className="w-full h-12 bg-yellow-200 hover:bg-yellow-300 text-black font-medium rounded-md"
            >
              ЗАРЕЄСТРУВАТИСЯ
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Вже маєте зареєстрований обліковий запис?</p>
            <Button
              variant="outline"
              className="mt-2 w-full h-12 border border-gray-300 text-black font-medium rounded-md"
            >
              УВІЙТИ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
