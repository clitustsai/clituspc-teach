// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.innerHTML = isOpen ? '✕' : '&#9776;';
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.innerHTML = '&#9776;';
  document.body.style.overflow = '';
}));

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .project-card, .tech-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Demo Modal
const demos = {
  ecommerce: {
    title: '🛒 Sàn Thương Mại Điện Tử',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">shop.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Tổng doanh thu</h4><p>₫ 248,500,000</p></div>
          <div class="demo-block"><h4>Đơn hàng hôm nay</h4><p>142 đơn</p></div>
          <div class="demo-block"><h4>Sản phẩm</h4><p>1,284 SKU</p></div>
          <div class="demo-block"><h4>Khách hàng</h4><p>3,891 người</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>#DH00142</td><td>Nguyễn Minh Tuấn</td><td>iPhone 15 Pro</td><td>₫ 28,990,000</td><td><span class="demo-badge green">Đã giao</span></td></tr>
          <tr><td>#DH00141</td><td>Trần Thị Lan Anh</td><td>MacBook Air M2</td><td>₫ 32,500,000</td><td><span class="demo-badge blue">Đang giao</span></td></tr>
          <tr><td>#DH00140</td><td>Lê Quốc Hùng</td><td>AirPods Pro</td><td>₫ 6,490,000</td><td><span class="demo-badge yellow">Chờ xác nhận</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  erp: {
    title: '⚙️ Phần Mềm Quản Lý Doanh Nghiệp ERP',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">erp.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Nhân viên</h4><p>86 người</p></div>
          <div class="demo-block"><h4>Tồn kho</h4><p>12,450 sản phẩm</p></div>
          <div class="demo-block"><h4>Doanh thu tháng</h4><p>₫ 1.2 tỷ</p></div>
          <div class="demo-block"><h4>Đơn nhập kho</h4><p>34 phiếu</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Phòng ban</th><th>Nhân viên</th><th>Chấm công</th><th>Lương</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>Kinh doanh</td><td>24 người</td><td>98%</td><td>₫ 180,000,000</td><td><span class="demo-badge green">Đã duyệt</span></td></tr>
          <tr><td>Kỹ thuật</td><td>18 người</td><td>100%</td><td>₫ 162,000,000</td><td><span class="demo-badge green">Đã duyệt</span></td></tr>
          <tr><td>Kế toán</td><td>8 người</td><td>95%</td><td>₫ 64,000,000</td><td><span class="demo-badge yellow">Chờ duyệt</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  food: {
    title: '🍔 Ứng Dụng Đặt Đồ Ăn',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">food.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Đơn đang giao</h4><p>28 đơn</p></div>
          <div class="demo-block"><h4>Tài xế online</h4><p>15 người</p></div>
          <div class="demo-block"><h4>Nhà hàng</h4><p>42 đối tác</p></div>
          <div class="demo-block"><h4>Đánh giá TB</h4><p>4.8 ⭐</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Đơn hàng</th><th>Món ăn</th><th>Tài xế</th><th>Khoảng cách</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>#F0892</td><td>Bún bò Huế x2</td><td>Phạm Văn Đức</td><td>1.2 km</td><td><span class="demo-badge blue">Đang giao</span></td></tr>
          <tr><td>#F0891</td><td>Cơm tấm sườn x1</td><td>Nguyễn Thanh Bình</td><td>0.8 km</td><td><span class="demo-badge green">Đã giao</span></td></tr>
          <tr><td>#F0890</td><td>Phở bò tái x3</td><td>Đang tìm</td><td>2.1 km</td><td><span class="demo-badge yellow">Chờ tài xế</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  realestate: {
    title: '🏠 Cổng Thông Tin Bất Động Sản',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">bds.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Tin đăng</h4><p>2,841 bất động sản</p></div>
          <div class="demo-block"><h4>Lượt xem hôm nay</h4><p>4,290 lượt</p></div>
          <div class="demo-block"><h4>Môi giới</h4><p>186 người</p></div>
          <div class="demo-block"><h4>Giao dịch tháng</h4><p>34 hợp đồng</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Bất động sản</th><th>Khu vực</th><th>Diện tích</th><th>Giá</th><th>Loại</th></tr></thead>
        <tbody>
          <tr><td>Căn hộ Vinhomes</td><td>Q.Bình Thạnh</td><td>72 m²</td><td>₫ 4.2 tỷ</td><td><span class="demo-badge blue">Bán</span></td></tr>
          <tr><td>Nhà phố Thủ Đức</td><td>TP. Thủ Đức</td><td>120 m²</td><td>₫ 8.5 tỷ</td><td><span class="demo-badge blue">Bán</span></td></tr>
          <tr><td>Văn phòng Q.1</td><td>Quận 1</td><td>200 m²</td><td>₫ 85tr/tháng</td><td><span class="demo-badge yellow">Thuê</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  hospital: {
    title: '🏥 Phần Mềm Quản Lý Phòng Khám',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">clinic.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Bệnh nhân hôm nay</h4><p>64 người</p></div>
          <div class="demo-block"><h4>Đang chờ khám</h4><p>12 người</p></div>
          <div class="demo-block"><h4>Bác sĩ trực</h4><p>8 người</p></div>
          <div class="demo-block"><h4>Doanh thu ngày</h4><p>₫ 24,500,000</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Bệnh nhân</th><th>Bác sĩ</th><th>Chuyên khoa</th><th>Giờ hẹn</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>Nguyễn Thị Lan Hương</td><td>BS. Minh Khoa</td><td>Nội tổng quát</td><td>08:30</td><td><span class="demo-badge green">Đã khám</span></td></tr>
          <tr><td>Trần Văn Bình Minh</td><td>BS. Thu Hà</td><td>Tim mạch</td><td>09:00</td><td><span class="demo-badge blue">Đang khám</span></td></tr>
          <tr><td>Lê Thị Minh Châu</td><td>BS. Quốc Hùng</td><td>Nhi khoa</td><td>09:30</td><td><span class="demo-badge yellow">Chờ khám</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  elearning: {
    title: '📚 App Học Trực Tuyến',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">edu.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Học viên</h4><p>12,480 người</p></div>
          <div class="demo-block"><h4>Khóa học</h4><p>186 khóa</p></div>
          <div class="demo-block"><h4>Chứng chỉ đã cấp</h4><p>3,240 chứng chỉ</p></div>
          <div class="demo-block"><h4>Đánh giá TB</h4><p>4.9 ⭐</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Khóa học</th><th>Giảng viên</th><th>Học viên</th><th>Tiến độ TB</th><th>Đánh giá</th></tr></thead>
        <tbody>
          <tr><td>React & Node.js Fullstack</td><td>Minh Trí</td><td>842</td><td>68%</td><td><span class="demo-badge green">4.9 ★</span></td></tr>
          <tr><td>Flutter Mobile App</td><td>Thu Hằng</td><td>521</td><td>54%</td><td><span class="demo-badge green">4.8 ★</span></td></tr>
          <tr><td>Python AI & ML</td><td>Quốc Bảo</td><td>1,204</td><td>42%</td><td><span class="demo-badge green">4.9 ★</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  hotel: {
    title: '🏨 Hệ Thống Đặt Phòng Khách Sạn',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">hotel.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Phòng đang thuê</h4><p>48 / 60 phòng</p></div>
          <div class="demo-block"><h4>Check-in hôm nay</h4><p>12 khách</p></div>
          <div class="demo-block"><h4>Check-out hôm nay</h4><p>8 khách</p></div>
          <div class="demo-block"><h4>Doanh thu tháng</h4><p>₫ 380,000,000</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Phòng</th><th>Khách hàng</th><th>Check-in</th><th>Check-out</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>Deluxe 201</td><td>Nguyễn Hoàng Phúc</td><td>06/05/2025</td><td>08/05/2025</td><td><span class="demo-badge blue">Đang ở</span></td></tr>
          <tr><td>Suite 301</td><td>Trần Gia Bảo Châu</td><td>07/05/2025</td><td>10/05/2025</td><td><span class="demo-badge yellow">Sắp đến</span></td></tr>
          <tr><td>Standard 105</td><td>—</td><td>—</td><td>—</td><td><span class="demo-badge green">Trống</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  pos: {
    title: '🧾 Phần Mềm Bán Hàng & Kho',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">pos.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Doanh thu hôm nay</h4><p>₫ 18,240,000</p></div>
          <div class="demo-block"><h4>Số hóa đơn</h4><p>84 hóa đơn</p></div>
          <div class="demo-block"><h4>Sản phẩm sắp hết</h4><p>7 mặt hàng</p></div>
          <div class="demo-block"><h4>Chi nhánh</h4><p>3 cửa hàng</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Sản phẩm</th><th>Tồn kho</th><th>Đã bán hôm nay</th><th>Giá bán</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>Sữa Vinamilk 1L</td><td>240 hộp</td><td>48 hộp</td><td>₫ 32,000</td><td><span class="demo-badge green">Còn hàng</span></td></tr>
          <tr><td>Mì Hảo Hảo thùng</td><td>12 thùng</td><td>8 thùng</td><td>₫ 115,000</td><td><span class="demo-badge yellow">Sắp hết</span></td></tr>
          <tr><td>Nước suối Lavie</td><td>0 thùng</td><td>0</td><td>₫ 48,000</td><td><span class="demo-badge" style="background:rgba(239,68,68,0.15);color:#ef4444">Hết hàng</span></td></tr>
        </tbody></table>
      </div></div>`
  },
  logistics: {
    title: '🚚 App Quản Lý Vận Chuyển',
    html: `<div class="demo-browser">
      <div class="demo-browser-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><div class="url">logistics.demo.clituspc.vn</div></div>
      <div class="demo-content">
        <div class="demo-row">
          <div class="demo-block"><h4>Đơn hàng đang giao</h4><p>142 đơn</p></div>
          <div class="demo-block"><h4>Tài xế đang chạy</h4><p>38 người</p></div>
          <div class="demo-block"><h4>Giao thành công hôm nay</h4><p>284 đơn</p></div>
          <div class="demo-block"><h4>Tỷ lệ thành công</h4><p>96.8%</p></div>
        </div>
        <table class="demo-table"><thead><tr><th>Mã vận đơn</th><th>Tài xế</th><th>Điểm giao</th><th>Khoảng cách</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>VD-00284</td><td>Nguyễn Tài</td><td>Q. Gò Vấp</td><td>3.2 km</td><td><span class="demo-badge blue">Đang giao</span></td></tr>
          <tr><td>VD-00283</td><td>Trần Lực</td><td>Q. Tân Bình</td><td>1.8 km</td><td><span class="demo-badge green">Đã giao</span></td></tr>
          <tr><td>VD-00282</td><td>Lê Hùng</td><td>Q. Bình Thạnh</td><td>5.1 km</td><td><span class="demo-badge yellow">Chờ lấy hàng</span></td></tr>
        </tbody></table>
      </div></div>`
  }
};

function openDemo(key) {
  const demo = demos[key];
  if (!demo) return;
  document.getElementById('demoTitle').textContent = demo.title;
  document.getElementById('demoScreen').innerHTML = demo.html;
  document.getElementById('demoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo() {
  document.getElementById('demoModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('demoModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('demoModal')) closeDemo();
});

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-newsletter');
  const input = e.target.querySelector('input');
  btn.textContent = '✓ Đã đăng ký!';
  btn.style.background = '#16a34a';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Đăng ký';
    btn.style.background = '';
  }, 3000);
});

// Blog articles
const blogPosts = {
  'ai-2025': {
    title: 'AI sẽ thay đổi ngành phát triển phần mềm như thế nào vào năm 2025?',
    date: '15 Tháng 4, 2025', read: '8 phút đọc', cat: '🤖 Xu hướng',
    content: `
      <div class="highlight-box"><p>AI không thay thế lập trình viên — AI giúp lập trình viên làm việc nhanh gấp 3-5 lần. Đây là cơ hội, không phải mối đe dọa.</p></div>
      <h2>1. GitHub Copilot và sự thay đổi cách viết code</h2>
      <p>GitHub Copilot, được hỗ trợ bởi OpenAI Codex, đã trở thành công cụ không thể thiếu với hàng triệu lập trình viên toàn cầu. Thay vì gõ từng dòng code, developer chỉ cần viết comment mô tả ý định và AI sẽ tự động gợi ý đoạn code hoàn chỉnh.</p>
      <p>Theo khảo sát của GitHub năm 2024, các lập trình viên sử dụng Copilot hoàn thành task nhanh hơn <strong>55%</strong> so với không dùng AI.</p>
      <h2>2. AI trong kiểm thử và debug</h2>
      <p>Các công cụ như Devin, Cursor AI không chỉ viết code mà còn tự động phát hiện bug, đề xuất fix và viết unit test. Điều này giúp giảm đáng kể thời gian QA và tăng chất lượng sản phẩm.</p>
      <ul>
        <li>Tự động sinh test case từ code hiện có</li>
        <li>Phát hiện security vulnerability trong real-time</li>
        <li>Gợi ý refactor code để tối ưu hiệu năng</li>
        <li>Tự động viết documentation</li>
      </ul>
      <h2>3. Tác động đến doanh nghiệp Việt Nam</h2>
      <p>Với các SME Việt Nam, AI mang lại cơ hội tiếp cận công nghệ cao với chi phí thấp hơn. Một team 3-5 người với AI tools có thể làm được công việc của team 10-15 người trước đây.</p>
      <h2>4. Kỹ năng cần có trong kỷ nguyên AI</h2>
      <p>Lập trình viên cần tập trung vào: tư duy giải quyết vấn đề, hiểu business logic, kỹ năng prompt engineering và khả năng review/validate code do AI sinh ra.</p>
      <div class="highlight-box"><p>💡 <strong>Lời khuyên từ Clitus PC:</strong> Đừng sợ AI. Hãy học cách làm việc cùng AI để tăng năng suất và tạo ra sản phẩm tốt hơn cho khách hàng.</p></div>
    `
  },
  'website-slow': {
    title: '5 lý do website doanh nghiệp của bạn load chậm và cách khắc phục',
    date: '8 Tháng 4, 2025', read: '5 phút đọc', cat: '⚡ Hướng dẫn',
    content: `
      <div class="highlight-box"><p>53% người dùng rời bỏ website nếu trang load quá 3 giây. Tốc độ website ảnh hưởng trực tiếp đến doanh thu và thứ hạng Google.</p></div>
      <h2>1. Hình ảnh chưa được tối ưu</h2>
      <p>Đây là nguyên nhân phổ biến nhất. Nhiều website upload ảnh gốc 5-10MB thay vì nén xuống còn 100-200KB. Giải pháp: sử dụng định dạng WebP, nén ảnh với TinyPNG, và lazy loading.</p>
      <h2>2. Hosting chất lượng thấp</h2>
      <p>Shared hosting giá rẻ thường có server response time cao (>500ms). Nâng cấp lên VPS hoặc cloud hosting có thể giảm TTFB xuống còn 50-100ms.</p>
      <h2>3. Không sử dụng CDN</h2>
      <p>CDN (Content Delivery Network) phân phối nội dung từ server gần người dùng nhất. Với khách hàng ở Việt Nam, sử dụng CDN có datacenter tại Singapore hoặc Hồng Kông sẽ giảm latency đáng kể.</p>
      <h2>4. Quá nhiều plugin/script</h2>
      <p>Mỗi plugin WordPress hay script bên thứ 3 đều thêm HTTP request. Audit và loại bỏ những gì không cần thiết, bundle và minify JS/CSS.</p>
      <h2>5. Không có caching</h2>
      <p>Caching giúp browser và server không phải tải lại nội dung đã có. Cấu hình browser cache, server-side cache (Redis/Memcached) và page cache.</p>
      <div class="highlight-box"><p>🎯 <strong>Mục tiêu:</strong> Google PageSpeed Score 90+, LCP dưới 2.5s, FID dưới 100ms, CLS dưới 0.1.</p></div>
    `
  },
  'rn-vs-flutter': {
    title: 'React Native vs Flutter 2025: Nên chọn gì để phát triển app di động?',
    date: '1 Tháng 4, 2025', read: '6 phút đọc', cat: '📱 Kinh nghiệm',
    content: `
      <div class="highlight-box"><p>Không có câu trả lời tuyệt đối. Lựa chọn phụ thuộc vào team, dự án và mục tiêu kinh doanh của bạn.</p></div>
      <h2>React Native — Sức mạnh của JavaScript</h2>
      <p>React Native do Meta phát triển, sử dụng JavaScript/TypeScript. Ưu điểm lớn nhất là tái sử dụng code với web (nếu dùng React), cộng đồng lớn và nhiều thư viện sẵn có.</p>
      <ul>
        <li>✅ Cộng đồng lớn, nhiều tài liệu</li>
        <li>✅ Dễ tuyển dụng developer JS</li>
        <li>✅ Hot reload nhanh</li>
        <li>❌ Hiệu năng kém hơn Flutter với animation phức tạp</li>
        <li>❌ Bridge architecture gây overhead</li>
      </ul>
      <h2>Flutter — Hiệu năng native thực sự</h2>
      <p>Flutter do Google phát triển, dùng ngôn ngữ Dart. Compile trực tiếp sang native code, không qua bridge, cho hiệu năng vượt trội.</p>
      <ul>
        <li>✅ Hiệu năng cao, animation mượt</li>
        <li>✅ UI nhất quán trên mọi platform</li>
        <li>✅ Hỗ trợ iOS, Android, Web, Desktop</li>
        <li>❌ Dart ít phổ biến hơn JS</li>
        <li>❌ App size lớn hơn</li>
      </ul>
      <h2>Kết luận</h2>
      <p><strong>Chọn React Native</strong> nếu team đã có kinh nghiệm JavaScript, cần tích hợp nhiều thư viện JS, hoặc muốn share code với web app.</p>
      <p><strong>Chọn Flutter</strong> nếu cần UI phức tạp, animation mượt, hoặc muốn build cho nhiều platform (mobile + web + desktop) từ một codebase.</p>
    `
  },
  'security': {
    title: '10 lỗ hổng bảo mật phổ biến nhất trong web app và cách phòng tránh',
    date: '25 Tháng 3, 2025', read: '7 phút đọc', cat: '🔒 Bảo mật',
    content: `
      <div class="highlight-box"><p>Theo OWASP, 90% các vụ tấn công web đến từ 10 lỗ hổng phổ biến có thể phòng tránh được nếu developer có kiến thức đúng.</p></div>
      <h2>Top 5 lỗ hổng nguy hiểm nhất</h2>
      <h3>1. SQL Injection</h3>
      <p>Attacker chèn SQL code vào input để truy cập hoặc xóa database. Phòng tránh: luôn dùng parameterized queries, không bao giờ nối chuỗi SQL trực tiếp.</p>
      <h3>2. Cross-Site Scripting (XSS)</h3>
      <p>Chèn JavaScript độc hại vào trang web để đánh cắp cookie, session. Phòng tránh: escape output, dùng Content Security Policy (CSP).</p>
      <h3>3. Broken Authentication</h3>
      <p>Session token yếu, không có rate limiting, lưu password plain text. Phòng tránh: bcrypt/argon2 cho password, JWT với expiry ngắn, 2FA.</p>
      <h3>4. Insecure Direct Object Reference (IDOR)</h3>
      <p>User A có thể truy cập data của User B bằng cách thay đổi ID trong URL. Phòng tránh: luôn kiểm tra authorization ở server-side.</p>
      <h3>5. CSRF (Cross-Site Request Forgery)</h3>
      <p>Trick user thực hiện action không mong muốn. Phòng tránh: CSRF token, SameSite cookie attribute.</p>
      <h2>Checklist bảo mật cơ bản</h2>
      <ul>
        <li>✅ HTTPS cho toàn bộ website</li>
        <li>✅ Cập nhật dependencies thường xuyên</li>
        <li>✅ Validate và sanitize mọi input</li>
        <li>✅ Principle of least privilege cho database</li>
        <li>✅ Log và monitor suspicious activity</li>
      </ul>
    `
  },
  'vps-vs-hosting': {
    title: 'VPS vs Shared Hosting: Doanh nghiệp nên chọn loại hosting nào?',
    date: '18 Tháng 3, 2025', read: '5 phút đọc', cat: '☁️ Cloud',
    content: `
      <div class="highlight-box"><p>Hosting phù hợp có thể giúp website của bạn load nhanh hơn 5-10 lần và tiết kiệm chi phí đáng kể về lâu dài.</p></div>
      <h2>Shared Hosting — Phù hợp cho ai?</h2>
      <p>Shared hosting là nhiều website cùng chia sẻ tài nguyên trên một server. Chi phí thấp (50-200k/tháng) nhưng hiệu năng không ổn định.</p>
      <ul>
        <li>✅ Chi phí thấp, dễ quản lý</li>
        <li>✅ Phù hợp website mới, traffic thấp</li>
        <li>❌ Bị ảnh hưởng bởi website khác trên cùng server</li>
        <li>❌ Giới hạn tài nguyên, không scale được</li>
      </ul>
      <h2>VPS — Sức mạnh thực sự</h2>
      <p>VPS (Virtual Private Server) cung cấp tài nguyên riêng biệt, toàn quyền kiểm soát server. Chi phí 300k-2tr/tháng tùy cấu hình.</p>
      <ul>
        <li>✅ Tài nguyên riêng, hiệu năng ổn định</li>
        <li>✅ Toàn quyền cài đặt phần mềm</li>
        <li>✅ Scale up/down linh hoạt</li>
        <li>❌ Cần kiến thức quản trị Linux</li>
      </ul>
      <h2>Khi nào nên nâng cấp lên VPS?</h2>
      <p>Nâng cấp khi: traffic vượt 10,000 lượt/ngày, cần cài phần mềm đặc biệt, website bị chậm dù đã tối ưu, hoặc cần chạy nhiều website/ứng dụng.</p>
      <div class="highlight-box"><p>💡 Clitus PC cung cấp dịch vụ VPS và hỗ trợ migration từ shared hosting sang VPS hoàn toàn miễn phí khi đăng ký gói dài hạn.</p></div>
    `
  },
  'sme-digital': {
    title: 'Chuyển đổi số cho SME: Bắt đầu từ đâu khi ngân sách hạn chế?',
    date: '10 Tháng 3, 2025', read: '4 phút đọc', cat: '📊 Kinh doanh',
    content: `
      <div class="highlight-box"><p>Chuyển đổi số không có nghĩa là phải đầu tư hàng tỷ đồng ngay lập tức. Bắt đầu nhỏ, đo lường kết quả, rồi mở rộng dần.</p></div>
      <h2>Bước 1: Số hóa quy trình cốt lõi trước</h2>
      <p>Xác định 1-2 quy trình tốn nhiều thời gian nhất (quản lý đơn hàng, kế toán, chăm sóc khách hàng) và số hóa chúng trước. ROI sẽ rõ ràng và nhanh chóng.</p>
      <h2>Bước 2: Website và hiện diện online</h2>
      <p>Website chuyên nghiệp là nền tảng. Chi phí 5-15 triệu cho website chuẩn SEO sẽ mang lại khách hàng liên tục trong nhiều năm.</p>
      <h2>Bước 3: Phần mềm quản lý phù hợp</h2>
      <p>Không cần ERP đắt tiền ngay từ đầu. Bắt đầu với phần mềm quản lý bán hàng đơn giản (POS), sau đó mở rộng khi cần.</p>
      <h2>Bước 4: Tự động hóa marketing</h2>
      <p>Email marketing, chatbot Facebook/Zalo, Google Ads — những công cụ này có thể bắt đầu với ngân sách 2-5 triệu/tháng và mang lại ROI rõ ràng.</p>
      <h2>Lộ trình 12 tháng thực tế</h2>
      <ul>
        <li>Tháng 1-3: Website + Google Business Profile</li>
        <li>Tháng 4-6: Phần mềm quản lý bán hàng</li>
        <li>Tháng 7-9: CRM + Email marketing</li>
        <li>Tháng 10-12: Đánh giá và mở rộng</li>
      </ul>
      <div class="highlight-box"><p>🤝 Clitus PC tư vấn lộ trình chuyển đổi số miễn phí cho SME. Liên hệ ngay để được hỗ trợ.</p></div>
    `
  }
};

function openBlog(key) {
  const post = blogPosts[key];
  if (!post) return;
  document.getElementById('blogArticle').innerHTML = `
    <h1>${post.title}</h1>
    <div class="art-meta">
      <span>📅 ${post.date}</span>
      <span>⏱ ${post.read}</span>
      <span>${post.cat}</span>
    </div>
    ${post.content}
    <div class="art-footer">
      <span style="color:var(--gray);font-size:13px;">Bài viết bởi <strong style="color:var(--blue-light)">Clitus PC</strong></span>
      <a href="tel:0906857331" class="btn btn-primary" style="font-size:13px;padding:10px 20px;">📞 Tư vấn miễn phí</a>
    </div>
  `;
  document.getElementById('blogModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBlog() {
  document.getElementById('blogModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('blogModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('blogModal')) closeBlog();
});

// Analytics tracking helper
function trackEvent(eventName, data = {}) {
  // Vercel Analytics
  if (window.va) {
    window.va('event', eventName, data);
  }
  // Microsoft Clarity custom tags
  if (window.clarity) {
    window.clarity('set', eventName, JSON.stringify(data));
  }
  console.log('📊 Event tracked:', eventName, data);
}

// Track important user actions
document.addEventListener('DOMContentLoaded', () => {
  // Track demo views
  const originalOpenDemo = window.openDemo;
  window.openDemo = function(key) {
    trackEvent('demo_viewed', { project: key });
    return originalOpenDemo(key);
  };

  // Track blog reads
  const originalOpenBlog = window.openBlog;
  window.openBlog = function(key) {
    trackEvent('blog_read', { article: key });
    return originalOpenBlog(key);
  };

  // Track contact button clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => trackEvent('phone_clicked'));
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener('click', () => trackEvent('email_clicked'));
  });

  // Track Zalo/Messenger clicks
  document.querySelectorAll('.zalo-btn').forEach(el => {
    el.addEventListener('click', () => trackEvent('zalo_clicked'));
  });
  document.querySelectorAll('.messenger-btn').forEach(el => {
    el.addEventListener('click', () => trackEvent('messenger_clicked'));
  });

  // Track newsletter signups
  const originalNewsletterSubmit = document.getElementById('newsletterForm').onsubmit;
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    trackEvent('newsletter_signup', { email: e.target.querySelector('input').value.split('@')[1] });
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      trackEvent('scroll_depth', { percent: scrollPercent });
    }
  });

  // Track time on page
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', { seconds: timeSpent });
  });
});

// ── LANGUAGE SWITCHER ──
let currentLang = 'vi';

function toggleLanguage() {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';
  document.getElementById('langLabel').textContent = currentLang === 'vi' ? 'EN' : 'VI';
  document.documentElement.lang = currentLang;
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  document.querySelectorAll('[data-vi][data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  // Update placeholders
  const specInput = document.getElementById('aiSpecInput');
  const transInput = document.getElementById('aiTransInput');
  if (specInput) specInput.placeholder = lang === 'en'
    ? 'E.g: Laptop Core i7, 16GB RAM, 512GB SSD, 15.6 inch FHD...'
    : 'VD: Laptop Core i7, RAM 16GB, SSD 512GB, màn 15.6 inch FHD...';
  if (transInput) transInput.placeholder = lang === 'en'
    ? 'Enter text to translate...'
    : 'Nhập văn bản cần dịch...';
  // Update chatbot input
  const chatInput = document.getElementById('chatbotInput');
  if (chatInput) chatInput.placeholder = lang === 'en' ? 'Type your question...' : 'Nhập câu hỏi của bạn...';
}

// ── AI CONTENT GENERATOR ──
async function generateDescription() {
  const input = document.getElementById('aiSpecInput');
  const btn = document.getElementById('aiGenBtn');
  const output = document.getElementById('aiOutput');
  const outputText = document.getElementById('aiOutputText');
  const text = input.value.trim();
  if (!text) { input.focus(); return; }

  btn.disabled = true;
  btn.innerHTML = '<span class="ai-btn-icon">⏳</span><span>' + (currentLang === 'en' ? 'Generating...' : 'Đang tạo...') + '</span>';
  output.style.display = 'block';
  outputText.textContent = '';

  // Typewriter effect
  const prompt = currentLang === 'en'
    ? `Write a professional, SEO-optimized product description in English based on these specs: ${text}. Max 3 sentences.`
    : `Viết mô tả sản phẩm chuyên nghiệp, chuẩn SEO bằng tiếng Việt dựa trên thông số: ${text}. Tối đa 3 câu.`;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] })
    });
    const data = await res.json();
    const result = data.reply || (currentLang === 'en' ? 'Could not generate. Please try again.' : 'Không thể tạo. Vui lòng thử lại.');
    typewriterEffect(outputText, result);
  } catch {
    outputText.textContent = currentLang === 'en' ? 'Connection error. Please try again.' : 'Lỗi kết nối. Vui lòng thử lại.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span class="ai-btn-icon">✦</span><span>' + (currentLang === 'en' ? 'Generate with AI' : 'Tạo mô tả AI') + '</span>';
  }
}

// ── AI TRANSLATOR ──
async function translateText(targetLang) {
  const input = document.getElementById('aiTransInput');
  const output = document.getElementById('aiTransOutput');
  const outputText = document.getElementById('aiTransText');
  const text = input.value.trim();
  if (!text) { input.focus(); return; }

  document.getElementById('transToEn').classList.toggle('active', targetLang === 'en');
  document.getElementById('transToVi').classList.toggle('active', targetLang === 'vi');

  output.style.display = 'block';
  outputText.textContent = currentLang === 'en' ? 'Translating...' : 'Đang dịch...';

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    });
    const data = await res.json();
    typewriterEffect(outputText, data.translated || text);
  } catch {
    outputText.textContent = currentLang === 'en' ? 'Translation failed.' : 'Dịch thất bại.';
  }
}

// ── TYPEWRITER EFFECT ──
function typewriterEffect(el, text, speed = 18) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// ── AI PARTICLES ──
(function initParticles() {
  const section = document.querySelector('.ai-features');
  if (!section) return;
  const container = document.createElement('div');
  container.className = 'ai-particles';
  section.appendChild(container);
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'ai-particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 6}s;
      opacity: ${0.3 + Math.random() * 0.4};
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
    `;
    container.appendChild(p);
  }
})();

// ── AI SMART PREDICTION ──
(function() {
  var sectionTime = {};
  var shownPopups = {};
  var lastSection = null;
  var mouseIdleTimer = null;
  var mouseX = 0, mouseY = 0;

  // Định nghĩa popup theo section
  var predictions = {
    'services': {
      minTime: 5000,
      icon: '🛠️',
      title: 'Bạn đang tìm dịch vụ phù hợp?',
      desc: 'Để lại thông tin — chúng tôi tư vấn miễn phí trong 30 phút!',
      cta: 'Nhận tư vấn ngay',
      link: '#contact'
    },
    'projects': {
      minTime: 6000,
      icon: '🚀',
      title: 'Ấn tượng với các dự án?',
      desc: 'Chúng tôi có thể xây dựng sản phẩm tương tự cho bạn.',
      cta: 'Bắt đầu dự án',
      link: '#contact'
    },
    'blog': {
      minTime: 8000,
      icon: '📈',
      title: 'Bạn muốn tăng top Google?',
      desc: 'Dịch vụ SEO của Clitus PC giúp website lên top trong 3 tháng.',
      cta: 'Xem dịch vụ SEO',
      link: '#services'
    },
    'ai-generator': {
      minTime: 4000,
      icon: '✦',
      title: 'Muốn có website AI ngay hôm nay?',
      desc: 'Clitus PC làm website thật chỉ .',
      cta: 'Báo giá ngay',
      link: '#contact'
    },
    'ai-avatar': {
      minTime: 5000,
      icon: '🤖',
      title: 'Muốn tích hợp AI vào website của bạn?',
      desc: 'Chatbot AI, avatar tư vấn và phân tích dữ liệu — tất cả trong một gói.',
      cta: 'Tìm hiểu thêm',
      link: '#services'
    },
    'techstack': {
      minTime: 6000,
      icon: '⚡',
      title: 'Bạn cần đội ngũ kỹ thuật mạnh?',
      desc: 'Clitus PC có đầy đủ tech stack từ Frontend đến DevOps và AI.',
      cta: 'Xem đội ngũ',
      link: '#about'
    },
    'testimonials': {
      minTime: 5000,
      icon: '⭐',
      title: 'Hàng trăm khách hàng tin tưởng!',
      desc: 'Tham gia cùng 30+ doanh nghiệp đã chuyển đổi số thành công với Clitus PC.',
      cta: 'Liên hệ ngay',
      link: '#contact'
    }
  };

  // Track thời gian xem từng section
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var id = entry.target.id;
      if (!id || !predictions[id]) return;
      if (entry.isIntersecting) {
        lastSection = id;
        if (!sectionTime[id]) sectionTime[id] = 0;
        sectionTime[id + '_start'] = Date.now();
        // Start timer
        sectionTime[id + '_timer'] = setTimeout(function() {
          if (!shownPopups[id]) {
            showPredictionPopup(id);
          }
        }, predictions[id].minTime);
      } else {
        // Accumulate time
        if (sectionTime[id + '_start']) {
          sectionTime[id] = (sectionTime[id] || 0) + (Date.now() - sectionTime[id + '_start']);
          delete sectionTime[id + '_start'];
        }
        clearTimeout(sectionTime[id + '_timer']);
      }
    });
  }, { threshold: 0.4 });

  // Observe all relevant sections
  Object.keys(predictions).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Mouse idle detection — hiện popup khi chuột dừng > 8s
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    clearTimeout(mouseIdleTimer);
    mouseIdleTimer = setTimeout(function() {
      if (lastSection && predictions[lastSection] && !shownPopups[lastSection + '_idle']) {
        shownPopups[lastSection + '_idle'] = true;
        showPredictionPopup(lastSection, mouseX, mouseY);
      }
    }, 8000);
  });

  // Exit intent — chuột ra khỏi viewport phía trên
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !shownPopups['exit']) {
      shownPopups['exit'] = true;
      showExitPopup();
    }
  });

  function showPredictionPopup(sectionId, x, y) {
    if (shownPopups[sectionId]) return;
    shownPopups[sectionId] = true;
    var p = predictions[sectionId];
    if (!p) return;

    var popup = document.createElement('div');
    popup.className = 'ai-predict-popup';
    popup.id = 'predictPopup_' + sectionId;

    // Position near mouse if provided, else bottom-right
    if (x && y) {
      var left = Math.min(x + 20, window.innerWidth - 320);
      var top = Math.min(y - 60, window.innerHeight - 180);
      popup.style.cssText = 'position:fixed;left:' + left + 'px;top:' + top + 'px;z-index:8888;';
    }

    popup.innerHTML =
      '<div class="app-predict-inner">' +
        '<div class="app-predict-ai-badge"><span class="app-predict-dot"></span>AI Prediction</div>' +
        '<button class="app-predict-close" onclick="this.closest(\'.ai-predict-popup\').remove()">✕</button>' +
        '<div class="app-predict-icon">' + p.icon + '</div>' +
        '<h4>' + p.title + '</h4>' +
        '<p>' + p.desc + '</p>' +
        '<a href="' + p.link + '" class="app-predict-cta" onclick="this.closest(\'.ai-predict-popup\').remove()">' + p.cta + ' →</a>' +
      '</div>';

    document.body.appendChild(popup);

    // Auto remove after 12s
    setTimeout(function() {
      if (popup.parentNode) {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(10px)';
        setTimeout(function() { if (popup.parentNode) popup.remove(); }, 400);
      }
    }, 12000);
  }

  function showExitPopup() {
    var popup = document.createElement('div');
    popup.className = 'ai-predict-popup ai-predict-popup--exit';
    popup.innerHTML =
      '<div class="app-predict-inner">' +
        '<div class="app-predict-ai-badge"><span class="app-predict-dot"></span>Khoan đã!</div>' +
        '<button class="app-predict-close" onclick="this.closest(\'.ai-predict-popup\').remove()">✕</button>' +
        '<div class="app-predict-icon">🎁</div>' +
        '<h4>Nhận tư vấn miễn phí trước khi rời!</h4>' +
        '<p>Để lại số điện thoại — chúng tôi gọi lại trong 15 phút.</p>' +
        '<a href="#contact" class="app-predict-cta" onclick="this.closest(\'.ai-predict-popup\').remove()">Nhận tư vấn ngay →</a>' +
      '</div>';
    document.body.appendChild(popup);
    setTimeout(function() { if (popup.parentNode) popup.remove(); }, 15000);
  }
})();

