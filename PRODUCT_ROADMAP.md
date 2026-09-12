# Roadmap — từ ghi chép đến hỗ trợ quyết định

## Hiện trạng đã kiểm tra

V5.2: PWA tĩnh, bảng việc theo workflow có điểm xem lại và màn “Bây giờ”, hồ sơ ứng tuyển, phiếu review và nhật ký; localStorage; xuất nhập JSON; GitHub Pages. Chưa có backend, tài khoản hay đồng bộ. Nhãn PR và commit trong app là ẩn dụ, không phải GitHub PR/commit thật.

Các mục dưới đây là kế hoạch, chưa phải chức năng đã hoàn tất. Không đưa dữ liệu riêng tư vào Issues public để triển khai chúng.

## PR 1 — Không mất dữ liệu khi gặp lỗi

Vấn đề: khi đọc dữ liệu lỗi, state trở về rỗng; chức năng xuất JSON hiện xuất state chứ không cứu nguyên dữ liệu bị lỗi.

Hoàn thành khi:
- Có thể tải nguyên bản dữ liệu lỗi xuống mà không ghi đè nó.
- Lưu thất bại không xóa nội dung người dùng đang nhập.
- Sửa nội dung được; xóa chuyển vào nơi có thể khôi phục.
- Nhập sao lưu kiểm tra schema, ID trùng và tạo bản phục hồi trước khi thay thế.
- Kiểm chứng đọc lỗi, hết dung lượng, nhập sai và khôi phục.

## PR 2 — Làm rõ bước tiếp theo ✅ Hoàn thành trong V5.2

Vấn đề: task chung chưa thể hiện việc mình làm được và việc phụ thuộc bên ngoài.

Hoàn thành khi:
- `Sẵn sàng / Đang làm / Đang chờ / Bị chặn / Đã xong / Đã lưu trữ` có nghĩa theo OPERATING_MODEL.
- `Đang chờ` lưu người/điều đang chờ và điểm xem lại; `Bị chặn` lưu điều kiện còn thiếu; dữ liệu cũ được migrate không bịa thêm deadline.
- Màn `Bây giờ` hiển thị việc có thể hành động, việc tới điểm xem lại và việc thiếu dữ kiện.
- Có sửa việc, lưu trữ/khôi phục, lọc theo trạng thái và không tự kết luận thất bại vì thời gian chờ.
- Dữ liệu V5 được chuyển đổi giữ nguyên nội dung; state hiện tại lên schema v3.

## PR 3 — Lưu riêng tư và đồng bộ

Vấn đề: dữ liệu hiện bị giới hạn trên từng trình duyệt và có thể mất khi xóa dữ liệu trình duyệt.

Thiết kế tối thiểu:
- Tài khoản → việc, cơ hội, quyết định, nhật ký thuộc đúng chủ sở hữu.
- Phân quyền ở phía server; không tin user_id do trình duyệt tự gửi.
- Có created_at, updated_at và version để phát hiện cập nhật xung đột.
- Hiển thị Đã lưu trên máy / Chờ đồng bộ / Đã đồng bộ / Có xung đột.
- Không ghi đè âm thầm khi hai thiết bị sửa cùng mục.
- Cho xem trước và xác nhận trước khi đưa dữ liệu local lên tài khoản.
- Sao lưu, xuất dữ liệu và khôi phục được kiểm chứng.
- Kiểm tra tài khoản A không đọc/sửa được dữ liệu B; kiểm tra hết phiên và offline.

Chưa chọn nhà cung cấp. Chọn theo khả năng phân quyền, khôi phục, chi phí và mức vận hành thực tế. Không viết “backend đầy đủ” chỉ vì tạo được bảng database.

## PR 4 — Cơ hội nghề nghiệp thành hồ sơ có căn cứ

> V5.1 đã triển khai bản đầu: tạo/sửa/lưu trữ hồ sơ, trạng thái có nguồn và ngày, điểm xem lại, nhập/xuất riêng, tìm kiếm và liên kết phiếu review. Backend đồng bộ vẫn thuộc PR 3.

Vấn đề: nhóm “Công việc” không thay được hồ sơ ứng tuyển.

Hoàn thành khi:
- Lưu công ty, vị trí, trách nhiệm, quyền hạn, địa điểm, nguồn JD, thông tin thu nhập và phần chưa xác nhận.
- Pipeline: Đã nộp → Có phản hồi → Phỏng vấn → Offer → Review → Nhận / Không nhận; có trạng thái Chưa rõ.
- Mỗi hồ sơ có lần liên hệ cuối và bước tiếp theo.
- Liên kết offer với phiếu review, không tự chấm phù hợp theo chức danh.
- Phân biệt công việc dài hạn và việc tạm bằng mục đích, không xếp hạng phẩm giá.
- Không đưa memory cũ vào làm trạng thái tuyển dụng hiện tại nếu chưa được xác nhận.

## PR 5 — Học từ quyết định

Vấn đề: phiếu review và nhật ký hiện độc lập, khó xem dự đoán trước đây có đúng không.

Hoàn thành khi:
- Liên kết quyết định với việc/cơ hội và ghi chép kết quả.
- Giữ lý do tại thời điểm quyết định; cập nhật sau không xóa lịch sử lý do cũ.
- Nhắc xem lại theo điều kiện người dùng chọn, không tạo cảm giác thất bại vì quá hạn.
- Đặt câu hỏi “đã biết thêm gì?” thay vì “đã thành công chưa?”.

## Quy tắc triển khai

Mỗi PR giải quyết một vấn đề có thể kiểm chứng. Chạy kiểm tra liên quan trước merge; thử luồng dữ liệu cũ trước deploy. Backend và thay đổi schema phải có cách khôi phục. Không mở rộng thành ERP toàn diện, chatbot hay hệ nhiều agent trước khi các luồng trên dùng tốt.
