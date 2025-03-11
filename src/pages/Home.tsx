import { Link } from 'react-router-dom';
import { Upload, Link as LinkIcon, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[90vh] relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm">
            <span className="px-3 py-0.5 text-sm font-semibold text-blue-600 mr-1">
              ใหม่!
            </span>
            <span className="text-sm text-gray-600">
              รองรับการอัปโหลดไฟล์ขนาดใหญ่ถึง 100MB
            </span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            <span className="text-gradient">แชร์ไฟล์ง่ายๆ</span>
            <br />
            ในไม่กี่วินาที
          </h1>

          <p className="mt-5 text-xl text-gray-600 max-w-2xl mx-auto">
            อัปโหลดและแชร์ไฟล์ได้อย่างง่ายดาย ปลอดภัย และรวดเร็ว ไม่ต้องลงทะเบียน
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/upload"
              className="hoverable-card inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-blue-500/25"
            >
              <Upload className="w-5 h-5 mr-2" />
              เริ่มอัปโหลด
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            ทำไมต้องใช้ FileShare?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl hoverable-card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 glass-card rounded-2xl p-8 md:p-12 animate-scale-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "อัปโหลดง่าย",
    description: "ลากและวางไฟล์หรือเลือกไฟล์ที่ต้องการ รองรับไฟล์ทุกประเภท",
    icon: <Upload className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-100"
  },
  {
    title: "แชร์ได้ทันที",
    description: "รับลิงก์สำหรับแชร์ทันทีหลังจากอัปโหลดเสร็จ",
    icon: <LinkIcon className="w-6 h-6 text-indigo-600" />,
    iconBg: "bg-indigo-100"
  },
  {
    title: "ความเร็วสูง",
    description: "ระบบประมวลผลที่รวดเร็ว ดาวน์โหลดได้ทันที",
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    iconBg: "bg-yellow-100"
  }
];

const stats = [
  {
    value: "100 MB",
    label: "ขนาดไฟล์สูงสุด"
  },
  {
    value: "30 วัน",
    label: "ระยะเวลาจัดเก็บ"
  },
  {
    value: "ฟรี",
    label: "ไม่มีค่าใช้จ่าย"
  }
];

export default Home;
