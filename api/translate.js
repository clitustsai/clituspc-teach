const https = require('https');

function httpsPost(hostname, path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch (e) { reject(new Error('Parse error')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing params' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const prompt = targetLang === 'en'
    ? `Translate this Vietnamese text to English. Return ONLY the translation:\n${text}`
    : `Translate this English text to Vietnamese. Return ONLY the translation:\n${text}`;

  try {
    const result = await httpsPost(
      'generativelanguage.googleapis.com',
      `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 500, temperature: 0.2 } }
    );

    if (result.status !== 200) return res.status(500).json({ error: 'Translation failed' });
    const translated = result.body?.candidates?.[0]?.content?.parts?.[0]?.text || text;
    return res.json({ translated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
