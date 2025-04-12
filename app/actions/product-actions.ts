"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { put } from "@vercel/blob"

// Define the Product typeCannot find module '@vercel/blob' or its corresponding type declarations.ts(2307)
export interface Product {
  id: number
  title: string
  category: string
  author: string
  isFree: boolean
  price: number
  format: string
  dimensions: string
  size: string
  image: string
  downloads: number
  isTemplate: boolean
  createdAt: string
}

// Get products from cookies or return default products
export async function getProducts(): Promise<Product[]> {
  const storedProducts = cookies().get("user-products")?.value

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
  ]

  if (!storedProducts) {
    return defaultProducts
  }

  try {
    const userProducts = JSON.parse(storedProducts) as Product[]
    return [...defaultProducts, ...userProducts]
  } catch (error) {
    console.error("Failed to parse stored products:", error)
    return defaultProducts
  }
}

// Add a new product
export async function addProduct(formData: FormData) {
  try {
    // Get the file from the form
    const file = formData.get("image") as File

    if (!file || file.size === 0) {
      return { success: false, message: "No file uploaded" }
    }

    // Upload the file to Vercel Blob
    const blob = await put(`products/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    // Get existing products
    const existingProducts = await getProducts()

    // Create new product object
    const newProduct: Product = {
      id: Math.max(0, ...existingProducts.map((p) => p.id)) + 1,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      author: (formData.get("author") as string) || "tait.tss",
      isFree: formData.get("isFree") === "true",
      price: Number.parseInt(formData.get("price") as string) || 0,
      format: file.type.split("/")[1]?.toUpperCase() || "PNG",
      dimensions: (formData.get("dimensions") as string) || "1512 x 982 px",
      size: `${(file.size / 1024).toFixed(2)} KB`,
      image: blob.url,
      downloads: 0,
      isTemplate: formData.get("isTemplate") === "true",
      createdAt: new Date().toISOString(),
    }

    // Get user-added products from cookies
    const storedProducts = cookies().get("user-products")?.value
    let userProducts: Product[] = []

    if (storedProducts) {
      try {
        userProducts = JSON.parse(storedProducts)
      } catch (error) {
        console.error("Failed to parse stored products:", error)
      }
    }

    // Add the new product
    userProducts.push(newProduct)

    // Save updated products to cookies
    // Note: This has a size limitation. For a production app, use a database
    cookies().set("user-products", JSON.stringify(userProducts), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    // Revalidate the shop page to show the new product
    revalidatePath("/shop")

    return { success: true, message: "Product added successfully" }
  } catch (error) {
    console.error("Failed to add product:", error)
    return { success: false, message: "Failed to add product" }
  }
}
