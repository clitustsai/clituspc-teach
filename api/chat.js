module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `Bạn là trợ lý AI của Công ty TNHH Công Nghệ Clitus PC. Hãy trả lời ngắn gọn, thân thiện bằng tiếng Việt.

Thông tin công ty:
- Tên: Công ty TNHH Công Nghệ Clitus PC
- Hotline: 0906 857 331
- Email: contact@clituspc.vn
- Website: clituspc.vn

Dịch vụ:
1. Thiết kế Website (landing page, e-commerce, doanh nghiệp) — từ 5 triệu
2. App Di Động iOS & Android (React Native, Flutter) — từ 15 triệu
3. Phần Mềm Quản Lý (ERP, CRM, POS) — báo giá theo yêu cầu
4. Cloud & DevOps (AWS, VPS, CI/CD) — từ 3 triệu/tháng
5. AI & Tự Động Hóa (chatbot, xử lý dữ liệu) — báo giá theo yêu cầu
6. Cho Thuê VPS & Server — từ 300k/tháng
7. Hosting & Tên Miền — từ 50k/tháng
8. Bảo Trì & Hỗ Trợ 24/7

Quy trình: Tiếp nhận → Tư vấn → Triển khai → Bảo trì
Kinh nghiệm: 5+ năm, 50+ dự án, 30+ khách hàng

Khi khách hỏi về giá hoặc muốn tư vấn chi tiết, hãy mời họ liên hệ hotline 0906 857 331 hoặc điền form liên hệ trên website.
Trả lời tối đa 3-4 câu, đúng trọng tâm.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10), // giữ 10 tin nhắn gần nhất
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('OpenAI error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời lúc này.';
    return res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
