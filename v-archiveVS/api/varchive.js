export default async function handler(req, res) {
  const path = req.query.path || ''
  const { path: _, ...rest } = req.query
  const queryString = new URLSearchParams(rest).toString()
  const url = `https://v-archive.net/api/v2/${path}${queryString ? '?' + queryString : ''}`

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}
