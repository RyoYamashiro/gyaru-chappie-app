'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState<{ sender: 'あんた' | 'チャッピー'; text: string }[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    const newLog: { sender: 'あんた' | 'チャッピー'; text: string }[] = [
      ...chatLog,
      { sender: 'あんた', text: input },
      { sender: 'チャッピー', text: 'ぜったいあれ観るべきじゃん！「ラ・ラ・ランド」とかやば〜💜' },
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

      <div className="w-full max-w-md flex-1 space-y-2 mt-4">
        {chatLog.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.sender === 'あんた' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-xs break-words text-sm leading-relaxed ${
                item.sender === 'あんた'
                  ? 'bg-pink-100 text-gray-900'
                  : 'bg-pink-400 text-white'
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="fixed bottom-0 w-full max-w-md px-4 py-3 bg-pink-200">
        <textarea
          className="w-full rounded-full px-4 py-2 mb-2 bg-pink-100 text-gray-900 placeholder:text-gray-500"
          placeholder="質問を入力してねー"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold"
        >
          送信
        </button>
      </div>
    </main>
  )
}
