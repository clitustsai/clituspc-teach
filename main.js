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