// ── AI CODER TEAM ──
(function() {
  var feLines = [
    '<span style="color:#a78bfa">import</span> React <span style="color:#a78bfa">from</span> <span style="color:#22c55e">\'react\'</span>',
    '<span style="color:#a78bfa">const</span> <span style="color:#3b82f6">Hero</span> = () => {',
    '  <span style="color:#a78bfa">return</span> (<span style="color:#f59e0b">&lt;div</span> <span style="color:#22c55e">className</span>=<span style="color:#22c55e">"hero"</span><span style="color:#f59e0b">&gt;</span>',
    '    <span style="color:#f59e0b">&lt;h1&gt;</span>Clitus PC<span style="color:#f59e0b">&lt;/h1&gt;</span>',
    '    <span style="color:#f59e0b">&lt;p&gt;</span>AI Solutions<span style="color:#f59e0b">&lt;/p&gt;</span>',
    '  <span style="color:#f59e0b">&lt;/div&gt;</span>)',
    '}',
    '<span style="color:#a78bfa">export default</span> Hero'
  ];
  var beLines = [
    '<span style="color:#a78bfa">const</span> express = <span style="color:#3b82f6">require</span>(<span style="color:#22c55e">\'express\'</span>)',
    '<span style="color:#a78bfa">const</span> app = express()',
    '<span style="color:#a78bfa">app</span>.<span style="color:#3b82f6">get</span>(<span style="color:#22c55e">\'/api/services\'</span>, (req, res) => {',
    '  res.<span style="color:#3b82f6">json</span>({ services: [...] })',
    '})',
    '<span style="color:#a78bfa">app</span>.<span style="color:#3b82f6">listen</span>(<span style="color:#f59e0b">3000</span>)',
    '<span style="color:#64748b">// Server running ✓</span>'
  ];
  var seoKeywords = ['clitus pc', 'thiết kế web', 'app mobile', 'AI chatbot', 'vps hosting', 'phần mềm erp'];
  var mktPosts = [
    '🚀 Clitus PC — Giải pháp công nghệ toàn diện cho doanh nghiệp Việt! Website · App · AI · Cloud. Liên hệ ngay để được tư vấn miễn phí! #CongNghe #AI #Website',
    '💡 Bạn đang tìm đối tác công nghệ tin cậy? Clitus PC với 5+ năm kinh nghiệm, 50+ dự án thành công. Hãy để chúng tôi giúp bạn! #ClitusPC #Tech',
    '🤖 AI không còn là tương lai — đó là hiện tại! Clitus PC tích hợp AI vào mọi sản phẩm. Chatbot · Analytics · Auto Content. #AI #Innovation'
  ];

  var started = false;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !started) {
        started = true;
        startTeamAnimation();
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  var sec = document.getElementById('ai-team');
  if (sec) obs.observe(sec);

  function startTeamAnimation() {
    // FE: type code lines
    typeCodeLines('feCode', feLines, 0);
    animProgress('feBar', 'feProgress', 87, 3000);

    // BE: type code lines with delay
    setTimeout(function() { typeCodeLines('beCode', beLines, 0); }, 800);
    animProgress('beBar', 'beProgress', 73, 3800);

    // SEO: animate metrics
    setTimeout(function() {
      animNum('seoDA', 68, 2000);
      animNum('seoKW', 142, 2500);
      animNum('seoBL', 384, 3000);
      animSeoKeywords();
    }, 500);
    animProgress('seoBar', 'seoProgress', 91, 4000);

    // Marketing: type post
    setTimeout(function() { typeMktPost(0); }, 1200);
    animProgress('mktBar', 'mktProgress', 65, 5000);
    setTimeout(function() {
      animNum('mktLikes', 284, 3000);
      animNum('mktComments', 47, 2500);
      animNum('mktShares', 93, 2800);
    }, 1500);

    // Activity feed
    startActivityFeed();
  }

  function typeCodeLines(elId, lines, idx) {
    var el = document.getElementById(elId);
    if (!el || idx >= lines.length) return;
    var div = document.createElement('div');
    div.className = 'ace-line';
    div.innerHTML = '<span class="ace-ln">' + (idx + 1) + '</span>' + lines[idx];
    el.appendChild(div);
    setTimeout(function() { typeCodeLines(elId, lines, idx + 1); }, 300 + Math.random() * 200);
  }

  function animProgress(barId, labelId, target, duration) {
    var bar = document.getElementById(barId);
    var label = document.getElementById(labelId);
    if (!bar || !label) return;
    var start = Date.now();
    var raf = function() {
      var elapsed = Date.now() - start;
      var pct = Math.min(Math.round((elapsed / duration) * target), target);
      bar.style.width = pct + '%';
      label.textContent = pct + '%';
      if (pct < target) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  function animNum(id, target, duration) {
    var el = document.getElementById(id);
    if (!el) return;
    var start = Date.now();
    var raf = function() {
      var elapsed = Date.now() - start;
      var val = Math.min(Math.round((elapsed / duration) * target), target);
      el.textContent = val.toLocaleString();
      if (val < target) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  function animSeoKeywords() {
    var el = document.getElementById('seoKeywords');
    if (!el) return;
    seoKeywords.forEach(function(kw, i) {
      setTimeout(function() {
        var span = document.createElement('span');
        span.className = 'seo-kw-tag';
        span.textContent = kw;
        el.appendChild(span);
      }, i * 400);
    });
  }

  var mktPostIdx = 0;
  function typeMktPost(idx) {
    var el = document.getElementById('mktPostText');
    if (!el) return;
    var text = mktPosts[idx % mktPosts.length];
    el.textContent = '';
    var i = 0;
    var t = setInterval(function() {
      el.textContent += text[i]; i++;
      if (i >= text.length) {
        clearInterval(t);
        setTimeout(function() { typeMktPost(idx + 1); }, 5000);
      }
    }, 20);
  }

  var feedEvents = [
    { agent: 'Alex AI', color: '#3b82f6', icon: '⚡', msg: 'Hoàn thành Hero component' },
    { agent: 'Nova AI', color: '#a78bfa', icon: '✅', msg: 'API /services deployed' },
    { agent: 'Sage AI', color: '#34d399', icon: '📈', msg: 'Tìm thấy 12 từ khóa tiềm năng' },
    { agent: 'Max AI', color: '#fbbf24', icon: '🚀', msg: 'Post đạt 284 lượt thích' },
    { agent: 'Alex AI', color: '#3b82f6', icon: '🎨', msg: 'Responsive mobile hoàn chỉnh' },
    { agent: 'Nova AI', color: '#a78bfa', icon: '🔒', msg: 'Security audit passed' },
    { agent: 'Sage AI', color: '#34d399', icon: '🔍', msg: 'Core Web Vitals: 98/100' },
    { agent: 'Max AI', color: '#fbbf24', icon: '📊', msg: 'CTR tăng 34% so với tuần trước' },
    { agent: 'Alex AI', color: '#3b82f6', icon: '💡', msg: 'Dark mode implemented' },
    { agent: 'Nova AI', color: '#a78bfa', icon: '⚙️', msg: 'Database optimized: -40% query time' }
  ];
  var feedIdx = 0;
  function startActivityFeed() {
    var el = document.getElementById('teamFeed');
    if (!el) return;
    function addFeedItem() {
      var ev = feedEvents[feedIdx % feedEvents.length];
      feedIdx++;
      var item = document.createElement('div');
      item.className = 'atf-item';
      item.innerHTML =
        '<span class="atf-icon">' + ev.icon + '</span>' +
        '<span class="atf-agent" style="color:' + ev.color + '">' + ev.agent + '</span>' +
        '<span class="atf-msg">' + ev.msg + '</span>' +
        '<span class="atf-time">vừa xong</span>';
      el.insertBefore(item, el.firstChild);
      if (el.children.length > 6) el.removeChild(el.lastChild);
      setTimeout(addFeedItem, 2500 + Math.random() * 1500);
    }
    addFeedItem();
  }
})();

// ── AI SALES AGENT ──
(function() {
  var salesStep = 0;
  var salesData = {};
  var salesStarted = false;

  // Sales conversation flow
  var flow = [
    // Step 0: Greeting
    {
      stage: 'Chào hỏi', stageNum: 1, progress: 20,
      luna: 'Xin chào! 👋 Tôi là <strong>Luna</strong>, chuyên viên tư vấn AI của <strong>Clitus PC</strong>.\n\nTôi thấy bạn đang tìm hiểu về giải pháp công nghệ. Để tư vấn chính xác nhất, cho tôi hỏi — bạn đang cần giải pháp gì?',
      replies: ['Tôi cần làm website', 'Tôi cần app di động', 'Tôi cần phần mềm quản lý', 'Tôi cần tư vấn AI']
    },
    // Step 1: Discover need
    {
      stage: 'Khám phá nhu cầu', stageNum: 2, progress: 40,
      luna: function(choice) {
        var map = {
          'Tôi cần làm website': 'Tuyệt vời! Website là nền tảng số quan trọng nhất. 🌐\n\nĐể tư vấn đúng gói, cho tôi biết — <strong>mục tiêu chính</strong> của website là gì?',
          'Tôi cần app di động': 'App di động giúp bạn tiếp cận khách hàng 24/7! 📱\n\nBạn muốn app cho <strong>nền tảng nào</strong>?',
          'Tôi cần phần mềm quản lý': 'Phần mềm quản lý giúp tăng hiệu suất lên 3-5 lần! ⚙️\n\nDoanh nghiệp bạn cần quản lý <strong>lĩnh vực nào</strong>?',
          'Tôi cần tư vấn AI': 'AI đang thay đổi cách kinh doanh hoàn toàn! 🤖\n\nBạn muốn ứng dụng AI vào <strong>mảng nào</strong> của doanh nghiệp?'
        };
        return map[choice] || 'Rất hay! Cho tôi hỏi thêm để tư vấn chính xác hơn nhé.';
      },
      repliesMap: {
        'Tôi cần làm website': ['Bán hàng online', 'Giới thiệu công ty', 'Landing page quảng cáo', 'Blog / Tin tức'],
        'Tôi cần app di động': ['iOS & Android', 'Chỉ Android', 'Chỉ iOS', 'Web App (PWA)'],
        'Tôi cần phần mềm quản lý': ['Quản lý bán hàng', 'Quản lý nhân sự', 'Quản lý kho', 'CRM khách hàng'],
        'Tôi cần tư vấn AI': ['Chatbot tư vấn', 'Phân tích dữ liệu', 'Tự động hóa quy trình', 'AI Marketing']
      }
    },
    // Step 2: Consult
    {
      stage: 'Tư vấn', stageNum: 3, progress: 60,
      luna: function(prev, choice) {
        return '✅ Hiểu rồi! Dựa trên nhu cầu của bạn, tôi đề xuất:\n\n<strong>Gói phù hợp nhất:</strong> ' + getSuggestedPackage(prev, choice) + '\n\n<strong>Thời gian:</strong> ' + getTimeline(prev) + '\n<strong>Bao gồm:</strong> ' + getIncludes(prev, choice) + '\n\nBạn có muốn tìm hiểu thêm về gói này không?';
      },
      replies: ['Có, tôi muốn biết thêm', 'Có gói nào khác không?', 'Tôi muốn xem demo', 'Nghe có vẻ phù hợp!']
    },
    // Step 3: Upsell
    {
      stage: 'Upsell', stageNum: 4, progress: 80,
      luna: function(choice) {
        var upsells = {
          'Có, tôi muốn biết thêm': '🎯 Tuyệt! Ngoài gói cơ bản, nhiều khách hàng của chúng tôi còn chọn thêm:\n\n🤖 <strong>Tích hợp AI Chatbot</strong> — tự động tư vấn khách 24/7\n📈 <strong>Gói SEO 3 tháng</strong> — lên top Google nhanh hơn\n📊 <strong>Analytics Dashboard</strong> — theo dõi hiệu quả realtime\n\nThêm các tính năng này giúp ROI tăng 3-5 lần. Bạn quan tâm tính năng nào?',
          'Có gói nào khác không?': '💡 Tất nhiên! Chúng tôi có 3 gói:\n\n⭐ <strong>Starter</strong> — Phù hợp startup, bàn giao nhanh\n🚀 <strong>Professional</strong> — Đầy đủ tính năng, tối ưu SEO\n💎 <strong>Enterprise</strong> — Tùy chỉnh hoàn toàn, hỗ trợ 24/7\n\nGói Professional được 70% khách hàng lựa chọn vì tính năng tốt nhất. Bạn muốn tư vấn gói nào?',
          'Tôi muốn xem demo': '🎬 Tuyệt vời! Chúng tôi có demo trực tiếp cho bạn xem sản phẩm thực tế.\n\nNgoài ra, khi đặt lịch demo, bạn sẽ nhận được:\n✅ Báo giá chi tiết miễn phí\n✅ Tư vấn 1-1 với chuyên gia\n✅ Roadmap triển khai cụ thể\n\nBạn muốn đặt lịch demo vào thời gian nào?',
          'Nghe có vẻ phù hợp!': '🎉 Tuyệt vời! Bạn đã chọn đúng hướng rồi!\n\nĐể đảm bảo dự án thành công nhất, tôi khuyên bạn nên thêm:\n🔒 <strong>Gói bảo trì 6 tháng</strong> — đảm bảo hệ thống luôn ổn định\n📱 <strong>Responsive mobile</strong> — 70% user dùng điện thoại\n\nChỉ cần thêm một chút, hiệu quả tăng gấp đôi. Bạn muốn tôi lên báo giá tổng thể không?'
        };
        return upsells[choice] || upsells['Nghe có vẻ phù hợp!'];
      },
      replies: ['Tôi muốn gói Professional', 'Thêm AI Chatbot', 'Đặt lịch demo ngay', 'Tôi muốn báo giá tổng thể']
    },
    // Step 4: Close
    {
      stage: 'Chốt đơn', stageNum: 5, progress: 100,
      luna: '🎊 <strong>Tuyệt vời!</strong> Bạn đã đưa ra quyết định đúng đắn!\n\nĐể bắt đầu ngay, tôi sẽ kết nối bạn với chuyên gia của Clitus PC:\n\n📞 <strong>Hotline:</strong> <a href="tel:0906857331" style="color:#3b82f6">0906 857 331</a>\n📧 <strong>Email:</strong> infoclituspc@gmail.com\n\n⚡ Phản hồi trong <strong>30 phút</strong> — Tư vấn hoàn toàn <strong>miễn phí</strong>!\n\nCảm ơn bạn đã tin tưởng Clitus PC! 🙏',
      replies: ['Gọi ngay cho tôi', 'Tôi sẽ điền form liên hệ', 'Cảm ơn Luna!']
    }
  ];

  function getSuggestedPackage(service, type) {
    var map = {
      'Bán hàng online': 'E-Commerce Pro — Giỏ hàng, thanh toán online, quản lý đơn hàng',
      'Giới thiệu công ty': 'Corporate Website — Thiết kế chuyên nghiệp, chuẩn SEO',
      'Landing page quảng cáo': 'Landing Page Conversion — Tối ưu chuyển đổi, A/B testing',
      'iOS & Android': 'Cross-Platform App — Flutter, một code chạy cả iOS & Android',
      'Quản lý bán hàng': 'POS System — Bán hàng, kho, báo cáo realtime',
      'Chatbot tư vấn': 'AI Chatbot Enterprise — Tích hợp website + Zalo + Facebook'
    };
    return map[type] || 'Custom Solution — Thiết kế riêng theo yêu cầu';
  }

  function getTimeline(service) {
    var map = {
      'Tôi cần làm website': '7-21 ngày làm việc',
      'Tôi cần app di động': '30-90 ngày',
      'Tôi cần phần mềm quản lý': '30-60 ngày',
      'Tôi cần tư vấn AI': '14-30 ngày'
    };
    return map[service] || '14-30 ngày';
  }

  function getIncludes(service, type) {
    return 'Thiết kế UI/UX · Responsive · SEO cơ bản · Bàn giao source code · Hỗ trợ 3 tháng';
  }

  // Init sales chat when section visible
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !salesStarted) {
        salesStarted = true;
        // Animate stats
        setTimeout(function() {
          animSalesNum('salesDeals', 24, 2000);
          animSalesNum2('salesRate', 68, 2000);
          animSalesNum('salesTime', 2, 1000);
        }, 500);
        // Start conversation
        setTimeout(function() { startSalesConversation(); }, 800);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  var sec = document.getElementById('ai-sales');
  if (sec) obs.observe(sec);

  function animSalesNum(id, target, dur) {
    var el = document.getElementById(id); if (!el) return;
    var s = Date.now();
    var raf = function() {
      var v = Math.min(Math.round(((Date.now()-s)/dur)*target), target);
      el.textContent = v;
      if (v < target) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
  function animSalesNum2(id, target, dur) {
    var el = document.getElementById(id); if (!el) return;
    var s = Date.now();
    var raf = function() {
      var v = Math.min(Math.round(((Date.now()-s)/dur)*target), target);
      el.textContent = v + '%';
      if (v < target) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  function startSalesConversation() {
    salesStep = 0;
    salesData = {};
    var msgs = document.getElementById('salesMessages');
    if (msgs) msgs.innerHTML = '';
    showSalesStep(0);
  }

  function showSalesStep(stepIdx) {
    var step = flow[stepIdx];
    if (!step) return;
    updateSalesProgress(step);
    var lunaText = typeof step.luna === 'function'
      ? step.luna(salesData.choice0, salesData.choice1)
      : step.luna;
    addSalesMsg('luna', lunaText, function() {
      var replies = step.replies;
      if (step.repliesMap && salesData.choice0) {
        replies = step.repliesMap[salesData.choice0] || step.replies;
      }
      if (replies) showSalesReplies(replies, stepIdx);
    });
  }

  function showSalesReplies(replies, stepIdx) {
    var container = document.getElementById('salesQuickReplies');
    if (!container) return;
    container.innerHTML = '';
    replies.forEach(function(r) {
      var btn = document.createElement('button');
      btn.className = 'asc-reply-btn';
      btn.textContent = r;
      btn.onclick = function() {
        container.innerHTML = '';
        addSalesMsg('user', r);
        if (stepIdx === 0) salesData.choice0 = r;
        if (stepIdx === 1) salesData.choice1 = r;
        salesStep = stepIdx + 1;
        if (r === 'Gọi ngay cho tôi') {
          window.location.href = 'tel:0906857331';
        } else if (r === 'Tôi sẽ điền form liên hệ') {
          document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
        } else {
          setTimeout(function() { showSalesStep(salesStep); }, 800);
        }
      };
      container.appendChild(btn);
    });
  }

  window.salesReply = function() {
    var input = document.getElementById('salesInput');
    var text = input.value.trim(); if (!text) return;
    input.value = '';
    var container = document.getElementById('salesQuickReplies');
    if (container) container.innerHTML = '';
    addSalesMsg('user', text);
    salesStep = Math.min(salesStep + 1, flow.length - 1);
    setTimeout(function() { showSalesStep(salesStep); }, 800);
  };

  function addSalesMsg(role, html, cb) {
    var container = document.getElementById('salesMessages');
    if (!container) return;
    if (role === 'luna') {
      // Show typing first
      var typing = document.createElement('div');
      typing.className = 'asc-msg luna';
      typing.id = 'salesTyping';
      typing.innerHTML = '<div class="asc-bubble"><div class="bm-typing"><span></span><span></span><span></span></div></div>';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;
      // Blink eyes while typing
      var eyeL = document.getElementById('salesEyeL');
      var eyeR = document.getElementById('salesEyeR');
      setTimeout(function() {
        var t = document.getElementById('salesTyping');
        if (t) t.remove();
        var div = document.createElement('div');
        div.className = 'asc-msg luna';
        div.innerHTML = '<div class="asc-luna-avatar">L</div><div class="asc-bubble">' + html.replace(/\n/g,'<br>') + '</div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        if (cb) setTimeout(cb, 400);
      }, 1000 + html.length * 8);
    } else {
      var div = document.createElement('div');
      div.className = 'asc-msg user';
      div.innerHTML = '<div class="asc-bubble">' + html + '</div>';
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }
  }

  function updateSalesProgress(step) {
    var fill = document.getElementById('salesProgressFill');
    var label = document.getElementById('salesProgressLabel');
    var badge = document.getElementById('salesStageBadge');
    if (fill) fill.style.width = step.progress + '%';
    if (label) label.textContent = 'Bước ' + step.stageNum + '/5';
    if (badge) badge.textContent = step.stage;
    for (var i = 1; i <= 5; i++) {
      var el = document.getElementById('stage' + i);
      if (el) {
        el.classList.toggle('active', i <= step.stageNum);
        el.classList.toggle('done', i < step.stageNum);
      }
    }
  }

  // Blink sales avatar eyes
  setInterval(function() {
    var eyes = document.querySelectorAll('.asa-eye');
    eyes.forEach(function(e) { e.style.transform = 'scaleY(0.1)'; });
    setTimeout(function() { eyes.forEach(function(e) { e.style.transform = 'scaleY(1)'; }); }, 100);
  }, 4000);
})();

// ── VOICE RECOGNITION (MIC) ──
var micActive = false;
var recognition = null;

function toggleMic() {
  var btn = document.getElementById('bubbleMicBtn');
  if (!btn) return;

  // Check support
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addBubbleMsg('bot', 'Trình duyệt của bạn chưa hỗ trợ nhận dạng giọng nói. Vui lòng dùng Chrome.');
    return;
  }

  if (micActive) {
    // Stop
    if (recognition) recognition.stop();
    micActive = false;
    btn.style.background = '';
    btn.style.color = '';
    btn.title = 'Nói chuyện';
    return;
  }

  // Start
  recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN';          // Tiếng Việt
  recognition.continuous = false;
  recognition.interimResults = true;   // Hiển thị kết quả tạm thời
  recognition.maxAlternatives = 5;     // Lấy nhiều kết quả để chọn tốt nhất

  micActive = true;
  btn.style.background = '#ef4444';
  btn.style.color = '#fff';
  btn.title = 'Đang nghe... (click để dừng)';

  var input = document.getElementById('bubbleInput');
  if (input) input.placeholder = '🎤 Đang nghe...';

  // Bảng sửa lỗi nhận dạng tiếng Việt phổ biến
  var viCorrections = {
    'cho tôi biết': 'cho tôi biết',
    'giá bao nhiêu': 'giá bao nhiêu',
    'liên hệ': 'liên hệ',
    'dịch vụ': 'dịch vụ',
    'website': 'website',
    'ứng dụng': 'ứng dụng',
    'phần mềm': 'phần mềm',
    'báo giá': 'báo giá',
    'hỗ trợ': 'hỗ trợ',
    'công ty': 'công ty',
    'clitus': 'Clitus',
    'clituspc': 'Clitus PC',
    'clitus pc': 'Clitus PC',
  };

  function correctViText(text) {
    var result = text.trim();
    // Viết hoa chữ đầu câu
    result = result.charAt(0).toUpperCase() + result.slice(1);
    // Áp dụng bảng sửa lỗi
    Object.keys(viCorrections).forEach(function(wrong) {
      var re = new RegExp(wrong, 'gi');
      result = result.replace(re, viCorrections[wrong]);
    });
    return result;
  }

  recognition.onresult = function(event) {
    var interim = '';
    var final = '';
    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        // Lấy kết quả có confidence cao nhất trong các alternatives
        var best = '';
        var bestConf = 0;
        for (var j = 0; j < event.results[i].length; j++) {
          var alt = event.results[i][j];
          if (alt.confidence > bestConf) {
            bestConf = alt.confidence;
            best = alt.transcript;
          }
        }
        final += correctViText(best);
      } else {
        interim += event.results[i][0].transcript;
      }
    }
    if (input) {
      input.value = final || interim;
      if (final) input.focus();
    }
  };

  recognition.onerror = function(e) {
    micActive = false;
    btn.style.background = '';
    btn.style.color = '';
    if (input) input.placeholder = 'Nhập câu hỏi...';
    if (e.error === 'not-allowed') {
      addBubbleMsg('bot', 'Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt.');
    } else if (e.error === 'no-speech') {
      if (input) input.placeholder = 'Không nghe thấy, thử lại...';
      setTimeout(function() { if (input) input.placeholder = 'Nhập câu hỏi...'; }, 2000);
    }
  };

  recognition.onend = function() {
    micActive = false;
    btn.style.background = '';
    btn.style.color = '';
    btn.title = 'Nói chuyện';
    if (input) input.placeholder = 'Nhập câu hỏi...';
    // Auto send nếu có text
    if (input && input.value.trim()) {
      setTimeout(function() { bubbleSend(); }, 300);
    }
  };

  recognition.start();
}
