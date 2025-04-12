"use server";

import { revalidatePath } from "next/cache";

// Define the Product type
export interface Product {
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

// Get products (default + stored)
export async function getProducts(): Promise<Product[]> {
  const defaultProducts = [
    {
      id: 1,
      title: "Банер реклама літніх розваг",
      category: "Графіка",
      author: "tait.tss",
      isFree: true,
      price: 0,
      format: "PNG",
      dimensions: "1512 x 982 px",
      size: "904 KB",
      image: "/summer.png",
      downloads: 0,
      isTemplate: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Банер реклама газового напою",
      category: "Графіка",
      author: "tait.tss",
      isFree: false,
      price: 50,
      format: "PNG",
      dimensions: "1512 x 982 px",
      size: "1.48 MB",
      image: "/strawberry.png",
      downloads: 0,
      isTemplate: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Шаблон для банеру або логотипу",
      category: "Графіка",
      author: "tait.tss",
      isFree: true,
      price: 0,
      format: "PNG",
      dimensions: "1512 x 982 px",
      size: "1.48 MB",
      image: "/template.png",
      downloads: 0,
      isTemplate: true,
      createdAt: new Date().toISOString(),
    },
  ];

  // В реальном проекте userProducts можно получать из базы данных или другого хранилища
  // Здесь мы предполагаем, что клиент отправляет userProducts через форму или другой механизм
  // Для примера вернем только defaultProducts, так как localStorage недоступен на сервере
  return defaultProducts;
}

// Add a new product
export async function addProduct(formData: FormData) {
  try {
    // Get the file from the form
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      return { success: false, message: "No file uploaded" };
    }

    // Upload the file to ImgBB
    const imgBBFormData = new FormData();
    imgBBFormData.append("image", file);

    const imgBBResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=31d576e5bc23d5f253f5f3a44d3bb8c3`,
      {
        method: "POST",
        body: imgBBFormData,
      }
    );

    const imgBBData = await imgBBResponse.json();
    if (!imgBBData.success) {
      throw new Error("Failed to upload image to ImgBB");
    }

    // Get existing products
    const existingProducts = await getProducts();

    // Determine isFree based on price
    const price = Number.parseInt(formData.get("price") as string) || 0;
    const isFree = price === 0;
    const randomId = Math.floor(1000 + Math.random() * 9000);
    // Create new product object
    const newProduct: Product = {
      id: randomId,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      author: (formData.get("author") as string) || "tait.tss",
      isFree: isFree, // Устанавливаем на основе цены
      price: price,
      format: file.type.split("/")[1]?.toUpperCase() || "PNG",
      dimensions: (formData.get("dimensions") as string) || "1512 x 982 px",
      size: `${(file.size / 1024).toFixed(2)} KB`,
      image: imgBBData.data.url, // Сохраняем ссылку от ImgBB
      downloads: 0,
      isTemplate: false, // Устанавливаем false, так как поле отсутствует в форме
      createdAt: new Date().toISOString(),
    };

    // Возвращаем новый продукт клиенту для сохранения в localStorage
    revalidatePath("/shop");

    return {
      success: true,
      message: "Product added successfully",
      newProduct,
    };
  } catch (error) {
    console.error("Failed to add product:", error);
    return { success: false, message: "Failed to add product" };
  }
}