# Giác ngộ 🌿 — life-stable-mode

> **Không cưỡng cầu, không bỏ cuộc.**
>
> `feat: stop forcing life, keep system running`

Mục tiêu: **giữ khả năng tự quyết khi hoàn cảnh biến động** — biết điều gì cần làm, điều gì đang chờ và điều gì cần thêm bằng chứng.

Bắt đầu bằng [Mô hình vận hành](./OPERATING_MODEL.md). Đọc [Roadmap](./PRODUCT_ROADMAP.md) để phân biệt chức năng đã có và phần cần xây.

App đang chạy: [Giác ngộ V5](https://nguyentrieu210.github.io/Gi-c-ng-/). Hiện dữ liệu chỉ lưu trên trình duyệt; chưa có backend hay đồng bộ.

Repo tổ chức công việc và quyết định. Nó không chấm điểm cuộc đời.

## Operating principles

- Không ép cuộc đời chạy đúng deadline.
- Không lấy kỳ vọng gia đình làm KPI cá nhân.
- Không lấy nợ, thất nghiệp hay “mặt mũi” làm thước đo giá trị bản thân.
- Việc tới → xem xét → phù hợp thì nhận.
- Chưa có việc → sống, làm việc tạm nếu cần, chờ cơ hội phù hợp.
- Nợ là backlog cần xử lý dần, không phải cảnh báo `SYSTEM FAILURE`.
- Không tranh luận vô hạn để được người khác hiểu.
- Giữ sức khỏe, dòng tiền tối thiểu và khả năng nắm bắt cơ hội.
- Không `git reset --hard` cả cuộc đời chỉ vì một ngày xấu.

## Nguyên tắc mong muốn — không phải số liệu đã xác minh

```text
branch: main
mode: stable
panic: disabled
force_push: disabled
job_pipeline: open
family_argument: minimized
debt_backlog: requires_private_tracking
life_status: running
```

## Workflow

```text
Opportunity arrives
        ↓
      Review
        ↓
       Fit?
     ↙     ↘
   No       Yes
   ↓         ↓
Close PR   Evaluate
             ↓
          Worth it?
          ↙     ↘
        No       Yes
        ↓         ↓
     Decline     Merge
```

## Repo map

- [`JOB_PIPELINE.md`](./JOB_PIPELINE.md) — career pipeline và Definition of Done cho một offer.
- [`DEBT.md`](./DEBT.md) — debt backlog policy.
- [`FAMILY_BOUNDARY.md`](./FAMILY_BOUNDARY.md) — boundary để giảm tranh luận hao năng lượng.
- [`DECISIONS.md`](./DECISIONS.md) — decision log.
- [`MEMORY_CONTEXT.md`](./MEMORY_CONTEXT.md) — bối cảnh dài hạn đã được lọc để phù hợp với repo public: career, ERP/system thinking, Alumdoor, automation, trading research và PWA/GitHub context.
- [`CHANGELOG.md`](./CHANGELOG.md) — lịch sử thay đổi.

## Public-repo rule

Memory được sync theo nguyên tắc **giữ quyết định và context có ích, bỏ dữ liệu riêng tư không cần thiết**. Repo public không phải bản sao nguyên xi của lịch sử chat.

## Rule số 1

**Tao không bỏ mục tiêu. Tao chỉ không để mục tiêu dắt mũi tao nữa.**

## V5 — từ nguyên tắc sang hành động

Ứng dụng trong `docs/` gồm bảng việc với bước tiếp theo, phiếu review quyết định (bằng chứng, giả định, chi phí, đường lui), và nhật ký tuần. Không chấm điểm giá trị bản thân hay ép chuỗi ngày thành tích.

Dữ liệu người dùng được lưu tại trình duyệt; không gửi lên repo. Có xuất/nhập JSON để sao lưu. Không có đồng bộ giữa thiết bị; xóa dữ liệu trình duyệt có thể làm mất ghi chép. Không dùng làm kho bí mật được mã hóa.

### Web & cài app

GitHub Actions triển khai thư mục `docs/` lên GitHub Pages. Xem URL chính xác ở run thành công của workflow **Publish Stable Mode PWA**. Nếu Pages chưa bật và workflow không đủ quyền bật, vào Settings → Pages → Source: GitHub Actions rồi chạy lại workflow.

App có manifest, icon PNG 192/512, icon maskable, scope tương đối và service worker cho offline. Cài từ link HTTPS của web, không từ trang xem mã GitHub. Chrome Android: menu → Cài đặt ứng dụng; Safari iOS: Chia sẻ → Thêm vào Màn hình chính. Không có `beforeinstallprompt` không tự nó chứng minh PWA bị lỗi.

Khi thay tài nguyên trong `docs/`, tăng phiên bản cache trong `sw.js`. Bản cập nhật service worker được kích hoạt khi các cửa sổ cũ đóng, để tránh trộn phiên bản.
