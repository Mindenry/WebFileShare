import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download as DownloadIcon, ArrowLeft, File, Shield, Clock } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabase';
import { cn } from '@/lib/utils';

type FileDetails = {
  id: string;
  filename: string;
  filesize: number;
  file_type: string;
  download_url: string;
  created_at: string;
  download_id: string;
};

const Download = () => {
  const { downloadId } = useParams<{ downloadId: string }>();
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      if (!downloadId) return;
      
      try {
        setLoading(true);
        console.log("Fetching file with download_id:", downloadId);
        
        const { data, error } = await supabase
          .from('files')
          .select('*')
          .eq('download_id', downloadId)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        if (!data) {
          console.error("No data found for download_id:", downloadId);
          throw new Error('ไม่พบไฟล์');
        }

        console.log("File details retrieved:", data);
        setFileDetails(data as FileDetails);
      } catch (err) {
        console.error('Error fetching file details:', err);
        setError('ไม่พบไฟล์หรือลิงก์ไม่ถูกต้อง');
        toast.error("ไม่พบไฟล์", {
          description: "ลิงก์ดาวน์โหลดไม่ถูกต้องหรือไฟล์อาจถูกลบไปแล้ว",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [downloadId]);

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string = '') => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎬';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('zip') || fileType.includes('rar')) return '🗜️';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    return '📁';
  };

  const downloadFile = async () => {
    try {
      if (!fileDetails) return;
      
      toast.success("เริ่มดาวน์โหลดไฟล์แล้ว");
      
      // Create anchor element and trigger download
      const link = document.createElement('a');
      link.href = fileDetails.download_url;
      link.download = fileDetails.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      toast.error("เกิดข้อผิดพลาดในการดาวน์โหลด");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center space-y-4">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-blue-200 blur-xl opacity-50 rounded-full"></div>
            <div className="relative w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-medium text-gray-700">กำลังโหลด...</h2>
        </div>
      </div>
    );
  }

  if (error || !fileDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-red-200 blur-xl opacity-50 rounded-full"></div>
            <div className="relative p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full inline-flex">
              <File className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบไฟล์</h1>
            <p className="text-gray-600 mb-6">
              ลิงก์ดาวน์โหลดไม่ถูกต้องหรือไฟล์อาจถูกลบไปแล้ว
            </p>
          </div>
          <Link to="/">
            <Button className="inline-flex items-center gap-2 px-6 py-3">
              <ArrowLeft className="h-4 w-4" />
              กลับไปหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับไปหน้าหลัก
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center border-b border-gray-100 space-y-6">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-blue-200 blur-xl opacity-50 rounded-full"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <span className="text-5xl">{getFileIcon(fileDetails.file_type)}</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words">
                {fileDetails.filename}
              </h1>
              <p className="text-gray-500">{formatFileSize(fileDetails.filesize)}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-4">
                <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">ปลอดภัย</h3>
                  <p className="text-sm text-gray-500">ไฟล์นี้ปลอดภัยและพร้อมให้ดาวน์โหลด</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">อัปโหลดเมื่อ</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(fileDetails.created_at).toLocaleString('th-TH')}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                คลิกปุ่มด้านล่างเพื่อดาวน์โหลดไฟล์
              </p>
              <Button
                onClick={downloadFile}
                size="lg"
                className={cn(
                  "px-8 py-6 text-lg",
                  "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                  "transition-all duration-300 transform hover:scale-105"
                )}
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                ดาวน์โหลดไฟล์
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
