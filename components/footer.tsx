"use client";

import Link from "next/link";
import { SocialNav } from "./SocialNav";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Загрузка текущего пользователя из localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    }
  }, []);

  // Проверка, является ли пользователь дизайнером
  const isDesignerUser = currentUser?.userType === "designer";
  // Проверка, авторизован ли пользователь и является ли клиентом
  const showConsultationButton = !currentUser?.id || currentUser?.userType === "client";

  return (
    <footer className="pb-[60px] h-[255px] pt-[60px]">
      <div className="container mx-auto mt-auto">
        <div className="grid grid-cols-1 md:flex justify-between">
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
            <p className="text-sm text-gray-600 mb-6">KATERYNATSITSKA@GMAIL.COM</p>
            {showConsultationButton ? (
              <Link
                href="/consultation"
                className="w-[335px] h-12 border-2 border-[GRAY] rounded-lg text-GRAY text-base font-bold transition-all ease-linear duration-300 bg-white hover:bg-GRAY hover:text-white px-6 py-4"
              >
                ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
              </Link>
            ) : isDesignerUser ? (
              <Link
                href="/addTemplate"
                className="w-[335px] h-12 border-2 border-[GRAY] rounded-lg text-GRAY text-base font-bold transition-all ease-linear duration-300 bg-white hover:bg-GRAY hover:text-white px-6 py-4"
              >
                ЗАВАНТАЖТИ НОВИЙ ШАБЛОН
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}