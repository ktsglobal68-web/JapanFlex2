
import { Tour, Review } from './types';

export const CONTACT_INFO = {
  phone: '0967.652.331',
  email: 'ktsglobal68@gmail.com',
  address: 'Tòa Sa1, KĐT Vinsmart City, Tây Mỗ, Nam Từ Liêm, Hà Nội',
  zalo: 'https://zalo.me/0967652331'
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
    description: 'An tâm tận hưởng chuyến đi kết hợp kiểm tra sức khỏe tổng quát with công nghệ tầm soát tiên tiến nhất thế giới.',
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
    text: 'AI Planner gợi ý lịch trình rất sát with thực tế. Tôi đã đi theo và tiết kiệm được rất nhiều thời gian di chuyển.',
    avatar: 'https://i.pravatar.cc/150?u=2',
    rating: 5
  },
  {
    name: 'Lê Thu Hạnh',
    location: 'Đà Nẵng',
    text: 'Cảm ơn SigFlex Japan đã hỗ trợ visa nhanh chóng. Tôi suýt nữa đã hủy chuyến đi nếu không có các bạn hỗ trợ hồ sơ.',
    avatar: 'https://i.pravatar.cc/150?u=3',
    rating: 5
  },
  {
    name: 'Phạm Hoàng Nam',
    location: 'Hải Phòng',
    text: 'Chuyến golf tại Phú Sĩ là trải nghiệm đỉnh nhất đời tôi. Sân golf đẹp, resort sang trọng, phục vụ chuẩn Nhật.',
    avatar: 'https://i.pravatar.cc/150?u=4',
    rating: 5
  },
  {
    name: 'Đặng Thùy Chi',
    location: 'Cần Thơ',
    text: 'Bò Kobe ở nhà hàng các bạn giới thiệu thực sự tan trong miệng. Một chuyến đi ẩm thực không thể quên!',
    avatar: 'https://i.pravatar.cc/150?u=5',
    rating: 5
  },
  {
    name: 'Vũ Quốc Bảo',
    location: 'Hà Nội',
    text: 'Tôi đánh giá cao sự minh bạch về chi phí. Không có bất kỳ khoản phụ phí ẩn nào phát sinh trong suốt chuyến đi.',
    avatar: 'https://i.pravatar.cc/150?u=6',
    rating: 4
  },
  {
    name: 'Hoàng Lan Hương',
    location: 'TP.HCM',
    text: 'Hướng dẫn viên am hiểu kiến thức sâu sắc về văn hóa Nhật. Tôi đã học được rất nhiều điều thú vị từ anh ấy.',
    avatar: 'https://i.pravatar.cc/150?u=7',
    rating: 5
  },
  {
    name: 'Bùi Thế Vinh',
    location: 'Bình Dương',
    text: 'Gia đình tôi có bé nhỏ nhưng chuyến đi vẫn rất nhẹ nhàng nhờ sự sắp xếp chu đáo của SigFlex Japan.',
    avatar: 'https://i.pravatar.cc/150?u=8',
    rating: 5
  },
  {
    name: 'Ngô Mỹ Linh',
    location: 'Vũng Tàu',
    text: 'Phần mềm AI của các bạn thực sự thông minh. Nó tự động né các khung giờ cao điểm tại các điểm tham quan.',
    avatar: 'https://i.pravatar.cc/150?u=9',
    rating: 5
  },
  {
    name: 'Đỗ Anh Đức',
    location: 'Đồng Nai',
    text: 'Dịch vụ tầm soát sức khỏe rất hiện đại. Vừa đi chơi vừa kiểm tra sức khỏe là mô hình rất hay.',
    avatar: 'https://i.pravatar.cc/150?u=10',
    rating: 5
  },
  {
    name: 'Nguyễn Thảo Nguyên',
    location: 'Huế',
    text: 'Tôi rất thích cách các bạn tư vấn. Không ép khách mua tour mà luôn lắng nghe nhu cầu thực tế.',
    avatar: 'https://i.pravatar.cc/150?u=11',
    rating: 5
  },
  {
    name: 'Trương Gia Bình',
    location: 'Quảng Ninh',
    text: 'Lần đầu đi Nhật tự túc nhưng có SigFlex Japan đồng hành 24/7 qua Zalo nên tôi không hề lo lắng.',
    avatar: 'https://i.pravatar.cc/150?u=12',
    rating: 5
  },
  {
    name: 'Phan Thị Tuyết',
    location: 'Nghệ An',
    text: 'Chuyến đi ngắm hoa anh đào vừa rồi tuyệt đẹp. Lịch trình được căn thời gian hoa nở rất chuẩn.',
    avatar: 'https://i.pravatar.cc/150?u=13',
    rating: 5
  },
  {
    name: 'Lý Hoàng Long',
    location: 'Bắc Ninh',
    text: 'Dịch vụ xe private rất sạch sẽ, tài xế lịch sự và đúng giờ. Xứng đáng 5 sao.',
    avatar: 'https://i.pravatar.cc/150?u=14',
    rating: 5
  },
  {
    name: 'Mai Phương Thúy',
    location: 'Hà Nội',
    text: 'Cảm ơn team đã thiết kế một chuyến trăng mật lãng mạn tại Kyoto cho vợ chồng mình.',
    avatar: 'https://i.pravatar.cc/150?u=15',
    rating: 5
  },
  {
    name: 'Hồ Văn Ý',
    location: 'TP.HCM',
    text: 'Hỗ trợ khách hàng rất nhanh. Khi tôi gặp vấn đề về vé tàu, các bạn đã xử lý ngay lập tức.',
    avatar: 'https://i.pravatar.cc/150?u=16',
    rating: 5
  },
  {
    name: 'Trịnh Kim Chi',
    location: 'Đà Lạt',
    text: 'Lịch trình trekking núi Phú Sĩ được chuẩn bị rất kỹ về đồ dùng và sức khỏe. Rất an tâm.',
    avatar: 'https://i.pravatar.cc/150?u=17',
    rating: 4
  },
  {
    name: 'Quách Ngọc Ngoan',
    location: 'Long An',
    text: 'Mua sắm tại Ginza thật sự choáng ngợp. Cảm ơn bạn tư vấn đã chỉ cho mình những cửa hàng đồ cũ cao cấp giá tốt.',
    avatar: 'https://i.pravatar.cc/150?u=18',
    rating: 5
  },
  {
    name: 'Dương Tú Anh',
    location: 'Thanh Hóa',
    text: 'Khách sạn ở các vị trí rất thuận tiện, bước chân ra là thấy ga tàu hoặc khu ăn uống.',
    avatar: 'https://i.pravatar.cc/150?u=19',
    rating: 5
  },
  {
    name: 'Cao Thái Sơn',
    location: 'Hà Nội',
    text: 'Lịch trình thiết kế riêng thực sự khác biệt so với tour đoàn truyền thống. Tự do hơn rất nhiều.',
    avatar: 'https://i.pravatar.cc/150?u=20',
    rating: 5
  },
  {
    name: 'Võ Hạ Trâm',
    location: 'TP.HCM',
    text: 'Lớp học làm Sushi là trải nghiệm con tôi thích nhất. Rất đáng tiền!',
    avatar: 'https://i.pravatar.cc/150?u=21',
    rating: 5
  },
  {
    name: 'Nguyễn Thanh Tùng',
    location: 'Thái Bình',
    text: 'Mọi thứ đều hoàn hảo từ khâu chuẩn bị đến khi kết thúc chuyến đi. Sẽ quay lại vào mùa đông.',
    avatar: 'https://i.pravatar.cc/150?u=22',
    rating: 5
  },
  {
    name: 'Phan Bích Phương',
    location: 'Quảng Ninh',
    text: 'Lần đầu đi một mình mà không thấy bỡ ngỡ nhờ bộ cẩm nang chi tiết từ SigFlex Japan.',
    avatar: 'https://i.pravatar.cc/150?u=23',
    rating: 5
  },
  {
    name: 'Phạm Duy Thuận',
    location: 'Cần Thơ',
    text: 'Hệ thống AI làm việc rất hiệu quả, giúp tôi tối ưu được ngân sách cho chuyến đi 10 ngày.',
    avatar: 'https://i.pravatar.cc/150?u=24',
    rating: 5
  },
  {
    name: 'Nguyễn Khoa Tóc Tiên',
    location: 'TP.HCM',
    text: 'Tour ẩm thực đường phố Osaka thực sự bùng nổ vị giác. Team support rất có tâm.',
    avatar: 'https://i.pravatar.cc/150?u=25',
    rating: 5
  },
  {
    name: 'Nguyễn Đức Cường',
    location: 'Quảng Ninh',
    text: 'Lịch trình về vùng nông thôn Nhật Bản rất yên bình, đúng chất chữa lành mà mình tìm kiếm.',
    avatar: 'https://i.pravatar.cc/150?u=26',
    rating: 5
  },
  {
    name: 'Hàng Lâm Trang Anh',
    location: 'TP.HCM',
    text: 'Kết nối 4G và JR Pass được giao tận tay tại sân bay. Rất nhanh gọn và tiện lợi.',
    avatar: 'https://i.pravatar.cc/150?u=27',
    rating: 5
  },
  {
    name: 'Phạm Hoàng Khoa',
    location: 'TP.HCM',
    text: 'Dịch vụ cao cấp, xứng đáng with số tiền bỏ ra. Private tour là sự lựa chọn đúng đắn.',
    avatar: 'https://i.pravatar.cc/150?u=28',
    rating: 5
  },
  {
    name: 'Nguyễn Thanh Tuấn',
    location: 'Hà Nội',
    text: 'Đưa gia đình đi chơi mà không phải lo nghĩ gì về lịch trình là cảm giác tuyệt vời nhất.',
    avatar: 'https://i.pravatar.cc/150?u=29',
    rating: 5
  },
  {
    name: 'Lê Nguyễn Trung Đan',
    location: 'TP.HCM',
    text: 'Lịch trình hiện đại, bắt kịp xu hướng. Các quán cafe view đẹp được gợi ý rất chuẩn.',
    avatar: 'https://i.pravatar.cc/150?u=30',
    rating: 5
  },
  {
    name: 'Lê Ngọc Đông Nhi',
    location: 'TP.HCM',
    text: 'Gia đình mình đã có những kỷ niệm đẹp tại Disneyland nhờ sự sắp xếp vé và lịch trình của team.',
    avatar: 'https://i.pravatar.cc/150?u=31',
    rating: 5
  },
  {
    name: 'Ông Cao Thắng',
    location: 'TP.HCM',
    text: 'Làm việc chuyên nghiệp, quy trình rõ ràng. Tôi rất tin tưởng khi sử dụng dịch vụ tại đây.',
    avatar: 'https://i.pravatar.cc/150?u=32',
    rating: 5
  },
  {
    name: 'Trần Thị Hồ Ngọc Hà',
    location: 'TP.HCM',
    text: 'Những khách sạn boutique ở Kyoto thực sự đẳng cấp và mang đậm bản sắc Nhật.',
    avatar: 'https://i.pravatar.cc/150?u=33',
    rating: 5
  },
  {
    name: 'Nguyễn Kim Lý',
    location: 'TP.HCM',
    text: 'Đội ngũ hỗ trợ rất nhiệt tình. AI planner giúp chúng tôi tiết kiệm nhiều thời gian trong chuyến đi đầu tiên.',
    avatar: 'https://i.pravatar.cc/150?u=34',
    rating: 5
  },
  {
    name: 'Phan Thị Mỹ Tâm',
    location: 'Đà Nẵng',
    text: 'Một chuyến đi nhẹ nhàng, sâu lắng. Cảm ơn SigFlex Japan đã hiểu được mong muốn của mình.',
    avatar: 'https://i.pravatar.cc/150?u=35',
    rating: 5
  },
  {
    name: 'Hà Anh Tuấn',
    location: 'Đà Lạt',
    text: 'Cách các bạn làm du lịch rất tử tế và tinh tế. Tôi tôi sẽ giới thiệu cho bạn bè.',
    avatar: 'https://i.pravatar.cc/150?u=36',
    rating: 5
  },
  {
    name: 'Lê Việt Hiếu',
    location: 'TP.HCM',
    text: 'Dịch vụ xe đưa đón sân bay rất tiện lợi cho những chuyến bay đêm muộn.',
    avatar: 'https://i.pravatar.cc/150?u=37',
    rating: 5
  },
  {
    name: 'Trần Quang Vinh',
    location: 'TP.HCM',
    text: 'Tôi đã đi Nhật nhiều lần nhưng lần này đi theo lịch trình của SigFlex Japan vẫn thấy nhiều điều mới mẻ.',
    avatar: 'https://i.pravatar.cc/150?u=38',
    rating: 5
  },
  {
    name: 'Tăng Thanh Hà',
    location: 'TP.HCM',
    text: 'Lịch trình rất khoa học, không quá dày đặc giúp gia đình có thời gian nghỉ ngơi.',
    avatar: 'https://i.pravatar.cc/150?u=39',
    rating: 5
  },
  {
    name: 'Ngô Thanh Vân',
    location: 'TP.HCM',
    text: 'Dịch vụ visa chuyên nghiệp, hỗ trợ nhiệt tình các giấy tờ khó. Rất cảm ơn các bạn.',
    avatar: 'https://i.pravatar.cc/150?u=40',
    rating: 5
  },
  {
    name: 'Phạm Duy Thuận Jun',
    location: 'TP.HCM',
    text: 'Trải nghiệm mặc Kimono tại Kyoto được các bạn sắp xếp ở tiệm rất vắng khách du lịch, chụp hình cực đẹp.',
    avatar: 'https://i.pravatar.cc/150?u=41',
    rating: 5
  },
  {
    name: 'Nguyễn Trúc Nhân',
    location: 'TP.HCM',
    text: 'Lịch trình sáng tạo, nhiều điểm đến "ngách" ít người biết nhưng lại cực kỳ thú vị.',
    avatar: 'https://i.pravatar.cc/150?u=42',
    rating: 5
  },
  {
    name: 'Thủy Tiên',
    location: 'Hà Nội',
    text: 'Mọi thứ cứ nhẹ tênh, đi chơi mà như đang ở nhà. Cảm ơn sự chu đáo của team.',
    avatar: 'https://i.pravatar.cc/150?u=43',
    rating: 5
  },
  {
    name: 'Cao Hoàng Uyên Linh',
    location: 'TP.HCM',
    text: 'Thưởng thức nhạc Jazz tại Tokyo theo gợi ý của các bạn là một trải nghiệm mê hoặc.',
    avatar: 'https://i.pravatar.cc/150?u=44',
    rating: 5
  },
  {
    name: 'Nguyễn Phước Thịnh',
    location: 'TP.HCM',
    text: 'Lịch trình shopping được phân bổ hợp lý, không bị quá tải. Tư vấn rất nhiệt tình.',
    avatar: 'https://i.pravatar.cc/150?u=45',
    rating: 5
  },
  {
    name: 'Hồ Quang Hiếu',
    location: 'Buôn Ma Thuột',
    text: 'Cảm ơn SigFlex Japan đã giúp mình có một chuyến đi Nhật ý nghĩa cùng gia đình.',
    avatar: 'https://i.pravatar.cc/150?u=46',
    rating: 5
  },
  {
    name: 'Lê Trung Thành',
    location: 'Hà Nội',
    text: 'Lịch trình đi chụp hình sống ảo được đầu tư rất kỹ. Các bạn hiểu ý khách hàng lắm.',
    avatar: 'https://i.pravatar.cc/150?u=47',
    rating: 5
  },
  {
    name: 'Nguyễn Đức Phúc',
    location: 'Hà Nội',
    text: 'Em thích nhất là được thử các món ăn địa phương mà trước giờ chỉ thấy trên phim.',
    avatar: 'https://i.pravatar.cc/150?u=48',
    rating: 5
  },
  {
    name: 'Nguyễn Thị Hòa',
    location: 'Bắc Ninh',
    text: 'Đưa con nhỏ đi du lịch Nhật Bản chưa bao giờ dễ dàng đến thế nhờ sự hỗ trợ của SigFlex Japan.',
    avatar: 'https://i.pravatar.cc/150?u=49',
    rating: 5
  },
  {
    name: 'Lê Thanh Trúc',
    location: 'TP.HCM',
    text: 'Phong cách làm việc hiện đại, nhanh chóng và rất hiệu quả. Tuyệt vời!',
    avatar: 'https://i.pravatar.cc/150?u=50',
    rating: 5
  }
];
