import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from "lucide-react";
import type { Material } from "@/types/student/material";
import { CardTitle , CardDescription , CardContent } from "@/components/ui/card";

type MaterialItemProps = {
  material: Material;
};

export default function MaterialItem({ material }: MaterialItemProps) {
  return (
      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex-1">
              <CardTitle className="text-base font-medium text-slate-800">
                {material.title}
              </CardTitle>

              <CardDescription className="flex items-center gap-2 text-sm mt-1">
                <span>{material.type}</span>
                <span>•</span>
                <span>{material.size}</span>
                <span>•</span>
                <span>{material.uploaded_at}</span>
                <span>•</span>
                <span>{material.uploader}</span>
              </CardDescription>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Eye className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
  );
}
