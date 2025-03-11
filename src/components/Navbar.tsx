import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">FileShare</span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              หน้าหลัก
            </Link>
            <Link 
              to="/upload" 
              className="hoverable-card inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              อัปโหลดไฟล์
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
