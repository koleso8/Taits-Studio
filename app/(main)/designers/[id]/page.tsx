"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductDetailPage() {
  // Дефолтный дизайнер
  const defaultDesigner = {
    id: "1",
    avatar: "/ava.png",
    name: "ТАІЦЬКА КАТЕРИНА",
    nicname: "tai.tss",
    spec: "Графічний дизайнер",
    regDate: "29/03/2025",
    works: 3,
    finishedProjects: 1,
  };

  const { id } = useParams(); // Получаем id из URL
  const [designer, setDesigner] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Загрузка данных
  useEffect(() => {
    // Загрузка текущего пользователя
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    }

    // Загрузка дизайнера по id
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundDesigner = users.find(
      (user: any) => user.userType === "designer" && String(user.id) === String(id)
    );

    // Если дизайнер найден, используем его, иначе — дефолтный
    setDesigner(foundDesigner || defaultDesigner);
  }, [id]);

  // Если дизайнер еще не загружен, показываем лоадер
  if (!designer) {
    return <p className="text-GRAY text-center">Завантаження...</p>;
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center font-bold text-[40px] text-GRAY mb-11">
        {currentUser?.userType === "designer" && String(id) === String(currentUser.id)
          ? "МІЙ ПРОФІЛЬ"
          : "ПРОФІЛЬ ДИЗАЙНЕРА"}
      </h1>
      <div className="flex items-start gap-12">
        <div className="flex">
          <Image
            src={designer.avatar}
            alt={designer.name}
            width={303}
            height={303}
            className="object-cover rounded-sm shadow-md"
          />
        </div>
        <div className="flex flex-col self-stretch h-[303px]">
          <p className="mb-7">{designer.spec}</p>
          <h2 className="text-2xl font-bold">{designer.name}</h2>
          <p className="mb-5 text-GRAY">
            Нікнейм <span className="text-ROZA font-bold">{designer.nicname}</span>
          </p>

          <div className="flex flex-col h-full justify-between">
            <div className="flex h-full flex-col justify-between pl-3 mb-auto">
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>На платформі з {designer.regDate}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>Кількість опублікованих робіт {designer.works}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>Кількіть успішно завершених проектів {designer.finishedProjects}</span>
                </li>
              </ul>
            </div>
            {currentUser?.userType === "designer" && String(id) === String(currentUser.id) ? (
              <Link
                href="/editProfile"
                className="text-GRAY font-bold h-10 py-6 flex items-center justify-center rounded-lg bg-YELLOW hover:bg-yellow-300 transition-all ease-linear duration-300 w-64"
              >
                РЕДАГУВАТИ ПРОФІЛЬ
              </Link>
            ) : (
              <Link
                href={`/messenger/${designer.id}`}
                className="text-GRAY font-bold h-10 py-6 flex items-center justify-center rounded-lg bg-YELLOW hover:bg-yellow-300 transition-all ease-linear duration-300"
              >
                ЗАПИСАТИСЬ НА КОНСУЛЬТАЦІЮ
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}