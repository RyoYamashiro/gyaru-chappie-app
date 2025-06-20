'use client'

import { useState, useEffect, useRef } from 'react'
import ChatLog, {ChatMessage} from '@/components/ChatLog'
import ChatInput from '@/components/ChatInput'

export default function Home() {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState<{ sender: 'あんた' | 'チャッピー'; text: string }[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    const newLog: ChatMessage[] = [
      ...chatLog,
      {sender: 'あんた', text: input},
      {sender: 'チャッピー', text: '絶対あぜったいあれ観るべきじゃん！「ラ・ラ・ランド」とかやば〜💜'}
    ]
    setChatLog(newLog)
    setInput('')
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
