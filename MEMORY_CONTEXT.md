# Memory Context 🌿

> Public, sanitized context for `life-stable-mode`.
>
> Mục tiêu của file này là giữ **bối cảnh dài hạn có ích cho quyết định**, không biến repo public thành kho dữ liệu cá nhân.

## Stable operating state

```text
branch: main
mode: stable
panic: disabled
force_push: disabled
job_pipeline: open
family_argument: minimized
debt_backlog: tracked
life_status: running
```

Nguyên tắc lõi:
- Không cưỡng cầu, không bỏ cuộc.
- Không lấy thất nghiệp, nợ hay kỳ vọng của người khác làm thước đo giá trị bản thân.
- Giữ hệ thống sống được trước; tối ưu sau.
- Việc tới → review → fit thì evaluate → đáng thì merge.
- Không `git reset --hard` cả cuộc đời chỉ vì một ngày xấu.

## Career context

- Nền tảng chuyên môn: **Lâm nghiệp / Quản lý tài nguyên rừng**.
- Có kinh nghiệm thực tế về **quản lý, bảo vệ rừng và vận hành hiện trường**.
- Định vị hiện tại không còn bó hẹp ở kỹ sư chuyên môn thuần.
- Nhóm vai trò ưu tiên:
  - Quản lý vận hành.
  - Kế hoạch sản xuất / điều độ.
  - Planning / Production Planning.
  - Farm / Production Operations Management.
  - Vai trò trưởng/phó phòng hoặc quản lý tương xứng kinh nghiệm.
- Không chủ động nhận việc bị hạ cấp vô lý xuống vai trò kỹ sư/công nhân nếu scope và năng lực thực tế không phù hợp.
- CV nên nhấn mạnh: vận hành, KPI, kế hoạch, điều phối nhân lực, hiện trường, dữ liệu sản xuất và tư duy hệ thống.

## Job-search state

- Pipeline đang **OPEN**.
- Đã mở rộng ra ngoài nông nghiệp thuần sang planning, production, operations và farm management.
- Trạng thái chuẩn: chưa có offer phù hợp thì tiếp tục sống bình thường, giữ cửa mở và review cơ hội mới.
- Không nhận bừa chỉ để xóa trạng thái “thất nghiệp”.
- Việc tạm thời có thể dùng để giữ dòng tiền, nhưng không tự động trở thành định hướng dài hạn.

## ERP / systems thinking

Khi phân tích vận hành, kế hoạch và sản xuất, ưu tiên mô hình hóa theo tư duy ERP:

```text
Demand / Sales Order
        ↓
Production Plan
        ↓
BOM / Material Requirement
        ↓
Work Order
        ↓
Job Card / Execution
        ↓
Stock / Output / KPI
        ↓
Review variance → improve
```

Tư duy tương tự được áp dụng cho cuộc sống:
- opportunity = incoming demand,
- job pipeline = open orders,
- debt = backlog,
- energy/cash = constrained resources,
- decision = review/merge/close PR.

## Alumdoor project context

### Direction
- Bắt đầu từ Frappe/ERPNext, sau đó pivot sang **Odoo 19** để ưu tiên UI và vận hành đơn giản hơn.
- Workspace/hệ thống hướng tới một trải nghiệm nội bộ tối giản mang thương hiệu **Alumdoor**.

### Core business rules đã từng chốt
- Phân loại mã lá rời và mã trọn bộ; không áp công thức cửa cho mã lá rời.
- Một số nhóm cửa dùng engine theo **Cao phủ bì × Số bộ**, không dùng Rộng phủ bì.
- Có logic phụ thu, chiết khấu theo nhóm/loại khách.
- Màu sắc và bề mặt được xem như thuộc tính quan trọng của mặt hàng/biến thể.
- Sales/Purchase form ưu tiên phẳng, ít tab, ít trường dư thừa và hiển thị theo ngữ cảnh.
- Dữ liệu nền gồm nhóm hàng, UOM, màu, bề mặt, khách hàng, nhà cung cấp.

## Agent / automation context

- Đã thử orchestration nhiều agent theo các thế hệ v4.x → v5 → v6.
- v6 từng đạt e2e PASS và giảm mạnh độ trễ so với v5.
- Sau đó quyết định **gỡ v6 khỏi MCP và quay lại thao tác thủ công** khi orchestration trở nên thừa so với nhu cầu thực tế.
- Nguyên tắc giữ lại: automation phải giảm tải thật; không tự động hóa chỉ để hệ thống trông “xịn”.

## Trading research context

- Đã nghiên cứu sâu chiến lược coin biến động mạnh/pump-dump trên nhiều rule và nhiều coin.
- Một vòng backtest H1 trước đây cho kết quả **0/216 rule đạt chuẩn**.
- Kết luận vận hành: không coi trading đòn bẩy cao là phương án cứu dòng tiền hay giải quyết áp lực tài chính.
- Ưu tiên stable mode: bảo toàn khả năng sống và ra quyết định tỉnh táo hơn là ép hệ thống kiếm lời bằng rủi ro cực đoan.

## PWA / GitHub context

- Repo sống: `nguyentrieu210/Gi-c-ng-`.
- Branch chuẩn: `main`.
- Web chính hiện tại: https://nguyentrieu210.github.io/Gi-c-ng-/
- Địa chỉ Hatchable thuộc lịch sử triển khai; không dùng làm link vận hành hiện tại.
- Triết lý repo: ít file, trạng thái rõ, commit có ý nghĩa, không force-push cuộc đời.

## Privacy boundary

Repo này là **public**. Vì vậy không lưu công khai:
- credential, token, OTP, secret;
- địa chỉ chính xác hoặc dữ liệu định danh không cần thiết;
- thông tin sức khỏe riêng tư;
- dữ liệu tài chính chi tiết có thể gây rủi ro;
- nội dung riêng tư của người thân hoặc bên thứ ba.

Memory nên giữ **quyết định, pattern và context có ích**, không giữ mọi chi tiết chỉ vì chúng từng xuất hiện trong chat.

## Cách dùng bối cảnh này

Bối cảnh lịch sử không phải bằng chứng về trạng thái hiện tại. Không tự suy ra tình trạng tuyển dụng, mức độ khẩn của nghĩa vụ hoặc khả năng dùng nguồn lực từ file này.

Các bài học được chuyển thành [mô hình vận hành](./OPERATING_MODEL.md); các thay đổi sản phẩm nằm trong [roadmap](./PRODUCT_ROADMAP.md). Đây là cách đọc bối cảnh để ra quyết định, không phải yêu cầu thu thập thêm mọi thông tin đời tư.
