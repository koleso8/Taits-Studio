import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SocialNav } from "@/components/SocialNav"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
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
      <div className="w-full  md:w-1/2 flex items-center justify-center px-20 ">
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

            <div className="">
              <h1 className="text-center  font-bold text-GRAY text-4xl tracking-tight mb-10">БЕЗПЕЧНА ОПЛАТА ЧЕРЕЗ НАШ САЙТ</h1>

              <form className="flex flex-col gap-3 ">
                <Input
                  type="text"
                  placeholder="Номер картки"
                  className="h-12 px-4  border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY "
                />
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="ДД/ММ"
                    className="h-12 px-4  border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY rounded-r-none "
                  />
                  <Input
                    type="text"
                    placeholder="CVV"
                    className="h-12 px-4  border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY rounded-l-none border-l-0 "
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Сума"
                  className="h-12 px-4  border-2 border-GRAY rounded-lg placeholder:text-[#adadad] text-GRAY "
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
                >
                  ОПЛАТИТИ ЗАМОВЛЕННЯ
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
