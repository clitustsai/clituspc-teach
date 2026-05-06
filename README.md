# Clitus PC Technology Company Limited

Website portfolio chuyên nghiệp cho Công ty TNHH Công Nghệ Clitus PC.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend API:** Vercel Serverless Functions (Node.js)
- **Email:** EmailJS
- **Deployment:** Vercel
- **Design:** Glassmorphism, Gradient, Dark theme

## 📦 Cấu trúc dự án

```
.
├── index.html          # Trang chủ
├── 404.html            # Trang lỗi 404
├── style.css           # CSS chính
├── main.js             # JavaScript chính
├── favicon.svg         # Icon website
├── api/
│   └── contact.js      # API gửi email (Vercel Function)
└── vercel.json         # Cấu hình Vercel
```

## 🎨 Tính năng

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme với glassmorphism
- ✅ 9 dự án với demo preview modal
- ✅ 6 bài blog với full content reader
- ✅ 5 testimonials từ khách hàng
- ✅ 8 FAQ với accordion
- ✅ Core values & team section
- ✅ Workflow timeline
- ✅ Partners marquee animation
- ✅ Floating Zalo/Messenger buttons
- ✅ Back to top button
- ✅ Newsletter subscription
- ✅ Mobile menu fullscreen với animation

## ⚡ Performance Optimization

### Tối ưu hình ảnh

Hiện tại website sử dụng SVG và gradient CSS thuần, không có ảnh raster. Nếu cần thêm ảnh:

1. **Nén ảnh trước khi upload:**
   - Sử dụng [TinyPNG](https://tinypng.com) hoặc [Squoosh](https://squoosh.app)
   - Target: < 200KB/ảnh

2. **Chuyển sang WebP:**
   ```bash
   # Cài đặt cwebp (macOS)
   brew install webp
   
   # Convert ảnh
   cwebp input.jpg -q 80 -o output.webp
   ```

3. **Lazy loading:**
   ```html
   <img src="image.webp" loading="lazy" alt="Description" />
   ```

4. **Responsive images:**
   ```html
   <picture>
     <source srcset="image-mobile.webp" media="(max-width: 768px)" />
     <source srcset="image-desktop.webp" media="(min-width: 769px)" />
     <img src="image-desktop.webp" alt="Description" />
   </picture>
   ```

### Core Web Vitals Target

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Google PageSpeed Score:** 90+

## 🔧 Development

```bash
# Clone repo
git clone https://github.com/clitustsai/clituspc-teach.git

# Không cần install dependencies cho frontend (vanilla JS)

# Deploy lên Vercel
vercel --prod
```

## 📧 Email Configuration

Website sử dụng EmailJS để gửi email. Cấu hình trong `main.js`:

```javascript
const EMAILJS_SERVICE_ID  = 'service_c9ymomg';
const EMAILJS_TEMPLATE_ID = 'template_ijjdyma';
const EMAILJS_PUBLIC_KEY  = 'Rg4WUf0eDWXIAhPW_';
```

## 🌐 Deployment

Website tự động deploy khi push lên GitHub main branch thông qua Vercel.

**Production URL:** https://clituspc-tech.vercel.app

## 📱 Contact

- **Phone:** 0906 857 331
- **Email:** infoclituspc@gmail.com
- **Fanpage:** Clitus PC - Full Stack Developer

---

© 2024 Công ty TNHH Công Nghệ Clitus PC. All rights reserved.
