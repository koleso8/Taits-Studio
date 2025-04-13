import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/Card"
import { SocialNav } from "@/components/SocialNav"

export default function HomePage() {
  return (
    <div className="">

      <main >
        {/* Hero Section */}
        <Card className="pt-12 pb-7 flex flex-col items-center mb-[130px]">
          <div className="w-[520px]">
            <h1 className="text-2xl md:text-[40px]  mb-8 leading-[50px]">ПЕРЕТВОРЮЄМО ІДЕЇ В УНІКАЛЬНИЙ ДИЗАЙН!</h1>
            <p className="text-base max-w-2xl mx-auto mb-16">
              МИ — КОМАНДА ПРОФЕСІОНАЛІВ, ЯКІ СТВОРЮЮТЬ СТИЛЬНІ, ФУНКЦІОНАЛЬНІ ТА ЕФЕКТИВНІ ДИЗАЙНИ ДЛЯ ВАШОГО БІЗНЕСУ
            </p>
          </div>
          <Link href="/consultation">
            <Button className="bg-transparent hover:bg-white/20 border-2 border-white text-white text-xl font-bold px-6 py-3 rounded-lg mb-8">
              БЕЗКОШТОВНА КОНСУЛЬТАЦІЯ
            </Button>
          </Link>
          <SocialNav white={true} />
        </Card>

        {/* About Us Section */}
        <section className="flex flex-col items-center text-GRAY w-[834px] mx-auto mb-28">
          <h2 className="text-xl font-bold mb-4">ПРО НАС</h2>
          <p className="text-xl text-gray-700  font-normal text-center">
            "Креатив що працює" – наша місія та основний принцип. Ми – команда професійних дизайнерів, які створюють унікальні графічні рішення для бізнесу. Наша платформа надає повний спектр послуг: від розробки логотипів і UI/UX-дизайну до готових шаблонів, які можна адаптувати під ваші потреби. Ми забезпечуємо зручний інтерфейс для співпраці між клієнтами та дизайнерами, автоматизуємо процеси управління замовленнями та гарантуємо високу якість виконання проєктів.<br /> З нами ви отримаєте не просто дизайн – а ефективний інструмент для розвитку вашого бренду!
          </p>
        </section>

        {/* Testimonials Section */}
        <section className=" mb-[108px]">
          <h2 className="text-[40px] font-bold mb-14 text-center">ВІДГУКИ НАШИХ КЛІЄНТІВ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="shadow-[inset_0_4px_14px_0_rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.31)] w-[286] rounded-2xl p-7 h-80 flex flex-col justify-between">
              <p className="text-sm text-gray-700 ">
                Замовляв редизайн сайту для свого бренду, і результат перевершив усі очікування! Команда врахувала всі побажання, запропонувала круті ідеї та зробила стильний і сучасний дизайн. Рекомендую!
              </p>
              <div className="text-right">
                <p className="text-sm font-semibold">ОЛЕКСАНДР МЕЛЬНИК</p>
                <p className="text-[#adadad]">12/01/2025</p>
              </div>
            </div>
            <div className="shadow-[inset_0_4px_14px_0_rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.31)] w-[286] rounded-2xl p-7 h-80 flex flex-col justify-between">
              <p className="text-sm text-gray-700 ">
                Дуже задоволена співпрацею! Дизайнери не лише створили красивий макет, але й зробили його максимально зручним для користувачів. Окремий плюс – швидкий зворотний зв'язок і професійний підхід.
              </p>
              <div className="text-right">
                <p className="text-sm font-semibold">МАРИНА КОВАЛЬЧУК</p>
                <p className="text-[#adadad]">30/01/2025</p>
              </div>
            </div>
            <div className="shadow-[inset_0_4px_14px_0_rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.31)] w-[286] rounded-2xl p-7 h-80 flex flex-col justify-between">
              <p className="text-sm text-gray-700 ">
                Потрібен був мінімалістичний логотип для стартапу, і хлопці впоралися просто відмінно. Робота виконана швидко, якісно і точно за брифом. Дякую за вашу творчість!
              </p>
              <div className="text-right">
                <p className="text-sm font-semibold">АНДРІЙ САВЧУК</p>
                <p className="text-[#adadad]">26/02/2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <Card className=" p-8 flex flex-col items-start mb-[168px]">
          <h2 className="text-[32px] font-bold text-white mb-1">ЗАМОВЛЯЙ ДИЗАЙН ЛОГОТИПУ</h2>
          <h2 className="text-[32px] font-bold text-white mb-3">ПРЯМО ЗАРАЗ!</h2>
          <p className="text-xl text-white mb-8 max-w-[642px] text-left ">
            Ми створимо унікальний логотип, що відображатиме індивідуальність вашого бренду.
          </p>
          <Link href="/shop"><Button className="font-bold bg-transparent text-white hover:bg-white hover:text-pink-500 text-sm px-6 py-[10px] border-2 border-white p-3 transition-all ease-linear duration-300 rounded-xl">ЗАМОВИТИ</Button></Link>
        </Card>
      </main>

    </div>
  )
}
