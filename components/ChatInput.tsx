type ChatInputProps = {
    input: string
    setInput: (value: string) => void
    onSend: () => void
}

export default function ChatInput({ input, setInput, onSend }: ChatInputProps){
    return (
        <div className="fixed bottom-0 w-full max-w-md px-4 py-3 bg-pink-200">
            <textarea
                className="w-full rounded-full px-4 py-4 mb-2 bg-pink-100 text-gray-900 placeholder:text-gray-500"
                placeholder="質問を入力してねー"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
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