
---

**Để bỏ hết thay đổi** (quay về trạng thái y như `origin/main`), làm như sau:

### 1. Bỏ thay đổi các file đã **modified**:
```bash
git restore .
```
(`.` nghĩa là restore tất cả file về lại trạng thái git đang lưu)

---

### 2. Xóa các file/folder **Untracked** (file mới tạo, chưa add vào git):
```bash
git clean -fd
```
- `-f` (force): bắt buộc xóa
- `-d` (directory): xóa cả folder mới

---

# 🚀 So sánh:
| Lệnh | Dùng khi nào | Mục tiêu |
|:----|:-------------|:---------|
| `git restore` | Mới chỉnh sửa file, chưa git add | Hủy thay đổi ở working directory |
| `git reset` | Đã git add hoặc commit rồi | Gỡ staging hoặc quay về commit trước |

---
