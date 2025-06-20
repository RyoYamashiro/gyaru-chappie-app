import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { message } = req.body
    const apiKey = process.env.OPENAI_API_KEY

    if(!apiKey) {
        return res.status(500).json({message: 'Missing API Key'})
    }

    try {
        const completionRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                message: [
                    {role: 'system', content: 'あなたは明るくて可愛いギャルです。語尾に「〜じゃん」「〜かも」「〜しよ〜」などをつけて話してね。'},
                    {role: 'user', content: message}
                ],
            }),
        })

        const data = await completionRes.json()
        const reply = data.choices?.[0]?.message?.content
        res.status(200).json({reply})
    } catch(err) {
        res.status(500).json({message: 'Error connectiong to OpenAI'})
    }
}