'use client'

import ChatInterface, { ChatInterfaceProps } from "@/components/chat-interface";
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

  const params = useParams();
  console.log(params); // Проверь что там
  const id = params.id;
  const designer: ChatInterfaceProps['designer'] = designers.find((designer) => designer.id === id)!
  console.log(designer);

  return (
    <>
      {!isChat ? <h2 className="text-center text-2xl text-GRAY  w-72">ВИ ПОКИ НЕ МАЄТЕ ЧАТІВ З ДИЗАЙНЕРАМИ</h2> :
        <ChatInterface designer={designer || null} />}

    </>
  )
}