# Đề tài môn học: Kiến trúc và thiết kế phần mềm

Đề tài: Hệ thống quản lý lớp học tín chỉ

## 1. Thành viên

La Minh Tâm - 21023911
Võ Đình Thông - 21082081

## 2. Kiến trúc phần mềm

### Phân tích

Để giải quyết vấn đề liên quan đế biến động về lượng truy cập theo kỳ đăng ký học phần, nhà trường cần phải mở rộng, nâng cấp sức mạnh của server. Nhưng việc mở rộng chỉ cần thiết khi đến kỳ đăng ký học phần, nên không thể nâng cấp cho một hệ thống, và kỳ đăng ký học phần chỉ diễn ra vài lần trong năm. bên cạnh đó, khi server chịu tải lớn trong kỳ đăng ký học phần, thường là vào gần kỳ thi, ảnh hướng đến việc các sinh viên khác xem lịch thi, vì dùng chung một server. Cách khác là chia ra các server nhỏ đảm nhận các trách nhiệm khác nhau, và lựa chọn nâng cấp server cụ thể khi cần. Vì vậy nhà trường có thể lựa chon kiến trúc Microservice.

### Điểm mạnh của kiến trúc microservice

#### Đáp ứng nhu cầu biến động lớn của lưu lượng truy cập

Microservice là kiến trúc tối ưu khi phải đối mặt với sự biến động lớn nhưng có thể dự đoán trước được về lưu lượng truy cập, đặc biệt trong các kỳ đăng ký học phần. Với khả năng mở rộng linh hoạt, hệ thống có thể tăng số lượng server để xử lý lượng truy cập tăng cao và giảm số lượng server khi không cần thiết, tiết kiệm tài nguyên.

#### Tối ưu hóa hiệu suất và tài nguyên

Khác với kiến trúc monolithic, khi cần mở rộng hệ thống phải triển khai lại toàn bộ, kiến trúc microservice chỉ yêu cầu triển khai từng dịch vụ cụ thể cần mở rộng. Điều này giúp tránh lãng phí tài nguyên và tăng hiệu suất hệ thống.

#### Giảm thiểu thời gian gián đoạn (downtime)

Downtime là yếu tố quan trọng khi đánh giá độ tin cậy của hệ thống. Với microservice, các dịch vụ hoạt động độc lập, khi cần cập nhật chỉ cần dừng các dịch vụ liên quan thay vì toàn bộ hệ thống. Điều này giúp các dịch vụ còn lại vẫn khả dụng, đảm bảo hệ thống hoạt động liên tục.

#### Tính năng bảo mật và xử lý lỗi tốt hơn

Microservice giúp tách biệt các dịch vụ thành các thành phần nhỏ, dễ quản lý và bảo trì. Khi một dịch vụ gặp sự cố, chỉ cần kiểm tra và khắc phục dịch vụ đó mà không ảnh hưởng đến toàn bộ hệ thống. Điều này cũng giúp tối ưu hóa bảo mật cho các dịch vụ chứa dữ liệu quan trọng như thông tin sinh viên và tài chính, trong khi các dịch vụ khác có thể giảm mức độ bảo mật để tăng hiệu suất.

#### Linh hoạt trong việc phát triển và triển khai tính năng mới

Kiến trúc microservice cho phép phát triển các tính năng mới một cách dễ dàng và nhanh chóng. Các tính năng mới có thể được phát triển thành các dịch vụ độc lập và triển khai mà không ảnh hưởng đến hệ thống hiện tại.

#### Hỗ trợ sử dụng nhiều ngôn ngữ lập trình và công nghệ

Với microservice, mỗi dịch vụ có thể được phát triển bằng ngôn ngữ lập trình và công nghệ khác nhau, tạo điều kiện thuận lợi cho việc áp dụng các xu hướng công nghệ mới.

### Điểm yếu của kiến trúc

- Quản lý phức tạp: Cần quản lý, theo dõi và bảo trì từng dịch vụ độc lập, tăng khối lượng công việc quản lý.

- Yêu cầu về chi phí: Đòi hỏi cơ sở hạ tầng và tài nguyên vận hành phức tạp hơn, dẫn đến chi phí vận hành và quản lý cao hơn.

- Khó khăn trong kiểm thử và gỡ lỗi: Khó khăn trong việc xử lý lỗi là một đánh đổi của mô hình này.

## Sơ đồ hệ thống

![sơ đồ hệ thống](./images/University-Enrollment-System.drawio.png)

chức năng của các service:

- **Auth Service**: Quản lý tài khoản user, quản lý các access token và refresh token
- **Faculty Service**: Quản lý thông tin sinh viên, thông tin khoa, thông tin chuyên ngành
- **Course Service**: Quản lý các môn học và chương trình
- **Schedule Service**: Quản lý lịch học của lớp học và lịch đăng ký của sinh viên
- **Enroll Service**: Cung cấp chức năng đăng ký, gửi message thông qua RabbitMQ đến các service Schedule Service, Payment Service, Notification Service. Để lưu lại thông tin lớp học của các môn theo kỳ sử dụng Redis để giảm thời gian tính toàn cùng một công việc nhiều lần và
- **Grade Management Service**: Quản lý thông tin kết quả học tập của sinh viên
- **Payment Service**: Quản lý công nợ, và cung cấp khả năng thanh toán online bằng cách tích hợp VNPAY
- **Notification Service**: Chịu trách nhiệm gửi Mail thông báo đến sinh viên khi nhận message từ RabbitMQ

## 3. Công nghệ sử dụng

- Spring boot
- ReactJS
- MongoDB
- MySQL
- RabbitMQ
- Redis
- Docker

## 4. Hướng dẫn cài đặt

### Frontend

- 1. di chuyển vào thư mục frontend

```bash
cd UniEnrollSystemFE
```

- 2. Cài đặt dependencies

```bash
npm i
```

- 3. Chạy dự án

```bash
npm run dev
```

### Backend

ở thư mục gốc, chạy docker

```bash
docker compose up -d
```

### Đăng nhập

MSSV: 21023911
Mật khẩu: 123456789
hoặc
MSSV: 21082081
Mật khẩu: 123456789
