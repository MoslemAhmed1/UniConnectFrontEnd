import { PdfViewer } from "@/components/global/PdfViewer";
import api from "@/lib/axios";
import type { File } from "@/types/student/file";
import { type Material } from "@/types/student/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const MaterialViewer = () => {
  const { id } = useParams<{ id: string }>();

  const { data: material, isLoading } = useQuery<Material>({
    queryKey: ["get-material", id],
    queryFn: async () => {
      const res = await api.get(`/api/materials/${id}`);
      return res.data;
    },
  });

  const getViewerType = (file: File) => {
    switch (file.type) {
      case "application/pdf":
        return <PdfViewer fileUrl={file.url} className="w-6/10 h-200 " />;
      default:
        return <>File format not supported.</>;
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      {!isLoading && material ? (
        getViewerType(material.file)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
