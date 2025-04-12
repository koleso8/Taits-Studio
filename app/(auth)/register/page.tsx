"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { ChoseUserType } from "@/components/ChoseUserType"

export default function RegisterPage() {


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
        <div className="absolute top-6 left-6 ">
          <div className="flex flex-col">
            <Image
              src="/logo.png"
              alt="logo"
              className="object-cover"
              width={98}
              height={52}
            />
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8 ">
        <div className="w-96">
          <div className="md:hidden text-black font-bold mb-8">
            <div className="flex flex-col">
              <Image
                src="/logo.png"
                alt="logo"
                className="object-cover"
                width={98}
                height={52}
              />
            </div>
          </div>

          <div className="h-screen pt-44 pb-20 flex flex-col justify-between items-center">
            <div className=" flex flex-col items-center">
              <h1 className="w-[410px] text-center  font-bold text-GRAY text-4xl tracking-tight">РЕЄСТРАЦІЯ ОБЛІКОВОГО ЗАПИСУ</h1>


              <form className="flex flex-col mt-10 gap-3 max-w-96  w-full">
                {/* User type selector */}
                <ChoseUserType />
                <Input type="text" placeholder="Ім'я та Фамілія" className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY" />
                <Input
                  type="email"
                  placeholder="Електронна пошта"
                  className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY"
                />
                <Input type="password" placeholder="Пароль" className="h-12 px-4 border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY" />
                <Button
                  type="submit"
                  className="w-full h-12 bg-YELLOW hover:bg-yellow-300 text-GRAY text-xl font-bold rounded-lg transition-all ease-linear duration-300"
                >
                  ЗАРЕЄСТРУВАТИСЬ
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center w-full">
              <p className="text-base text-GRAY font-[300]">Вже маєте зареєстрований обліковий запис?</p>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="mt-2 max-w-96  w-full h-12 border-2 border-GRAY text-GRAY text-xl font-bold rounded-lg transition-all ease-linear duration-300"
                >
                  УВІЙТИ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
