import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-white px-4 py-8 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ПРО НАС</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ми – креативна дизайн-агенція, що створює унікальні проекти, автоматизує робочі процеси та забезпечує
              зручну співпрацю між клієнтами і дизайнерами.
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">КОНТАКТИ</h3>
            <p className="text-sm text-gray-600 mb-1">КАТЕРИНА ТАІЦЬКА</p>
            <p className="text-sm text-gray-600 mb-4">KATERYNATAITSKA@GMAIL.COM</p>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-6 py-2 rounded-md">
              ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
