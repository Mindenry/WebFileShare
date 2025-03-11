import { XIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileCardProps {
  file: File;
  onRemove: () => void;
}

const FileCard = ({ file, onRemove }: FileCardProps) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎬';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('zip') || fileType.includes('rar')) return '🗜️';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    return '📁';
  };

  const getBackgroundColor = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'from-blue-500 to-blue-600';
    if (fileType.startsWith('video/')) return 'from-purple-500 to-purple-600';
    if (fileType.startsWith('audio/')) return 'from-green-500 to-green-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="relative p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex items-center justify-center w-14 h-14 rounded-xl text-white text-2xl",
          "bg-gradient-to-br shadow-sm",
          getBackgroundColor(file.type)
        )}>
          {getFileIcon(file.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium text-gray-900 truncate mb-1">{file.name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full w-8 h-8 p-0"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
