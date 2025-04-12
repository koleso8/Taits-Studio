'use client'

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
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
    <div className="bg-white rounded-xl">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ЧАТИ</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{designer.spec}</p>
          <p className="font-bold">{designer.name}</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r bg-yellow-100 p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
              <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{designer.name}</p>
              <p className="text-sm text-muted-foreground">31/03/2025</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
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

                    <div
                      className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                        }`}
                    >
                      {message.text}
                    </div>

                    {message.sender === "user" && (
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">ВИ | {formatTime(message.timestamp)}</span>
                      </div>
                    )}
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
              <Button type="submit" variant="ghost" className="ml-2">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
