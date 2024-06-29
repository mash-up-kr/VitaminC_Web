export async function POST(request: Request) {
  const { errorMessage } = await request.json()
  const discordWebhook =
    'https://discord.com/api/webhooks/1256711079162155028/jMxuFfS6QbRg3uEPNTtFxMHnL9Qr3lae2szgBYPdgmpCus1gjLwbsH-JmfESwt67CYbU'

  fetch(discordWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: errorMessage }),
  })
}
