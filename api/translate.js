module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the given text to ${targetLang === 'en' ? 'English' : 'Vietnamese'}. Return ONLY the translated text, no explanations. Keep HTML tags intact if present.`
          },
          { role: 'user', content: text }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });
    const data = await response.json();
    const translated = data.choices?.[0]?.message?.content || text;
    return res.json({ translated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Translation failed' });
  }
};
