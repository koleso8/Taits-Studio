"use client";

import { useState, useEffect } from "react";

export default function ProductDetailPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Загрузка текущего пользователя из localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    }
  }, []);

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