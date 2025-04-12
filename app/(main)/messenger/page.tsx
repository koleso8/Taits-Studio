'use client'

import ChatInterface from "@/components/chat-interface";
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation";

export default function ProductDetailPage({ }) {
  const designers = [
    {
      id: '1',
      avatar: '/ava.png',
      name: 'ТАІЦЬКА КАТЕРИНА',
      nicname: 'tai.tss',
      spec: 'Графічний дизайнер',
      regDate: '29/03/2025',
      works: 3,
      finishedProjects: 1
    }
  ]

  const isChat = true

  // const { id } = useParams(); // Получаем параметры из URL


  return (
    <>
      {!isChat ? <h2 className="text-center text-2xl text-GRAY  w-72">ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З ДИЗАЙНЕРАМИ</h2> :
        <ChatInterface designer={designers[0]} />}
    </>
  )
}
