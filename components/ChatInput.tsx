type ChatInputProps = {
    input: string
    setInput: (value: string) => void
    onSend: () => void
}

export default function ChatInput({ input, setInput, onSend }: ChatInputProps){
    return (
        <div className="fixed bottom-0 w-full max-w-md px-4 py-3 bg-pink-200">
            <textarea
                className="w-full rounded-full px-4 py-2 mb-2 bg-pink-100 text-gray-900 placeholder:text-gray-500 resize-none overflow-hidden leading-relaxed"
                placeholder="質問を入力してねー"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = `${e.target.scrollHeight}px`
                }}
                ref={(el) => {
                    if (el) {
                    el.style.height = 'auto'
                    el.style.height = `${el.scrollHeight}px`
                    }
                }}
                rows={1}
                style={{
                    minHeight: '2.5rem', // 約1行分
                    maxHeight: '10rem',   // 最大4〜5行分に調整
                }}
            />
            <button
                onClick={onSend}
                className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold"
            >
                送信
            </button>
        </div>
    )
}