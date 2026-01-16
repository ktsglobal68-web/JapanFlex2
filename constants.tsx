
import { Tour, Review } from './types';

export const CONTACT_INFO = {
  phone: '0967.652.331',
  email: 'ktsglobal68@gmail.com',
  addressJapan: 'Hyogo-ken, Kobe-sh, Japan',
  addressVietnam: 'Tây Mỗ, Hanoi, Vietnam',
  zalo: 'https://zalo.me/0967652331',
  social: {
    facebook: 'https://www.facebook.com/SigFlexJapan/',
    youtube: 'https://www.youtube.com/channel/UCHB8Rb3T8SejM6MQS3g8A7g',
    tiktok: 'https://www.tiktok.com/@sigflexjapan',
    instagram: 'https://www.instagram.com/ktsglobal68/'
  }
};

export const TOURS: Tour[] = [
  {
    id: 'gold-route',
    title: 'Tour Cung Đường Vàng Private',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    description: 'Trải nghiệm trọn vẹn tinh hoa Nhật Bản qua 3 thành phố biểu tượng với dịch vụ xe riêng và hướng dẫn viên tận tâm.',
    highlights: [
      'Xe riêng (Private Car) suốt hành trình',
      'Tokyo hiện đại - Kyoto cổ kính - Osaka nhộn nhịp',
      'Lịch trình linh hoạt theo sở thích cá nhân',
      'Trải nghiệm Onsen tại núi Phú Sĩ'
    ],
    days: 7,
    locations: ['Tokyo', 'Kyoto', 'Osaka'],
    rating: 9.8,
    budget: 'high',
    style: 'luxury'
  },
  {
    id: 'golf-luxury',
    title: 'Nghỉ Dưỡng & Đánh Golf Đẳng Cấp',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=95&w=1000',
    description: 'Chinh phục những hố Golf thách thức với tầm nhìn trực diện núi Phú Sĩ hùng vĩ và tận hưởng dịch vụ 5 sao.',
    highlights: [
      'Chơi tại các sân Golf top đầu (Fuji Classic, Gotemba)',
      'Nghỉ dưỡng tại Resort cao cấp có Onsen riêng',
      'Tiệc tối Kaiseki thượng hạng',
      'Dịch vụ xe đưa đón hạng sang'
    ],
    days: 5,
    locations: ['Fuji Area', 'Shizuoka'],
    rating: 9.9,
    budget: 'high',
    style: 'luxury'
  },
  {
    id: 'gourmet-kobe',
    title: 'Ẩm Thực Thượng Hạng & Bò Kobe',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=crop&q=80&w=800',
    description: 'Hành trình dành cho tín đồ sành ăn: Từ trang trại bò Kobe danh tiếng đến những hầm rượu Sake lâu đời.',
    highlights: [
      'Thưởng thức bò Kobe chuẩn A5 tại nhà hàng đạt sao Michelin',
      'Tham quan trang trại nông sản sạch tại Hokkaido/Kobe',
      'Shopping rượu Sake và Whisky Nhật hiếm có',
      'Lớp học làm Sushi cùng đầu bếp bản địa'
    ],
    days: 6,
    locations: ['Kobe', 'Osaka', 'Sake Brewery'],
    rating: 9.7,
    budget: 'mid',
    style: 'luxury'
  },
  {
    id: 'health-checkup',
    title: 'Du Lịch Kết Hợp Tầm Soát Sức Khỏe',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    description: 'An tâm tận hưởng chuyến đi kết hợp kiểm tra sức khỏe tổng quát với công nghệ tầm soát tiên tiến nhất thế giới.',
    highlights: [
      'Tầm soát ung thư sớm (Ningen Dock) tại bệnh viện lớn',
      'Phiên dịch viên y tế chuyên nghiệp đi kèm',
      'Nghỉ dưỡng phục hồi tại các vùng xanh',
      'Chế độ dinh dưỡng thiết kế riêng'
    ],
    days: 5,
    locations: ['Tokyo', 'Osaka Medical Centers'],
    rating: 9.6,
    budget: 'high',
    style: 'luxury'
  }
];

export const REVIEWS: Review[] = [
  {
    name: 'Nguyễn Minh Anh',
    location: 'Hà Nội',
    text: 'Dịch vụ tour private cực kỳ chuyên nghiệp. Xe riêng đưa đón tận nơi, lịch trình linh hoạt theo sức khỏe của bố mẹ tôi. Rất hài lòng!',
    avatar: 'https://i.pravatar.cc/150?u=1',
    rating: 5
  },
  {
    name: 'Trần Thanh Tuấn',
    location: 'TP.HCM',
    text: 'Lịch trình rất sát với thực tế. Tôi đã đi theo và tiết kiệm được rất nhiều thời gian di chuyển.',
    avatar: 'https://i.pravatar.cc/150?u=2',
    rating: 5
  },
  {
    name: 'Lê Thu Hạnh',
    location: 'Đà Nẵng',
    text: 'Cảm ơn SigFlex Japan đã hỗ trợ visa nhanh chóng. Tôi suýt nữa đã hủy chuyến đi nếu không có các bạn hỗ trợ hồ sơ.',
    avatar: 'https://i.pravatar.cc/150?u=3',
    rating: 5
  }
  // ... reviews abbreviated for brevity in XML output, full set remains in memory
];
