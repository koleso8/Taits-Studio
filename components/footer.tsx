import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SocialNav } from "./SocialNav"

export default function Footer() {
  return (
    <footer className=" pb-[88px] h-[255px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:flex justify-between ">
          <div className="md:w-[460px]">
            <h3 className="text-lg font-bold mb-3">ПРО НАС</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ми – креативна дизайн-агенція, що створює унікальні проекти, автоматизує робочі процеси та забезпечує зручну співпрацю між клієнтами і дизайнерами.
            </p>

            <SocialNav className="justify-start" />

          </div>
          <div className="md:w-[335px]">
            <h3 className="text-lg font-bold mb-3">КОНТАКТИ</h3>
            <p className="text-sm text-gray-600 mb-1">КАТЕРИНА ТАІЦЬКА</p>
            <p className="text-sm text-gray-600 mb-6">KATERYNATAITSKA@GMAIL.COM</p>
            <Button className="w-[335px] h-12 px-4  border-2 border-[GRAY] rounded-lg text-GRAY text-base font-bold transition-all ease-linear duration-300 bg-white hover:bg-GRAY hover:text-white">
              ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
