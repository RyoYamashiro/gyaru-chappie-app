import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POSTだけやで〜🙅‍♀️' })
  }

  const { message } = req.body
  console.log('chat.tsです')
  try {
  console.log('chat.tsのtryぞ')
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'あなたはギャル口調のアシスタントです。語尾は軽めにしてね！' },
          { role: 'user', content: message }
        ]
      })
    })

    const data = await response.json()
    if (response.status === 401) {
        return res.status(200).json({ reply: 'APIキーが間違ってるかも〜💦確認してみて？' })
      }
    if (response.ok) {
      const reply = data.choices?.[0]?.message?.content || 'え、ちょっと何言ってるかわかんない〜😭'
      return res.status(200).json({ reply })
    } else {
      console.error('❌ OpenAI API Error:', data)
      return res.status(200).json({ reply: 'ごめん、なんかうまくいかなかったっぽ😭' })
    }
  } catch (error) {
    console.error('❌ 通信エラー:', error)
    return res.status(200).json({ reply: 'え〜まって〜！通信トラブルかも〜💦' })
  }
}



// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end()
//   }

//   const { message } = req.body

//   if (!message) {
//     return res.status(400).json({ reply: 'メッセージがないっぽ〜😭' })
//   }

//   try {
//     const completionRes = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: message }],
//       }),
//     })

//     const data = await completionRes.json()

//     return res.status(200).json({
//       reply: data.choices?.[0]?.message?.content ?? 'うまく返せなかったかも〜😭',
//     })
//   } catch (err) {
//     return res.status(500).json({ reply: 'エラーしちゃった〜😭' })
//   }
// }