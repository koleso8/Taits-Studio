import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ClientHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center">
          <Link href="/client" className="mr-8">
            <div className="flex flex-col">
              <span className="font-bold text-black">Taits</span>
              <span className="font-bold text-black">Studio</span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/client" className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm">
              ГОЛОВНА
            </Link>
            <Link href="/client/services" className="text-gray-700 text-sm">
              ПОСЛУГИ
            </Link>
            <Link href="/client/shop" className="text-gray-700 text-sm">
              МАГАЗИН
            </Link>
            <Link href="/client/designers" className="text-gray-700 text-sm">
              ДИЗАЙНЕРИ
            </Link>
            <Link href="/client/messenger" className="text-gray-700 text-sm">
              МЕСЕНДЖЕР
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Пошук..."
              className="w-40 h-8 pl-2 pr-8 text-sm border border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <Button className="bg-yellow-300 hover:bg-yellow-400 text-black text-xs h-8 px-4 rounded-md">УВІЙТИ</Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-4 my-6 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-yellow-300 p-8 text-center text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">ПЕРЕТВОРЮЄМО ІДЕЇ В</h1>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">УНІКАЛЬНИЙ ДИЗАЙН!</h1>
            <p className="text-sm max-w-2xl mx-auto mb-8">
              Ми - команда професіоналів, які допоможуть втілити ваші ідеї в реальність. Наша місія - створювати
              унікальний дизайн для кожного.
            </p>
            <Button className="bg-transparent hover:bg-white/20 border border-white text-white text-sm px-6 py-2 rounded-md">
              БЕЗКОШТОВНА КОНСУЛЬТАЦІЯ
            </Button>
            <div className="flex justify-center mt-6 space-x-4">
              <Link href="#" className="text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mx-4 my-10">
          <h2 className="text-xl font-bold mb-4">ПРО НАС</h2>
          <p className="text-sm text-gray-700 mb-6 max-w-4xl">
            Студія, що працює - саме чесно та особливо фахово. Ми - команда професіоналів, які допоможуть втілити ваші
            ідеї в реальність. Наша місія - створювати унікальний дизайн для кожного. Наші дизайнери мають значний
            досвід роботи над розробкою логотипів і фірмового стилю, веб-дизайну, ілюстрацій та інших видів графічного
            дизайну. Ми забезпечуємо якісний результат для клієнтів, які очікують та добиваються автентичного підходу до
            своїх проектів. Ми пропонуємо якісну роботу, індивідуальний підхід та найкращі рішення для реалізації ваших
            ідей!
          </p>
        </section>

        {/* Testimonials Section */}
        <section className="mx-4 my-10">
          <h2 className="text-xl font-bold mb-6 text-center">ВІДГУКИ НАШИХ КЛІЄНТІВ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink-100 p-6 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                "Дякую команді Taits Studio за чудову роботу! Логотип, який вони створили для мого бізнесу, перевершив
                усі мої очікування. Професійний підхід та увага до деталей - це те, що відрізняє їх від інших."
              </p>
              <p className="text-sm font-semibold">ОЛЕКСАНДР МЕЛЬНИК</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                "Дуже задоволена співпрацею з дизайнерами Taits Studio. Вони не тільки втілили мої ідеї, а й
                запропонували креативні рішення, які зробили мій проект ще кращим. Рекомендую всім!"
              </p>
              <p className="text-sm font-semibold">КАТЕРИНА КОВАЛЬЧУК</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                "Я вражений якістю роботи команди Taits Studio. Вони створили для мене унікальний дизайн, який повністю
                відповідає моїм потребам та очікуванням. Буду звертатися ще!"
              </p>
              <p className="text-sm font-semibold">АНДРІЙ ТКАЧУК</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-4 my-10">
          <div className="bg-gradient-to-r from-yellow-300 to-pink-400 p-8 rounded-lg text-center">
            <h2 className="text-xl font-bold text-white mb-1">ЗАМОВИТИ ДИЗАЙН ЛОГОТИПУ</h2>
            <h2 className="text-xl font-bold text-white mb-4">ПРЯМО ЗАРАЗ!</h2>
            <p className="text-sm text-white mb-6 max-w-2xl mx-auto">
              Ми створимо унікальний логотип, що відображатиме індивідуальність вашого бренду.
            </p>
            <Button className="bg-white hover:bg-gray-100 text-pink-500 text-sm px-6 py-2 rounded-md">ЗАМОВИТИ</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white px-4 py-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ПРО НАС</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ми - студія дизайну, яка втілює ваші мрії у реальні проекти. Наша команда професіоналів допоможе вам
              створити унікальний дизайн для вашого бізнесу.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">КОНТАКТИ</h3>
            <p className="text-sm text-gray-600 mb-2">КАТЕРИНА ТКАЧУК</p>
            <p className="text-sm text-gray-600 mb-4">EMAIL: INFO@TAITSSTUDIO.COM</p>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-6 py-2 rounded-md">
              ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
