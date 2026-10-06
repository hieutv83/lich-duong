# Lịch Dương

Một trang web nhỏ hiển thị lịch dương (lịch Gregorian) theo tháng, viết bằng HTML, CSS và JavaScript thuần. Không cần cài đặt hay build gì cả.

## Tính năng

- Hiển thị lịch theo tháng, tuần bắt đầu từ Thứ Hai
- Nút ‹ và › để chuyển tháng trước / tháng sau
- Ngày hôm nay được tô xanh, Chủ Nhật tô đỏ
- Nút "Hôm nay" để quay về tháng hiện tại

## Cách chạy

Mở file `index.html` bằng trình duyệt (nháy đúp vào file là được).

## Cấu trúc thư mục

```
lich-duong/
├── index.html   # Khung trang: tiêu đề, nút bấm, chỗ chứa các ngày
├── style.css    # Giao diện: lưới 7 cột, màu sắc
├── script.js    # Logic: tính ngày và vẽ lịch
└── README.md
```

## Giải thích code

### index.html

Chỉ là khung tĩnh. Phần quan trọng là `<div id="days">` đang trống: JavaScript sẽ tạo các ô ngày rồi đặt vào đây. Dòng `<script src="script.js">` nằm cuối `<body>` để HTML được tải xong trước khi JavaScript chạy.

### style.css

Dùng CSS Grid với `grid-template-columns: repeat(7, 1fr)`, tức là 7 cột bằng nhau, mỗi cột là một ngày trong tuần. Khi JavaScript thêm ô thứ 8, nó tự xuống hàng. Các class `.today`, `.sunday`, `.other-month` quyết định màu của từng ô.

### script.js

1. **Biến trạng thái**: `currentMonth` và `currentYear` lưu tháng đang xem. Lưu ý trong JavaScript, tháng đếm từ 0 (0 = tháng 1, 11 = tháng 12).

2. **Ngày 1 rơi vào thứ mấy**: `new Date(year, month, 1).getDay()` trả về 0 cho Chủ Nhật, 1 cho Thứ Hai... Vì lịch bắt đầu từ Thứ Hai nên ta đổi bằng công thức `(getDay() + 6) % 7`, để Thứ Hai = 0 và Chủ Nhật = 6. Con số này cũng chính là số ô trống cần lấp ở đầu lịch.

3. **Tháng có bao nhiêu ngày**: `new Date(year, month + 1, 0).getDate()`. Ngày "0" của tháng sau được JavaScript hiểu là ngày cuối cùng của tháng này, nên tự xử lý đúng cả tháng 2 năm nhuận.

4. **Vẽ lịch** (`renderCalendar`) gồm 3 vòng lặp:
   - Lấp các ngày cuối tháng trước (làm mờ)
   - Các ngày của tháng này (đánh dấu hôm nay và Chủ Nhật)
   - Lấp các ngày đầu tháng sau cho đủ hàng cuối

5. **Nút bấm**: mỗi nút cộng/trừ `currentMonth`. Nếu vượt quá 11 thì về 0 và tăng năm, nhỏ hơn 0 thì về 11 và giảm năm. Sau đó gọi lại `renderCalendar`.

## Đưa lên GitHub Pages (tùy chọn)

Sau khi đẩy code lên GitHub: vào **Settings → Pages**, chọn nhánh `main` và thư mục `/ (root)`, bấm **Save**. Một lúc sau trang lịch sẽ chạy tại `https://<tên-tài-khoản>.github.io/<tên-repo>/`.
