import { FiUploadCloud, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FiUploadCloud className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-semibold text-gray-800">FileShare</span>
          </div>
          <div className="text-sm text-gray-500">
            <div className="flex items-center">
              Made with <FiHeart className="h-4 w-4 text-red-500 mx-1" /> in Thailand
            </div>
            <div className="mt-1">
              &copy; {new Date().getFullYear()} FileShare. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;