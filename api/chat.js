const https = require('https');

function httpsPost(hostname, path, data, headers) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname,
      path,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), ...headers },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch (e) { reject(new Error('Parse error: ' + raw.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const SYSTEM_PROMPT = `Bạn là trợ lý AI của Công ty TNHH Công Nghệ Clitus PC. Trả lời ngắn gọn, thân thiện bằng tiếng Việt.

Thông tin công ty:
- Tên: Công ty TNHH Công Nghệ Clitus PC
- Hotline: 0906 857 331
- Email: contact@clituspc.vn

Dịch vụ & giá:
1. Website (landing page, e-commerce, doanh nghiệp) — từ 5 triệu
2. App iOS & Android (React Native, Flutter) — từ 15 triệu
3. Phần mềm ERP, CRM, POS — báo giá theo yêu cầu
4. Cloud & DevOps — từ 3 triệu/tháng
5. AI & Chatbot — báo giá theo yêu cầu
6. VPS & Server — từ 300k/tháng
7. Hosting & Tên miền — từ 50k/tháng
8. Bảo trì 24/7

Quy trình: Tiếp nhận → Tư vấn → Triển khai → Bảo trì
Kinh nghiệm: 5+ năm, 50+ dự án, 30+ khách hàng

Khi khách muốn báo giá chi tiết, mời liên hệ hotline 0906 857 331.
Trả lời tối đa 3-4 câu.`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid request' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  // Build Gemini contents format
  const contents = messages.slice(-10).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
  };

  try {
    const result = await httpsPost(
      'generativelanguage.googleapis.com',
      `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      payload,
      {}
    );

    if (result.status !== 200) {
      console.error('Gemini error:', result.status, JSON.stringify(result.body));
      return res.status(500).json({ error: result.body?.error?.message || 'AI error' });
    }

    const reply = result.body?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Xin lỗi, tôi không thể trả lời lúc này.';
    return res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
