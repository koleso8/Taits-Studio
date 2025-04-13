"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  // Загрузка текущего пользователя и проверка чатов
  useEffect(() => {
    // Загружаем текущего пользователя
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    } else {
      // Если пользователь не авторизован, оставляем на странице
      return;
    }

    // Проверяем наличие чатов
    const savedChats = JSON.parse(localStorage.getItem("chats") || "{}");
    const chatIds = Object.keys(savedChats).filter(
      (chatId) => Array.isArray(savedChats[chatId]) && savedChats[chatId].length > 0
    );

    // Если есть чаты, перенаправляем в первый доступный чат
    if (chatIds.length > 0) {
      const firstChatId = chatIds[0]; // Например, "1-2"
      const designerId = firstChatId.split("-")[1]; // Извлекаем ID дизайнера (например, "2")
      router.push(`/messenger/${designerId}`);
    }
  }, [router]);

  return (
    <div className="flex items-center">
      <h2 className="text-2xl text-GRAY w-72 text-center mx-auto">
        {currentUser ? (
          currentUser.userType === "client" ? (
            "ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З ДИЗАЙНЕРАМИ"
          ) : (
            "ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З КЛІЄНТАМИ"
          )
        ) : (
          "БУДЬ ЛАСКА, УВІЙДІТЬ, ЩОБ ПЕРЕГЛЯНУТИ ЧАТИ"
        )}
      </h2>
    </div>
  );
}