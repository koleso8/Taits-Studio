"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatInterface from "@/components/chat-interface";

// Интерфейс для типизации пользователей
interface User {
  id: string; // Изменено на string
  name: string;
  avatar: string;
  nicname: string;
  spec: string;
  regDate: string;
  works: number;
  finishedProjects: number;
  userType: "client" | "designer";
}

export default function MessengerPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [interlocutor, setInterlocutor] = useState<User | null>(null);
  const { id } = useParams(); // Получаем id из маршрута (например, /messenger/1)
  const router = useRouter();

  // Дефолтный дизайнер
  const defaultDesigner: User = {
    id: "1", // Изменено на строку
    avatar: "/ava.png",
    name: "ТАІЦЬКА КАТЕРИНА",
    nicname: "tai.tss",
    spec: "Графічний дизайнер",
    regDate: "29/03/2025",
    works: 3,
    finishedProjects: 1,
    userType: "designer",
  };

  // Загрузка данных
  useEffect(() => {
    // Загрузка текущего пользователя
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      // Преобразуем id в строку, если это число
      user.id = String(user.id);
      setCurrentUser(user);
    } else {
      // Редирект на /login, если пользователь не авторизован
      router.push("/login");
      return;
    }

    // Загрузка собеседника
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (user.userType === "client") {
      // Для клиента: ищем дизайнера по id
      const foundDesigner = users.find(
        (u: any) => u.userType === "designer" && String(u.id) === String(id)
      );
      if (foundDesigner) {
        foundDesigner.id = String(foundDesigner.id); // Преобразуем id в строку
        setInterlocutor(foundDesigner);
      } else {
        setInterlocutor(defaultDesigner);
      }
    } else if (user.userType === "designer") {
      // Для дизайнера: ищем клиента по id
      const foundClient = users.find(
        (u: any) => u.userType === "client" && String(u.id) === String(id)
      );
      if (foundClient) {
        // Адаптируем данные клиента под структуру ChatInterface
        setInterlocutor({
          id: String(foundClient.id),
          name: foundClient.name,
          avatar: foundClient.avatar || "/placeholderUser.png",
          nicname: foundClient.name.split(" ")[0].toLowerCase(),
          spec: "Клієнт",
          regDate: foundClient.regDate || new Date().toLocaleDateString("uk-UA"),
          works: 0,
          finishedProjects: 0,
          userType: "client",
        });
      } else {
        setInterlocutor({
          id: String(id),
          name: "КЛІЄНТ НЕ ЗНАЙДЕНИЙ",
          avatar: "/placeholderUser.png",
          nicname: "unknown",
          spec: "Клієнт",
          regDate: new Date().toLocaleDateString("uk-UA"),
          works: 0,
          finishedProjects: 0,
          userType: "client",
        });
      }
    }
  }, [id, router]);

  // Лоадер, пока данные загружаются
  if (!currentUser || !interlocutor) {
    return <p className="text-GRAY text-center">Завантаження...</p>;
  }

  return (
    <div className="flex items-center">
      {interlocutor.name === "КЛІЄНТ НЕ ЗНАЙДЕНИЙ" ? (
        <h2 className="text-2xl text-GRAY w-72 text-center mx-auto">
          ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З КЛІЄНТАМИ
        </h2>
      ) : (
        <ChatInterface designer={interlocutor} />
      )}
    </div>
  );
}