# Giác ngộ 🌿 — life-stable-mode

> **Không cưỡng cầu, không bỏ cuộc.**
>
> `feat: stop forcing life, keep system running`

Repo này không phải “triết lý thành công”. Nó là **chế độ vận hành ổn định** khi cuộc đời đang nhiều biến động.

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

## Current state

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
