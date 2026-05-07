const https = require('https');

function geminiCall(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(Buffer.concat(chunks).toString()) });
        } catch (e) {
          reject(new Error('Parse error: ' + Buffer.concat(chunks).toString().slice(0, 200)));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('Timeout')));
    req.write(body);
    req.end();
  });
}

const SYSTEM = `Bạn là trợ lý AI của Công ty TNHH Công Nghệ Clitus PC. Trả lời ngắn gọn, thân thiện bằng tiếng Việt (3-4 câu).
Thông tin: Hotline 0906 857 331 | Email infoclituspc@gmail.com | Website clituspc.vn
Dịch vụ: Website, App iOS/Android, ERP/CRM, Cloud/DevOps, AI/Chatbot, VPS/Hosting, Bảo trì 24/7
Khi hỏi giá: mời liên hệ hotline để báo giá miễn phí.`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  // Build alternating user/model contents
  const contents = [];
  for (const m of messages.slice(-10)) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (contents.length && contents[contents.length - 1].role === role) continue;
    contents.push({ role, parts: [{ text: String(m.content) }] });
  }
  if (!contents.length || contents[0].role !== 'user') {
    return res.status(400).json({ error: 'Must start with user message' });
  }

  try {
    const result = await geminiCall(apiKey, {
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
    });

    if (result.status !== 200) {
      const msg = result.data?.error?.message || `Gemini error ${result.status}`;
      console.error('Gemini:', result.status, msg);
      return res.status(500).json({ error: msg });
    }

    const reply = result.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || 'Xin lỗi, tôi không thể trả lời lúc này.';
    return res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
