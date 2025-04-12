import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SocialNav } from "@/components/SocialNav"

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

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-20 ">
        <div className="">
          <div className="md:hidden text-black font-bold">
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

          <div className="h-screen pt-64 pb-20 flex flex-col justify-between">

            <div className="">
              <h1 className="text-center  font-bold text-GRAY text-4xl tracking-tight mb-2">ДАВАЙТЕ ПОГОВОРИМО ПРО ВАШЕ ЗАМОВЛЕННЯ</h1>
              <p className="text-base text-center text-GRAY font-[300] mb-10">Розкажіть нам про ваші вимоги до проекту щоб ми змогли підібрати вам ідеального дизайнера для вашого запиту</p>
              <form className="flex flex-col gap-3 ">
                <textarea
                  placeholder="Ваше повідомлення"
                  className="h-44 px-4 py-2 border-2 border-GRAY rounded-lg resize-y placeholder:text-[#adadad] text-GRAY"
                ></textarea>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#fee685] text-GRAY hover:bg-yellow-300 text-xl font-bold rounded-md p-3 transition-all ease-linear duration-300"
                >
                  ЗРОБИТИ ЗАМОВЛЕННЯ
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
