'use client'

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTime } from "@/app/utils/format-time"

interface Message {
  id: string
  text: string
  sender: "user" | "designer"
  timestamp: Date
}

interface ChatInterfaceProps {
  designer: {
    id: string
    name: string
    spec: string
    avatar: string
    nicname: string,
    regDate: string,
    works: number,
    finishedProjects: number
  }
}

export default function ChatInterface({ designer }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Add designer's response after 2 seconds
    setTimeout(() => {
      const designerMessage: Message = {
        id: `msg-${Date.now()}`,
        text: "Вітаю! Обговоримо ваше замовлення",
        sender: "designer",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, designerMessage])
    }, 2000)
  }

  return (
    <div className="bg-white rounded-xl  flex flex-col items-stretch  h-[460px]">
      <header className="p-4 flex items-center">
        <h1 className="text-[40px] pl-20 mr-32 font-bold">ЧАТИ</h1>
        <div className="text-left">
          <p className="text-sm text-muted-foreground">{designer.spec}</p>
          <p className="font-bold text-2xl">{designer.name}</p>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">

        <aside className="w-80 ">
          <div className="flex items-center space-x-3 bg-YELLOW p-2 pl-6 rounded-r-xl">
            <Avatar className="w-14 h-14">
              <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
              <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{designer.name}</p>
              <p className="text-sm text-muted-foreground">{designer.regDate}</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col ">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Напишіть повідомлення, щоб почати консультацію
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "designer" && (
                    <Avatar className="mr-2">
                      <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
                      <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="max-w-[70%]">
                    {message.sender === "designer" && (
                      <div className="flex items-center mb-1">
                        <p className="font-bold mr-2">{designer.name}</p>
                        <span className="text-sm text-muted-foreground">{formatTime(message.timestamp)}</span>
                      </div>
                    )}

                    {message.sender === "user" && (
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">ВИ | {formatTime(message.timestamp)}</span>
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${message.sender === "user" ? "bg-YELLOW text-GRAY ml-auto" : "bg-muted"
                        }`}
                    >
                      {message.text}
                    </div>

                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Відправити повідомлення..."
                className="flex-1"
              />
              <Button type="submit" variant="ghost" className="ml-2 border">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.54039 2.43212C2.70209 2.29164 2.90181 2.20226 3.11431 2.17526C3.3268 2.14827 3.54253 2.18487 3.73422 2.28045L23.2342 12.0304C23.4145 12.1203 23.5662 12.2586 23.6722 12.4299C23.7782 12.6012 23.8343 12.7986 23.8343 13C23.8343 13.2015 23.7782 13.3989 23.6722 13.5702C23.5662 13.7414 23.4145 13.8798 23.2342 13.9696L3.73422 23.7196C3.54254 23.8155 3.32672 23.8524 3.11406 23.8256C2.90141 23.7988 2.70147 23.7096 2.53957 23.5691C2.37766 23.4287 2.26106 23.2434 2.20451 23.0366C2.14796 22.8299 2.15401 22.611 2.22189 22.4077L4.99739 14.0834H10.8333C11.1206 14.0834 11.3962 13.9692 11.5993 13.7661C11.8025 13.5629 11.9166 13.2873 11.9166 13C11.9166 12.7127 11.8025 12.4372 11.5993 12.234C11.3962 12.0308 11.1206 11.9167 10.8333 11.9167H4.99739L2.2208 3.59237C2.15327 3.38914 2.14749 3.17047 2.20417 2.96396C2.26086 2.75745 2.37857 2.57238 2.54039 2.43212Z" fill="#353535" />
                </svg>
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
