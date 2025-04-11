import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Flower image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JBItIJovwvxX2N2YENMxHzIgXFhJu0.png"
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

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden text-black font-bold mb-8">
            <div className="flex flex-col">
              <span>Taits</span>
              <span>Studio</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">УВІЙДІТЬ В СВІЙ</h1>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">ОБЛІКОВИЙ ЗАПИС</h1>
          </div>

          <form className="mt-8 space-y-4">
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
              УВІЙТИ
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Немає облікового запису? Приєднуйтесь до нас!</p>
            <Link href="/register">
              <Button
                variant="outline"
                className="mt-2 w-full h-12 border border-gray-300 text-black font-medium rounded-md"
              >
                ЗАРЕЄСТРУВАТИСЯ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
