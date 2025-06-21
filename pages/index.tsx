'use client'

import ChatInput from '@/components/ChatInput'
import ChatLog from '@/components/ChatLog'
import { useState, useEffect, useRef } from 'react'

type Message = {
  sender: 'あんた' | 'チャッピー'
  text: string
}

export default function Home() {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState<Message[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { sender: 'あんた', text: input }
    setChatLog((prev) => [...prev, userMessage])
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    })

    const data = await res.json()
    const assistantMessage: Message = { sender: 'チャッピー', text: data.reply }
    setChatLog((prev) => [...prev, assistantMessage])
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog])

  return (
    <main className="min-h-screen bg-pink-200 flex flex-col items-center pt-20 px-4 pb-28 relative overflow-x-hidden overflow-y-auto" style={{ backgroundColor: '#fbcfe8' }}>
      <div className="fixed top-0 w-full max-w-md px-4 py-4 bg-pink-200 z-10">
        <h1 className="text-2xl font-bold text-pink-600 text-center">💄✨ チャッピーに任せて 🌈</h1>
      </div>

      <ChatLog chatLog={chatLog} bottomRef={chatEndRef} />
      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </main>
  )
}