import ChatBubble from './ChatBubble'

export type ChatMessage = {
    sender: 'あんた' | 'チャッピー';
    text: string;
}

type ChatLogProps = {
    chatLog: ChatMessage[]
    bottomRef: React.RefObject<HTMLDivElement | null>
}

export default function ChatLog({chatLog, bottomRef}: ChatLogProps) {
    return (
        <div className="w-full max-w-md flex-1 space-y-2 mt-4">
            {chatLog.map((item, index) => (
                <ChatBubble key={index} sender={item.sender} text={item.text} />
            ))}
            <div ref={bottomRef} className="scroll-mt-24" />
        </div>
    )
}