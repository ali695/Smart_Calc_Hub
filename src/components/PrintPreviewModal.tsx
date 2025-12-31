import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, X, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PrintPreviewData {
  title: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string }[];
  formula?: string;
  timestamp?: Date;
}

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PrintPreviewData | null;
}

export const PrintPreviewModal = ({ isOpen, onClose, data }: PrintPreviewModalProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const { title, inputs, results, formula, timestamp = new Date() } = data;

  const formatLabel = (label: string) => {
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}-calculation.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-primary" />
              Print Preview
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handlePrint}
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        {/* Preview Content */}
        <div className="p-6">
          <div 
            ref={previewRef}
            className="bg-white text-gray-900 p-8 rounded-lg border shadow-sm print:shadow-none print:border-0"
          >
            {/* Header */}
            <div className="border-b-4 border-primary pb-4 mb-6">
              <h1 className="text-2xl font-bold text-primary mb-1">{title}</h1>
              <p className="text-sm text-gray-500">
                Calculated on: {timestamp.toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Input Values */}
            {inputs.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                  Input Values
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {inputs.map((input, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-gray-50 rounded-lg border-l-4 border-primary"
                    >
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {formatLabel(input.label)}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">{input.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula */}
            {formula && (
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-xs text-amber-700 font-semibold uppercase mb-1">Formula Used</p>
                <p className="text-sm text-gray-800 font-mono">{formula}</p>
              </div>
            )}

            {/* Results */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                Calculation Results
              </h2>
              <div className="bg-blue-50 rounded-lg border-2 border-primary p-4">
                {results.map((result, idx) => (
                  <div 
                    key={idx} 
                    className={`py-3 ${idx !== results.length - 1 ? 'border-b border-blue-200' : ''}`}
                  >
                    <p className="text-xs text-primary font-medium uppercase tracking-wide">
                      {formatLabel(result.label)}
                    </p>
                    <p className="text-2xl font-bold text-primary">{result.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t-2 border-gray-200 text-center">
              <p className="font-semibold text-gray-700">SmartCalc Hub</p>
              <p className="text-sm text-gray-500">Your Trusted Calculator Platform</p>
              <p className="text-xs text-gray-400 mt-2">
                Visit smartcalchub.online for more calculators and tools
              </p>
              <p className="text-[10px] text-gray-400 mt-3">
                Disclaimer: These calculations are for informational purposes only.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
