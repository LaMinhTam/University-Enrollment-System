db = db.getSiblingDB("admin");

db.createUser({
  user: "root",
  pwd: "123456",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});

db = db.getSiblingDB("course_db");

db.createCollection("course_collection");

db.course_collection.insertMany([
  {
    _id: "4203000664",
    credit: 2,
    name: "Tư tưởng Hồ Chí Minh",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 1,
      },
    ],
  },
  {
    _id: "4203000868",
    credit: 3,
    name: "Kỹ thuật điện tử",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 0,
      },
    ],
  },
  {
    _id: "4203000901",
    credit: 3,
    name: "Cấu trúc rời rạc",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 1,
      },
    ],
  },
  {
    _id: "4203000908",
    credit: 3,
    name: "Lý thuyết đồ thị",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 1,
      },
    ],
    prerequisites: ["4203000901"],
  },
  {
    _id: "4203000941",
    credit: 3,
    name: "Kỹ thuật lập trình",
    theory_credit: 1,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 1,
      },
    ],
    prerequisites: ["4203003848"],
  },
  {
    _id: "4203000942",
    credit: 4,
    name: "Cấu trúc dữ liệu và giải thuật",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 1,
      },
    ],
    prerequisites: ["4203003848"],
  },
  {
    _id: "4203001004",
    credit: 3,
    name: "Nhập môn an toàn thông tin",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 1,
      },
    ],
    prerequisites: ["4203002137"],
  },
  {
    _id: "4203001058",
    credit: 3,
    name: "Mạng máy tính",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 1,
      },
    ],
  },
  {
    _id: "4203001076",
    credit: 3,
    name: "Tương tác người máy",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 0,
      },
    ],
    prerequisites: ["4203002137"],
  },
  {
    _id: "4203001111",
    credit: 3,
    name: "Công nghệ phần mềm",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 1,
      },
    ],
    prerequisites: ["4203003591", "4203001146"],
  },
  {
    _id: "4203001146",
    credit: 4,
    name: "Hệ cơ sở dữ liệu",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 1,
      },
    ],
    prerequisites: ["4203002009"],
  },
  {
    _id: "4203001207",
    credit: 3,
    name: "Hệ quản trị cơ sở dữ liệu",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 0,
      },
    ],
    prerequisites: ["4203001146"],
  },
  {
    _id: "4203001366",
    credit: 3,
    name: "Automat & ngôn ngữ hình thức",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 0,
      },
    ],
    prerequisites: ["4203000901"],
  },
  {
    _id: "4203001432",
    credit: 4,
    name: "Lập trình thiết bị di động",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 7,
        type: 1,
      },
    ],
  },
  {
    _id: "4203001549",
    credit: 4,
    name: "Kiến trúc và Thiết kế phần mềm",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 1,
      },
    ],
    prerequisites: ["4203003753"],
  },
  {
    _id: "4203002009",
    credit: 2,
    name: "Nhập môn Tin học",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203002031",
    credit: 3,
    name: "Lập trình phân tích dữ liệu 1",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 0,
      },
    ],
    prerequisites: ["4203000941"],
  },
  {
    _id: "4203002044",
    credit: 4,
    name: "Lập trình hướng sự kiện với công nghệ .NET",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 0,
      },
    ],
    prerequisites: ["4203003591"],
  },
  {
    _id: "4203002070",
    credit: 4,
    name: "Lập trình hướng sự kiện với công nghệ Java",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 0,
      },
    ],
  },
  {
    _id: "4203002137",
    credit: 4,
    name: "Hệ Thống Máy tính",
    theory_credit: 1,
    practical_credit: 3,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 1,
      },
    ],
  },
  {
    _id: "4203002145",
    credit: 3,
    name: "Hệ Thống và Công nghệ Web",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 4,
        type: 1,
      },
    ],
  },
  {
    _id: "4203002146",
    credit: 3,
    name: "Lập trình phân tán với công nghệ Java",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 0,
      },
    ],
    prerequisites: ["4203002070", "4203014166"],
  },
  {
    _id: "4203002329",
    credit: 3,
    name: "Nhập môn dữ liệu lớn",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 0,
      },
    ],
    prerequisites: ["4203001146", "4203003451"],
  },
  {
    _id: "4203002330",
    credit: 3,
    name: "Lập trình phân tích dữ liệu 2",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 0,
      },
    ],
    prerequisites: ["4203001146"],
  },
  {
    _id: "4203002349",
    credit: 3,
    name: "Lập trình phân tán với công nghệ .NET",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 0,
      },
    ],
    prerequisites: ["4203002044", "4203014166"],
  },
  {
    _id: "4203002422",
    credit: 2,
    name: "Pháp luật đại cương",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 7,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003098",
    credit: 5,
    name: "Thực tập doanh nghiệp",
    theory_credit: 0,
    practical_credit: 5,
    coure_on_major: [
      {
        majorId: 1,
        semester: 9,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003147",
    credit: 3,
    name: "Công nghệ mới trong phát triển ứng dụng CNTT",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 8,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003192",
    credit: 2,
    name: "Kỹ năng làm việc nhóm",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003193",
    credit: 3,
    name: "Toán ứng dụng",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003194",
    credit: 3,
    name: "Hội họa",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003195",
    credit: 3,
    name: "Xã hội học",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003196",
    credit: 3,
    name: "Giao tiếp kinh doanh",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003197",
    credit: 3,
    name: "Kỹ năng xây dựng kế hoạch",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003198",
    credit: 2,
    name: "Phương pháp luận nghiên cứu khoa học",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003203",
    credit: 3,
    name: "Âm nhạc – Nhạc lý và Guitar căn bản",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003205",
    credit: 3,
    name: "Quản trị doanh nghiệp",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003206",
    credit: 3,
    name: "Môi trường và con người",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003217",
    credit: 3,
    name: "Quản trị học",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003240",
    credit: 3,
    name: "Hàm phức và phép biến đổi Laplace",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003242",
    credit: 4,
    name: "Giáo dục Quốc phòng và An ninh 1 ",
    theory_credit: 4,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003245",
    credit: 3,
    name: "Tiếng Việt thực hành",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003259",
    credit: 2,
    name: "Toán cao cấp 1",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003285",
    credit: 3,
    name: "Kế toán cơ bản",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003288",
    credit: 2,
    name: "Toán cao cấp 2",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 3,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003306",
    credit: 2,
    name: "Giáo dục thể chất 2 ",
    theory_credit: 0,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003307",
    credit: 2,
    name: "Giáo dục thể chất 1 ",
    theory_credit: 0,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003320",
    credit: 3,
    name: "Phương pháp tính",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003325",
    credit: 3,
    name: "Tâm lý học đại cương",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 5,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003345",
    credit: 3,
    name: "Vật lý đại cương",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 0,
      },
    ],
  },
  {
    _id: "4203003347",
    credit: 3,
    name: "Những vấn đề xã hội và đạo đức nghề nghiệp",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 6,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003354",
    credit: 4,
    name: "Giáo dục quốc phòng và an ninh 2",
    theory_credit: 2,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003395",
    credit: 3,
    name: "Logic học",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 2,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003436",
    credit: 3,
    name: "Thương mại điện tử",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003442",
    credit: 4,
    name: "Lập trình GUI với Qt Framework",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203003591"],
  },
  {
    _id: "4203003443",
    credit: 3,
    name: "Khai thác dữ liệu và ứng dụng",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203001146"],
  },
  {
    _id: "4203003451",
    credit: 3,
    name: "Thống kê máy tính và ứng dụng",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003453",
    credit: 3,
    name: "Tiếp thị điện tử",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003501",
    credit: 3,
    name: "Phát triển ứng dụng",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003591",
    credit: 3,
    name: "Lập trình hướng đối tượng",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203003848"],
  },
  {
    _id: "4203003592",
    credit: 3,
    name: "Đảm bảo chất lượng và Kiểm thử phần mềm",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203001111"],
  },
  {
    _id: "4203003621",
    credit: 4,
    name: "Lập trình WWW (Java)",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203002145", "4203002146"],
  },
  {
    _id: "4203003753",
    credit: 3,
    name: "Phân tích thiết kế hệ thống",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203001146"],
  },
  {
    _id: "4203003758",
    credit: 3,
    name: "Kiến trúc hướng dịch vụ và Điện toán đám mây",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203003773",
    credit: 3,
    name: "Lập trình mạng với Qt Framework",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203003442"],
  },
  {
    _id: "4203003774",
    credit: 4,
    name: "Phát triển ứng dụng Web với Qt Engine",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203003773"],
  },
  {
    _id: "4203003775",
    credit: 3,
    name: "Lập trình thiết bị di động nâng cao",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203001432"],
  },
  {
    _id: "4203003848",
    credit: 2,
    name: "Nhập môn Lập trình",
    theory_credit: 0,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203004056",
    credit: 3,
    name: "Quản lý dự án CNTT",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203004147",
    credit: 4,
    name: "Lập trình WWW (.NET)",
    theory_credit: 3,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203002145", "4203002349"],
  },
  {
    _id: "4203004323",
    credit: 4,
    name: "Lập trình IoTs",
    theory_credit: 2,
    practical_credit: 2,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203010665",
    credit: 3,
    name: "Cơ sở văn hóa Việt Nam",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203014164",
    credit: 3,
    name: "Triết học Mác - Lênin",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203014165",
    credit: 2,
    name: "Kinh tế chính trị Mác - Lênin",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203014164"],
  },
  {
    _id: "4203014166",
    credit: 3,
    name: "Hệ quản trị cơ sở dữ liệu NoSQL MongoDB",
    theory_credit: 2,
    practical_credit: 1,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203001146"],
  },
  {
    _id: "4203014167",
    credit: 2,
    name: "Chủ nghĩa xã hội khoa học",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203014164", "4203014165"],
  },
  {
    _id: "4203014168",
    credit: 3,
    name: "Mô hình hóa dữ liệu NoSQL MongoDB",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203014166"],
  },
  {
    _id: "4203014169",
    credit: 2,
    name: "Lịch sử Đảng Cộng sản Việt Nam",
    theory_credit: 2,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203014170",
    credit: 8,
    name: "Khóa luận tốt nghiệp",
    theory_credit: 8,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203014193",
    credit: 3,
    name: "Kỹ năng sử dụng bàn phím và thiết bị văn phòng",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203015253",
    credit: 3,
    name: "Tiếng Anh 1",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
  },
  {
    _id: "4203015254",
    credit: 3,
    name: "Tiếng Anh 2",
    theory_credit: 3,
    practical_credit: 0,
    coure_on_major: [
      {
        majorId: 1,
        semester: 1,
        type: 1,
      },
    ],
    prerequisites: ["4203015253"],
  },
]);
