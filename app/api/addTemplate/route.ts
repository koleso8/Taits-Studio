import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Здесь ваша логика для обработки POST-запроса
  const formData = await request.formData(); // Если отправляете FormData
  // Пример: const result = await addProduct(formData);
  return NextResponse.json({ message: "Template added successfully" }, { status: 200 });
}