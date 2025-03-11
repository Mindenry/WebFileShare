import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Upload as UploadIcon, Copy, Check, CloudUpload } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabase';
import { UploadProgress } from '@/components/UploadProgress';
import { QRCodeShare } from '@/components/QRCodeShare';
import FileCard from '@/components/FileCard';
import { cn } from '@/lib/utils';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("โปรดเลือกไฟล์", {
        description: "คุณยังไม่ได้เลือกไฟล์ที่ต้องการอัปโหลด",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("ไฟล์มีขนาดใหญ่เกินไป", {
        description: "ขนาดไฟล์ต้องไม่เกิน 100MB",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const downloadId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${downloadId}.${fileExtension}`;
      
      // Changed the file path structure to be simpler for storage
      const filePath = `${downloadId}/${fileName}`;

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Upload file to Supabase Storage
      const { error: storageError } = await supabase
        .storage
        .from('files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (storageError) {
        throw storageError;
      }

      // Get download URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('files')
        .getPublicUrl(filePath);

      // Save file data to database
      const { error } = await supabase
        .from('files')
        .insert([
          {
            filename: file.name,
            filesize: file.size,
            file_path: filePath,
            file_type: file.type,
            download_url: publicUrl,
            download_id: downloadId
          }
        ]);

      if (error) throw error;

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create download URL for sharing
      const downloadPageUrl = `${window.location.origin}/download/${downloadId}`;
      setDownloadUrl(downloadPageUrl);

      toast.success("อัปโหลดสำเร็จ", {
        description: "ไฟล์ของคุณพร้อมให้แชร์แล้ว",
      });
    } catch (error) {
      console.error('Error uploading file: ', error);
      toast.error("เกิดข้อผิดพลาด", {
        description: "ไม่สามารถอัปโหลดไฟล์ได้ โปรดลองอีกครั้ง",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    toast.success('คัดลอกลิงก์เรียบร้อย!');
    setTimeout(() => setCopied(false), 2000);
  };

  const removeFile = () => {
    setFile(null);
    setDownloadUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-blue-200 blur-xl opacity-50 rounded-full"></div>
            <div className="relative inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
              <CloudUpload className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">อัปโหลดไฟล์</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            แชร์ไฟล์ได้ง่ายๆ เพียงลากและวาง
          </p>
        </div>

        {!downloadUrl ? (
          <div className="space-y-8">
            <div
              className={cn(
                "relative group border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
                "hover:border-blue-400 hover:bg-blue-50/50",
                "border-gray-200 bg-white/70 backdrop-blur-sm"
              )}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-blue-200 blur-lg opacity-50 rounded-full"></div>
                  <div className="relative p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                    <UploadIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-medium text-gray-800 mb-2">
                    ลากและวางไฟล์ที่นี่
                  </p>
                  <p className="text-gray-500">
                    หรือคลิกเพื่อเลือกไฟล์ (สูงสุด 100MB)
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div className="space-y-6">
                <FileCard file={file} onRemove={removeFile} />
                {uploading && (
                  <UploadProgress
                    progress={uploadProgress}
                    fileName={file.name}
                    fileSize={formatFileSize(file.size)}
                  />
                )}
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={cn(
                "w-full py-6 text-lg font-medium transition-all duration-300",
                "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-green-200 blur-xl opacity-50 rounded-full"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg">
                  <Check className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">อัปโหลดสำเร็จ!</h2>
              <p className="text-gray-600">แชร์ไฟล์ของคุณด้วยลิงก์หรือ QR Code</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  ลิงก์สำหรับแชร์
                </label>
                <div className="flex shadow-sm rounded-lg overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={downloadUrl}
                    className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button
                    variant="default"
                    onClick={handleCopyLink}
                    className={cn(
                      "rounded-l-none px-6",
                      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    )}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              
              <QRCodeShare url={downloadUrl} />
            </div>

            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={removeFile}
                className="px-8 py-6 text-lg border-2 hover:bg-gray-50"
              >
                อัปโหลดไฟล์อื่น
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
