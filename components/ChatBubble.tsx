type ChatBubbleProps = {
    sender: 'あんた' | 'チャッピー';
    text: string;
}

export default function ChatBubble({sender, text}: ChatBubbleProps) {
    const isUser = sender === 'あんた'

    return (
        <div className={`flex ${isUser ? 'justify-end': 'justify-start'}`}>
            <div
                className={`rounded-2xl px-4 py-2 max-w-xs break-words text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'bg-pink-100 text-gray-900' : 'bg-pink-400 text-white'}`}
            >
                {text}
            </div>
        </div>
    )
}