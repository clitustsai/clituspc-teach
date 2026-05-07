const https = require('https');

function geminiRequest(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const path = `/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch (e) {
          reject(new Error('JSON parse failed. Raw: ' + raw.substring(0, 300)));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(new Error('Request timeout')); });
    req.write(body);
    req.end();
  });
}

const SYSTEM_PROMPT = `Bạn là trợ lý AI của Công ty TNHH Công Nghệ Clitus PC. Trả lời ngắn gọn, thân thiện bằng tiếng Việt.

Thông tin công ty:
- Tên: Công ty TNHH Công Nghệ Clitus PC
- Hotline: 0906 857 331
- Email: contact@clituspc.vn
- Website: clituspc.vn

Dịch vụ:
1. Thiết kế Website (landing page, e-commerce, doanh nghiệp)
2. App Di Động iOS & Android (React Native, Flutter)
3. Phần Mềm Quản Lý (ERP, CRM, POS)
4. Cloud & DevOps (AWS, VPS, CI/CD)
5. AI & Chatbot tự động hóa
6. Cho Thuê VPS & Server
7. Hosting & Tên Miền
8. Bảo Trì & Hỗ Trợ 24/7

Quy trình: Tiếp nhận → Tư vấn → Triển khai → Bảo trì
Kinh nghiệm: 5+ năm, 50+ dự án, 30+ khách hàng

Khi khách muốn báo giá, mời liên hệ hotline 0906 857 331 để được tư vấn cụ thể.
Trả lời tối đa 3-4 câu, đúng trọng tâm.`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  const contents = messages.slice(-10).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content) }],
  }));

  // Gemini requires alternating user/model, ensure starts with user
  const filtered = [];
  for (const msg of contents) {
    if (filtered.length === 0 && msg.role !== 'user') continue;
    if (filtered.length > 0 && filtered[filtered.length - 1].role === msg.role) continue;
    filtered.push(msg);
  }
  if (filtered.length === 0) {
    return res.status(400).json({ error: 'No valid messages' });
  }

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: filtered,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    ],
  };

  try {
    const result = await geminiRequest(apiKey, payload);
    if (result.status !== 200) {
      console.error('Gemini error:', result.status, JSON.stringify(result.body).substring(0, 300));
      const msg = result.body?.error?.message || 'AI service error';
      return res.status(500).json({ error: msg });
    }
    const reply = result.body?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Xin lỗi, tôi không thể trả lời lúc này.';
    return res.json({ reply: reply.trim() });
  } catch (err) {
    console.error('Chat error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
