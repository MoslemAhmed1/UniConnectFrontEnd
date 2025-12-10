import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type PdfViewerProps = {
  fileUrl: string;
  className?: string;
};

export const PdfViewer = ({ className, fileUrl }: PdfViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={className}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};
