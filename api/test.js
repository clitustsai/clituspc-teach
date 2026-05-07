module.exports = async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  res.json({
    gemini: geminiKey ? 'SET (' + geminiKey.substring(0, 8) + '...)' : 'NOT SET',
    openai: openaiKey ? 'SET' : 'NOT SET',
    node: process.version,
  });
};
