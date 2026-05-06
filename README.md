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

## 📊 Analytics & Tracking

### Vercel Analytics

Vercel Analytics đã được tích hợp sẵn. Để xem dữ liệu:

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project `clituspc-tech`
3. Tab **Analytics** → xem traffic, page views, top pages
4. Tab **Speed Insights** → xem Core Web Vitals

**Metrics được track:**
- Page views & unique visitors
- Top pages & referrers
- Device & browser breakdown
- Core Web Vitals (LCP, FID, CLS)

### Microsoft Clarity (Heatmap & Session Recording)

Clarity đã được tích hợp nhưng cần setup Project ID:

1. Vào [clarity.microsoft.com](https://clarity.microsoft.com)
2. Đăng nhập bằng Microsoft account
3. **New Project** → nhập tên "Clitus PC Website"
4. Copy **Project ID** (dạng `abc123xyz`)
5. Mở `index.html`, tìm `CLARITY_PROJECT_ID` và thay bằng ID thật
6. Push lên GitHub → Vercel tự deploy

**Clarity cung cấp:**
- 🎥 Session recordings (xem video khách hàng dùng website)
- 🔥 Heatmaps (click, scroll, move)
- 📊 Rage clicks (khách bực mình click liên tục)
- ⚡ Dead clicks (click vào element không có tác dụng)
- 📱 Mobile vs Desktop behavior

### Custom Events Tracked

Website tự động track các sự kiện quan trọng:

| Event | Khi nào trigger | Data |
|-------|----------------|------|
| `demo_viewed` | Khách xem demo dự án | `{ project: 'ecommerce' }` |
| `blog_read` | Khách đọc bài blog | `{ article: 'ai-2025' }` |
| `phone_clicked` | Click số điện thoại | - |
| `email_clicked` | Click email | - |
| `zalo_clicked` | Click nút Zalo | - |
| `messenger_clicked` | Click nút Messenger | - |
| `newsletter_signup` | Đăng ký newsletter | `{ email: 'domain.com' }` |
| `scroll_depth` | Scroll 25%, 50%, 75%, 100% | `{ percent: 50 }` |
| `time_on_page` | Rời khỏi trang | `{ seconds: 120 }` |

### Xem Analytics Data

**Vercel Analytics:**
```
Dashboard → clituspc-tech → Analytics
```

**Microsoft Clarity:**
```
clarity.microsoft.com → Clitus PC Website → Dashboard
```

**Console Logs (Development):**
```javascript
// Mở DevTools Console để xem events real-time
// Mỗi event sẽ log: 📊 Event tracked: event_name { data }
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
