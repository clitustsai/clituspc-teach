const https = require('https');

module.exports = async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    return res.json({ status: 'ERROR', gemini: 'NOT SET' });
  }

  // Test actual Gemini call
  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: 'Say hello in Vietnamese in 5 words max' }] }],
    generationConfig: { maxOutputTokens: 50 }
  });

  const result = await new Promise((resolve) => {
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const req2 = https.request(options, (r) => {
      let raw = '';
      r.on('data', c => raw += c);
      r.on('end', () => resolve({ status: r.statusCode, raw: raw.substring(0, 500) }));
    });
    req2.on('error', e => resolve({ status: 0, raw: e.message }));
    req2.write(body);
    req2.end();
  });

  res.json({
    gemini_key: 'SET (' + geminiKey.substring(0, 8) + '...)',
    node: process.version,
    api_status: result.status,
    api_response: result.raw
  });
};
