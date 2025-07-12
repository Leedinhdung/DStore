# GIT - QUY TẮC ĐẶT TÊN

# ✅ TÊN NHÁNH (branch name)
# Cấu trúc: <loại>/<phạm-vi>-<mô-tả>

# Các loại phổ biến:
# feature  - Thêm tính năng mới
# bugfix   - Sửa lỗi không nghiêm trọng
# hotfix   - Sửa lỗi khẩn cấp (trên production)
# refactor - Cải tiến code, không thay đổi logic
# style    - Chỉnh giao diện, layout, CSS
# task     - Công việc khác như build, cấu hình

# Ví dụ:
feature/home-responsive-redesign          # chỉnh UI responsive trang chủ
bugfix/banner-overlap-mobile              # fix banner bị tràn trên mobile
hotfix/login-crash                        # fix lỗi login khẩn cấp
refactor/utils-date-format                # làm gọn hàm xử lý ngày tháng


# ✅ CÚ PHÁP COMMIT (commit message)
# Cấu trúc: <loại>(<phạm-vi>): <nội dung>

# Các loại phổ biến:
# feat     - Thêm mới tính năng
# fix      - Sửa lỗi
# docs     - Tài liệu, hướng dẫn
# style    - Chỉ chỉnh style, không ảnh hưởng logic
# refactor - Cải tiến code
# test     - Thêm / sửa test
# chore    - Việc phụ trợ (cấu hình, thư viện...)

# Ví dụ:
feat(home): thêm đồng hồ đếm ngược cho banner
fix(header): sửa lỗi link navigation bị sai
style(card): giảm padding phần card
refactor(utils): đơn giản hóa logic ngày tháng


# ✅ QUY ƯỚC KHÁC
# - Viết thường, dùng dấu "-" để ngăn cách
# - Không đặt tên chung chung như "fix-bug" hoặc "new-feature"
# - Nếu có mã task, thêm vào: feature/HOME-123-banner


# ✅ QUY TRÌNH GỢI Ý
# 1. git checkout -b feature/home-ui
# 2. Commit đúng cú pháp: git commit -m "feat(home): add banner"
# 3. git push origin feature/home-ui
# 4. Tạo pull request (nếu làm việc nhóm)