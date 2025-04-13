"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  category: string;
  author: string;
  isFree: boolean;
  price: number;
  format: string;
  dimensions: string;
  size: string;
  image: string;
  downloads: number;
  isTemplate: boolean;
  createdAt: string;
}

export default function ProductDetailPage() {
  // Дефолтный дизайнер
  const defaultDesigner = {
    email: "1@example.com",
    password: "123",
    id: "1",
    avatar: "/ava.png",
    name: "ТАІЦЬКА КАТЕРИНА",
    nicname: "tai.tss",
    spec: "Графічний дизайнер",
    regDate: "29/03/2025",
    works: 0, // Начальное значение будет перезаписано
    finishedProjects: 1,
  };

  const { id } = useParams(); // Получаем id из URL
  const [designer, setDesigner] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]); // Состояние для шаблонов дизайнера
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Загрузка данных
  useEffect(() => {
    // Загрузка текущего пользователя
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    }

    // Загрузка дизайнера по id
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    let foundDesigner = users.find(
      (user: any) => user.userType === "designer" && String(user.id) === String(id)
    );

    // Загружаем шаблоны дизайнера
    const storedProducts = localStorage.getItem("user-products");
    let products: Product[] = [];
    if (storedProducts) {
      products = JSON.parse(storedProducts);
      setUserProducts(
        products.filter((p: Product) => p.author === (foundDesigner?.nicname || foundDesigner?.name))
      );
    }

    // Если дизайнер найден, обновляем его поле works
    if (foundDesigner) {
      const updatedDesigner = {
        ...foundDesigner,
        works: products.filter((p: Product) => p.author === (foundDesigner.nicname || foundDesigner.name)).length,
      };
      setDesigner(updatedDesigner);

      // Обновляем массив users в localStorage
      const updatedUsers = users.map((u: any) =>
        String(u.id) === String(id) ? updatedDesigner : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      // Если дизайнер не найден, используем дефолтный
      setDesigner({ ...defaultDesigner, works: 0 });
    }
  }, [id]);

  // Обновление works при изменении userProducts (например, после удаления шаблона)
  useEffect(() => {
    if (designer) {
      const updatedDesigner = { ...designer, works: userProducts.length };
      setDesigner(updatedDesigner);

      // Обновляем массив users в localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) =>
        String(u.id) === String(id) ? updatedDesigner : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }, [userProducts, id]);

  // Обработчик удаления шаблона
  const handleDeleteTemplate = (templateId: number) => {
    if (confirm("Ви впевнені, що хочете видалити цей шаблон?")) {
      const updatedProducts = userProducts.filter((product) => product.id !== templateId);
      setUserProducts(updatedProducts);
      localStorage.setItem("user-products", JSON.stringify(updatedProducts));
      setMessage({ type: "success", text: "Шаблон успішно видалено" });
    }
  };

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

      {/* Отображение шаблонов дизайнера */}
      <div className="mt-12 w-full max-w-3xl">
        <h2 className="text-center font-bold text-gray-800 text-2xl mb-4">
          {currentUser?.userType === "designer" && String(id) === String(currentUser.id)
            ? "ВАШІ ШАБЛОНИ"
            : "ШАБЛОНИ ДИЗАЙНЕРА"}
        </h2>
        {userProducts.length === 0 ? (
          <p className="text-center text-gray-600">
            {currentUser?.userType === "designer" && String(id) === String(currentUser.id)
              ? "Ви ще не додали жодного шаблону."
              : "Цей дизайнер ще не додав шаблонів."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-9">
            {userProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-GRAY rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-sm text-gray-600">
                      Ціна: {product.price} грн {product.isFree && "(Безкоштовно)"}
                    </p>
                  </div>
                </div>
                {/* Кнопка удаления (только для самого дизайнера) */}
                {currentUser?.userType === "designer" && String(id) === String(currentUser.id) && (
                  <Button
                    onClick={() => handleDeleteTemplate(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Сообщение об успехе или ошибке */}
      {message && (
        <div
          className={`p-3 mt-4 rounded-md text-center ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {message.text}
        </div>
      )}
    </section>
  );
}