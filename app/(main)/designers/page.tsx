"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ShopPage() {
  // Дефолтный дизайнер
  const defaultDesigner = {
    email: "1@example.com",
    password: "123",
    id: "1",
    avatar: "/ava.png",
    name: "ТАІЦЬКА КАТЕРИНА",
    nicname: "tai.tss",
    regDate: "29/03/2025",
    works: 3,
    finishedProjects: 1,
  };

  const [designers, setDesigners] = useState([defaultDesigner]);

  // Загрузка дизайнеров из localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const designersList = users.filter((user: any) => user.userType === "designer");

    // Объединяем дефолтного дизайнера с зарегистрированными
    // Если есть дизайнер с id: 1 в localStorage, он заменит дефолтного
    const updatedDesigners = designersList.reduce((acc: any[], designer: any) => {
      if (designer.id === defaultDesigner.id) {
        return [...acc, designer]; // Заменяем дефолтного
      }
      return [...acc, designer];
    }, []);

    // Добавляем дефолтного дизайнера, если его не заменили
    if (!updatedDesigners.some((d: any) => d.id === defaultDesigner.id)) {
      updatedDesigners.unshift(defaultDesigner);
    }

    setDesigners(updatedDesigners);
  }, []);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center font-bold text-[40px] text-GRAY mb-11">НАШІ ДИЗАЙНЕРИ</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {designers.length > 0 ? (
          designers.map((designer: any) => (
            <li key={designer.id} className="flex items-start gap-4">
              <div className="flex">
                <Image
                  src={designer.avatar}
                  alt={designer.name}
                  width={127}
                  height={127}
                  className="object-cover rounded-full shadow-md min-w-[126px] min-h-[126px] max-w-[127px] max-h-[127px]"
                />
              </div>
              <div className="pt-[10px] flex flex-col">
                <h2 className="text-2xl mb-4">
                  {designer.name} {" "}<br />
                  <span className="text-ROZA font-bold">{designer.nicname}</span>
                </h2>
                <Link
                  href={`/designers/${designer.id}`}
                  className="text-GRAY font-bold w-56 h-10 py-6 border-2 flex items-center justify-center border-GRAY rounded-lg transition-all ease-linear duration-300 bg-white hover:bg-GRAY hover:text-white"
                >
                  ПРОФІЛЬ ДИЗАЙНЕРА
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p className="text-GRAY text-lg">Дизайнерів поки немає</p>
        )}
      </ul>
    </section>
  );
}