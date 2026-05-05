const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, company, phone, email, service, message } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Clitus PC Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `[Clitus PC] Yêu cầu tư vấn từ ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;border-radius:12px;">
        <div style="background:#1a56db;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:20px;">📩 Yêu cầu tư vấn mới</h2>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Clitus PC Technology Company Limited</p>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:140px;font-size:14px;">Họ và tên</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Công ty</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;">${company || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Điện thoại</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;"><a href="tel:${phone}" style="color:#1a56db;">${phone}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;"><a href="mailto:${email}" style="color:#1a56db;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Dịch vụ</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;">${service || '—'}</td></tr>
          </table>
          ${message ? `
          <div style="margin-top:16px;">
            <p style="color:#64748b;font-size:13px;margin-bottom:8px;">Mô tả dự án:</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;font-size:14px;line-height:1.6;color:#334155;">${message.replace(/\n/g, '<br/>')}</div>
          </div>` : ''}
          <div style="margin-top:20px;padding:12px 16px;background:#eff6ff;border-radius:8px;font-size:13px;color:#1e40af;">
            💡 Reply trực tiếp email này để trả lời <strong>${name}</strong>
          </div>
        </div>
        <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">© Clitus PC Technology Company Limited</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể gửi email. Vui lòng thử lại.' });
  }
};
