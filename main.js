// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

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
          <tr><td>#DH00142</td><td>Nguyễn Văn A</td><td>iPhone 15 Pro</td><td>₫ 28,990,000</td><td><span class="demo-badge green">Đã giao</span></td></tr>
          <tr><td>#DH00141</td><td>Trần Thị B</td><td>MacBook Air M2</td><td>₫ 32,500,000</td><td><span class="demo-badge blue">Đang giao</span></td></tr>
          <tr><td>#DH00140</td><td>Lê Văn C</td><td>AirPods Pro</td><td>₫ 6,490,000</td><td><span class="demo-badge yellow">Chờ xác nhận</span></td></tr>
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
          <tr><td>#F0892</td><td>Bún bò Huế x2</td><td>Minh Tuấn</td><td>1.2 km</td><td><span class="demo-badge blue">Đang giao</span></td></tr>
          <tr><td>#F0891</td><td>Cơm tấm sườn x1</td><td>Hoàng Nam</td><td>0.8 km</td><td><span class="demo-badge green">Đã giao</span></td></tr>
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
          <tr><td>Nguyễn Thị Lan</td><td>BS. Minh Khoa</td><td>Nội tổng quát</td><td>08:30</td><td><span class="demo-badge green">Đã khám</span></td></tr>
          <tr><td>Trần Văn Bình</td><td>BS. Thu Hà</td><td>Tim mạch</td><td>09:00</td><td><span class="demo-badge blue">Đang khám</span></td></tr>
          <tr><td>Lê Minh Châu</td><td>BS. Quốc Hùng</td><td>Nhi khoa</td><td>09:30</td><td><span class="demo-badge yellow">Chờ khám</span></td></tr>
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
          <tr><td>Deluxe 201</td><td>Nguyễn Hoàng</td><td>06/05/2025</td><td>08/05/2025</td><td><span class="demo-badge blue">Đang ở</span></td></tr>
          <tr><td>Suite 301</td><td>Trần Gia Bảo</td><td>07/05/2025</td><td>10/05/2025</td><td><span class="demo-badge yellow">Sắp đến</span></td></tr>
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
