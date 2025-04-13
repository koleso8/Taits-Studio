"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime } from "@/app/utils/format-time";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "designer";
  timestamp: Date;
}

interface Designer {
  id: string;
  name: string;
  spec: string;
  avatar: string;
  nicname: string;
  regDate: string;
  works: number;
  finishedProjects: number;
}

export interface ChatInterfaceProps {
  designer: Designer;
}

export default function ChatInterface({ designer }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [allChats, setAllChats] = useState<{ [key: string]: Message[] }>({});
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [activeChats, setActiveChats] = useState<(Designer & { chatId: string })[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Загрузка текущего пользователя, чатов и дизайнеров
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user && user.id) {
      setCurrentUser(user);
    } else {
      console.error("Current user not found or invalid.");
      return;
    }

    // Загружаем дизайнеров из users
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("All Users:", users);

    // Проверяем, есть ли ТАІЦЬКА КАТЕРИНА в списке
    const taickaKaterina = users.find((u: any) => u.id === "1" && u.name === "ТАІЦЬКА КАТЕРИНА");
    if (!taickaKaterina) {
      // Добавляем ТАІЦЬКА КАТЕРИНА, если её нет
      const newDesigner = {
        id: "1",
        name: "ТАІЦЬКА КАТЕРИНА",
        userType: "designer",
        spec: "Графічний дизайнер",
        avatar: "/ava.png",
        nicname: "tai.tss",
        regDate: "2023-01-01",
        works: 10,
        finishedProjects: 5,
      };
      users.push(newDesigner);
      localStorage.setItem("users", JSON.stringify(users)); // Сохраняем обновлённый список
      console.log("Added ТАІЦЬКА КАТЕРИНА to users:", newDesigner);
    }

    const designerList = users
      .filter((u: any) => u.userType === "designer")
      .map((u: any) => ({
        id: String(u.id),
        name: u.name,
        spec: u.spec || "",
        avatar: u.avatar || "/placeholderUser.png",
        nicname: u.nicname || "",
        regDate: u.regDate || new Date().toLocaleDateString("uk-UA"),
        works: u.works || 0,
        finishedProjects: u.finishedProjects || 0,
      }));
    setDesigners(designerList);
    console.log("Designer List:", designerList);

    // Загружаем все чаты
    const savedChats = JSON.parse(localStorage.getItem("chats") || "{}");
    const transformedChats = Object.keys(savedChats).reduce((acc, chatId) => {
      acc[chatId] = savedChats[chatId].map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      return acc;
    }, {} as { [key: string]: Message[] });

    setAllChats(transformedChats);
    console.log("Loaded Chats:", transformedChats);

    // Загружаем чат для текущего дизайнера
    const chatId = `${user.id}-${designer.id}`;
    console.log("Chat ID for current designer:", chatId);
    if (transformedChats[chatId]) {
      setMessages(transformedChats[chatId]);
      const userMessages = transformedChats[chatId].filter((m: Message) => m.sender === "user").length;
      setUserMessageCount(userMessages);
    } else {
      setMessages([]);
      setUserMessageCount(0);
    }

    // Формируем activeChats из allChats
    const activeChatsList = Object.keys(transformedChats)
      .filter((chatId) => transformedChats[chatId].length > 0)
      .map((chatId) => {
        const designerId = chatId.split("-")[1];
        const designerData = designerList.find((d: Designer) => d.id === designerId);
        return {
          chatId,
          id: designerId,
          name: designerData?.name || `Дизайнер ${designerId}`,
          spec: designerData?.spec || "",
          avatar: designerData?.avatar || "/placeholderUser.png",
          nicname: designerData?.nicname || "",
          regDate: designerData?.regDate || new Date().toLocaleDateString("uk-UA"),
          works: designerData?.works || 0,
          finishedProjects: designerData?.finishedProjects || 0,
        };
      });
    setActiveChats(activeChatsList);
    console.log("Initial Active Chats:", activeChatsList);
  }, [designer.id]);

  // Обновляем activeChats при изменении allChats
  useEffect(() => {
    if (currentUser && designers.length > 0) {
      const activeChatsList = Object.keys(allChats)
        .filter((chatId) => allChats[chatId].length > 0)
        .map((chatId) => {
          const designerId = chatId.split("-")[1];
          const designerData = designers.find((d) => d.id === designerId);
          return {
            chatId,
            id: designerId,
            name: designerData?.name || `Дизайнер ${designerId}`,
            spec: designerData?.spec || "",
            avatar: designerData?.avatar || "/placeholderUser.png",
            nicname: designerData?.nicname || "",
            regDate: designerData?.regDate || new Date().toLocaleDateString("uk-UA"),
            works: designerData?.works || 0,
            finishedProjects: designerData?.finishedProjects || 0,
          };
        });
      setActiveChats(activeChatsList);
      console.log("Updated Active Chats:", activeChatsList);
    }
  }, [allChats, currentUser, designers]);

  // Загрузка текста консультации из localStorage
  useEffect(() => {
    const savedMessage = localStorage.getItem("consultationMessage");
    if (savedMessage) {
      setInputValue(savedMessage);
      localStorage.removeItem("consultationMessage");
    }
  }, []);

  // Auto-scroll to bottom when messages or typing state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || !currentUser) {
      console.error("Cannot send message: input empty or currentUser not set.");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserMessageCount((prev) => prev + 1);
    setInputValue("");
    setIsTyping(true);

    // Update allChats immediately
    const chatId = `${currentUser.id}-${designer.id}`;
    console.log("Sending message to Chat ID:", chatId, "Message:", userMessage);
    setAllChats((prev) => {
      const updatedChats = { ...prev, [chatId]: updatedMessages };
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      console.log("Updated Chats after user message:", updatedChats);
      return updatedChats;
    });

    // Add designer's response after 2 seconds
    setTimeout(() => {
      const designerMessage: Message = {
        id: `msg-${Date.now()}`,
        text:
          userMessageCount === 0
            ? "Вітаю! Обговоримо ваше замовлення"
            : "Дуууже цікава ідея, я зв'яжусь з вами протягом дня для уточнення деталей",
        sender: "designer",
        timestamp: new Date(),
      };

      const updatedMessagesWithDesigner = [...updatedMessages, designerMessage];
      setMessages(updatedMessagesWithDesigner);
      setIsTyping(false);

      // Update allChats again after designer response
      setAllChats((prev) => {
        const updatedChats = { ...prev, [chatId]: updatedMessagesWithDesigner };
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        console.log("Updated Chats after designer response:", updatedChats);
        return updatedChats;
      });
    }, 2000);
  };

  // Получение последнего сообщения для чата
  const getLastMessage = (chatId: string) => {
    const chat = allChats[chatId];
    if (!chat || chat.length === 0) return null;
    return chat[chat.length - 1];
  };

  return (
    <div className="bg-white rounded-xl flex flex-col flex-1 h-[460px]">
      <header className="p-4 flex items-center">
        <h1 className="text-[40px] pl-20 mr-32 font-bold">ЧАТИ</h1>
        <div className="text-left">
          <p className="text-sm text-muted-foreground">{designer.spec}</p>
          <p className="font-bold text-2xl">{designer.name}</p>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-gray-50 border-r">
          <div className="flex flex-col p-2 space-y-2 overflow-y-auto h-full">
            {activeChats.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Немає активних чатів
              </div>
            ) : (
              activeChats.map((chat) => {
                const lastMessage = getLastMessage(chat.chatId);
                const isActive = chat.id === designer.id;

                return (
                  <Link
                    key={chat.id}
                    href={`/messenger/${chat.id}`}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${isActive ? "bg-YELLOW" : "hover:bg-gray-100"
                      }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{chat.name}</p>
                      {lastMessage && (
                        <p className="text-xs text-muted-foreground truncate">
                          {lastMessage.text}
                        </p>
                      )}
                      {lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && !isTyping ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Напишіть повідомлення, щоб почати консультацію
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {message.sender === "designer" && (
                      <Avatar className="mr-2">
                        <AvatarImage
                          src={designer.avatar || "/placeholder.svg"}
                          alt={designer.name}
                        />
                        <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}

                    <div className="max-w-[70%]">
                      {message.sender === "designer" && (
                        <div className="flex items-center mb-1">
                          <p className="font-bold mr-2">{designer.name}</p>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      )}

                      {message.sender === "user" && (
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">
                            ВИ | {formatTime(message.timestamp)}
                          </span>
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
                ))}
                {isTyping && (
                  <div className="flex justify-start items-center space-x-2 text-muted-foreground">
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={designer.avatar || "/placeholder.svg"}
                        alt={designer.name}
                      />
                      <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Друкує...</span>
                    </div>
                  </div>
                )}
              </>
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
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.54039 2.43212C2.70209 2.29164 2.90181 2.20226 3.11431 2.17526C3.3268 2.14827 3.54253 2.18487 3.73422 2.28045L23.2342 12.0304C23.4145 12.1203 23.5662 12.2586 23.6722 12.4299C23.7782 12.6012 23.8343 12.7986 23.8343 13C23.8343 13.2015 23.7782 13.3989 23.6722 13.5702C23.5662 13.7414 23.4145 13.8798 23.2342 13.9696L3.73422 23.7196C3.54254 23.8155 3.32672 23.8524 3.11406 23.8256C2.90141 23.7988 2.70147 23.7096 2.53957 23.5691C2.37766 23.4287 2.26106 23.2434 2.20451 23.0366C2.14796 22.8299 2.15401 22.611 2.22189 22.4077L4.99739 14.0834H10.8333C11.1206 14.0834 11.3962 13.9692 11.5993 13.7661C11.8025 13.5629 11.9166 13.2873 11.9166 13C11.9166 12.7127 11.8025 12.4372 11.5993 12.234C11.3962 12.0308 11.1206 11.9167 10.8333 11.9167H4.99739L2.2208 3.59237C2.15327 3.38914 2.14749 3.17047 2.20417 2.96396C2.26086 2.75745 2.37857 2.57238 2.54039 2.43212Z"
                    fill="#353535"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

