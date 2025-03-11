import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeShareProps {
  url: string;
}

export function QRCodeShare({ url }: QRCodeShareProps) {
  const handleCopyQR = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const dataUrl = canvas.toDataURL();
        const blob = await (await fetch(dataUrl)).blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('คัดลอก QR Code สำเร็จ');
      }
    } catch (err) {
      toast.error('ไม่สามารถคัดลอก QR Code');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <QRCodeSVG
            value={url}
            size={200}
            level="H"
            includeMargin
            className="rounded-lg"
          />
        </div>
        <button 
          onClick={handleCopyQR}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3",
            "text-gray-700 bg-white border border-gray-200",
            "hover:bg-gray-50 rounded-lg transition-colors",
            "shadow-sm hover:shadow"
          )}
        >
          <Copy className="w-4 h-4" />
          คัดลอก QR Code
        </button>
      </div>
    </div>
  );
}
