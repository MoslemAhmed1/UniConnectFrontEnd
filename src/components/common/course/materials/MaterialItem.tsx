import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Trash2, Loader2, Edit } from "lucide-react";
import type { Material } from "@/types/student/material";
import { CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import { handleDownload } from "@/utils/download-handler";
import { useNavigate } from "react-router";
import EditMaterialModal from "../modals/EditMaterialModal";
import { useState } from "react";
import { useDeleteMaterial } from "@/hooks/student/use-delete-material";

type MaterialItemProps = {
  material: Material;
  allowModifyMaterials?: boolean;
};

export default function MaterialItem({
  material,
  allowModifyMaterials,
}: MaterialItemProps) {
  const navigate = useNavigate();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { handleDeleteMaterial, isDeleting } = useDeleteMaterial();

  const handleDelete = async (eventId: number) => {
    try {
      setPendingDeleteId(eventId);
      await handleDeleteMaterial(eventId);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const uploadedAt = new Date(material.uploaded_at);
  const now = new Date();
  const diffInMs = now.getTime() - uploadedAt.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  let formattedDate: string;
  if (diffInDays < 7) {
    formattedDate = formatDistanceToNow(uploadedAt, {
      addSuffix: true,
    });
  } else {
    formattedDate = format(diffInDays, "MMM d, h:mma");
  }

  return (
    <CardContent className="p-6 hover:bg-slate-100/70 transition-colors">
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
              <span>{material.file.type.toUpperCase()}</span>
              <span>•</span>
              <span>{material.file.size}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>
                {material.uploader.first_name +
                  " " +
                  material.uploader.parent_name}
              </span>
            </CardDescription>
            {/* Actions */}
            <div className="flex items-center gap-3">
              {allowModifyMaterials && (
                <>
                  <EditMaterialModal material={material} />

                  {/* Delete Modal */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        disabled={isDeleting && pendingDeleteId === material.id}
                      >
                        {isDeleting && pendingDeleteId === material.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this material?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove the material
                          <span className="font-semibold">
                            {" "}
                            "{material.title}"
                          </span>
                          .
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-white hover:bg-destructive/90"
                          onClick={() => handleDelete(material.id)}
                        >
                          {isDeleting && pendingDeleteId === material.id ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Eye className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {allowModifyMaterials && (
              <>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() =>
                navigate(`/instructor/materials/view/${material.id}`, {
                  replace: true,
                })
              }
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={handleDownload(material.file)}
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
