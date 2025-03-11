import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadProgressProps {
  progress: number;
  fileName: string;
  fileSize: string;
}

export function UploadProgress({ progress, fileName, fileSize }: UploadProgressProps) {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="block text-sm font-medium text-gray-900 truncate max-w-[200px] mb-1">
            {fileName}
          </span>
          <span className="text-sm text-gray-500">{fileSize}</span>
        </div>
        <span className={cn(
          "text-sm font-medium",
          progress === 100 ? "text-green-600" : "text-blue-600"
        )}>
          {progress}%
        </span>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-end">
          <span className="text-xs text-gray-500">
            {progress === 100 ? "เสร็จสิ้น" : "กำลังอัปโหลด..."}
          </span>
        </div>
      </div>
    </div>
  );
}
