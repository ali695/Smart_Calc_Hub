import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, FileText, Calculator } from "lucide-react";
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
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = margin;

      // Colors
      const primaryColor: [number, number, number] = [0, 102, 255]; // #0066ff
      const darkText: [number, number, number] = [26, 26, 26];
      const grayText: [number, number, number] = [100, 100, 100];
      const lightBg: [number, number, number] = [248, 250, 252];
      const borderColor: [number, number, number] = [226, 232, 240];

      // Draw page border
      pdf.setDrawColor(...borderColor);
      pdf.setLineWidth(0.5);
      pdf.rect(8, 8, pageWidth - 16, pageHeight - 16);

      // Draw decorative top border
      pdf.setFillColor(...primaryColor);
      pdf.rect(8, 8, pageWidth - 16, 3, 'F');

      // Logo and Header Section
      yPos = 20;
      
      // Draw calculator icon (simplified square with lines)
      pdf.setFillColor(...primaryColor);
      pdf.roundedRect(margin, yPos, 10, 10, 1, 1, 'F');
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + 2, yPos + 2, 6, 1.5, 'F');
      pdf.rect(margin + 2, yPos + 4.5, 2.5, 1.5, 'F');
      pdf.rect(margin + 5.5, yPos + 4.5, 2.5, 1.5, 'F');
      pdf.rect(margin + 2, yPos + 7, 2.5, 1.5, 'F');
      pdf.rect(margin + 5.5, yPos + 7, 2.5, 1.5, 'F');

      // Brand name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(...primaryColor);
      pdf.text('SmartCalc Hub', margin + 14, yPos + 7);

      // Tagline
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(...grayText);
      pdf.text('Your Trusted Calculator Platform', margin + 14, yPos + 11);

      // Title Section
      yPos = 45;
      pdf.setFillColor(...lightBg);
      pdf.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'F');
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(0.8);
      pdf.line(margin, yPos, margin, yPos + 22);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(...primaryColor);
      pdf.text(title, margin + 5, yPos + 10);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...grayText);
      const dateStr = `Calculated on: ${timestamp.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
      pdf.text(dateStr, margin + 5, yPos + 17);

      // Input Values Section
      yPos = 75;
      if (inputs.length > 0) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(...darkText);
        pdf.text('Input Values', margin, yPos);
        
        pdf.setDrawColor(...borderColor);
        pdf.setLineWidth(0.3);
        pdf.line(margin, yPos + 3, margin + 50, yPos + 3);
        
        yPos += 10;
        
        const inputColWidth = (contentWidth - 5) / 2;
        inputs.forEach((input, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const xPos = margin + (col * (inputColWidth + 5));
          const itemY = yPos + (row * 18);
          
          // Input box
          pdf.setFillColor(...lightBg);
          pdf.roundedRect(xPos, itemY, inputColWidth, 15, 1, 1, 'F');
          pdf.setDrawColor(...primaryColor);
          pdf.setLineWidth(0.5);
          pdf.line(xPos, itemY, xPos, itemY + 15);
          
          // Label
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          pdf.setTextColor(...grayText);
          pdf.text(formatLabel(input.label).toUpperCase(), xPos + 3, itemY + 5);
          
          // Value
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(12);
          pdf.setTextColor(...darkText);
          pdf.text(String(input.value), xPos + 3, itemY + 12);
        });
        
        yPos += (Math.ceil(inputs.length / 2) * 18) + 10;
      }

      // Formula Section
      if (formula) {
        pdf.setFillColor(255, 243, 224); // Amber light
        pdf.roundedRect(margin, yPos, contentWidth, 18, 1, 1, 'F');
        pdf.setDrawColor(255, 152, 0); // Amber
        pdf.setLineWidth(0.8);
        pdf.line(margin, yPos, margin, yPos + 18);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(8);
        pdf.setTextColor(230, 81, 0);
        pdf.text('FORMULA USED', margin + 4, yPos + 6);
        
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(...darkText);
        const formulaLines = pdf.splitTextToSize(formula, contentWidth - 10);
        pdf.text(formulaLines, margin + 4, yPos + 13);
        
        yPos += 25;
      }

      // Results Section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...darkText);
      pdf.text('Calculation Results', margin, yPos);
      
      pdf.setDrawColor(...borderColor);
      pdf.setLineWidth(0.3);
      pdf.line(margin, yPos + 3, margin + 60, yPos + 3);
      
      yPos += 8;
      
      // Results box with primary border
      const resultsHeight = results.length * 20 + 10;
      pdf.setFillColor(227, 242, 253); // Light blue
      pdf.roundedRect(margin, yPos, contentWidth, resultsHeight, 2, 2, 'F');
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(1);
      pdf.roundedRect(margin, yPos, contentWidth, resultsHeight, 2, 2, 'S');
      
      results.forEach((result, idx) => {
        const itemY = yPos + 8 + (idx * 20);
        
        // Label
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(...primaryColor);
        pdf.text(formatLabel(result.label).toUpperCase(), margin + 5, itemY);
        
        // Value
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(13, 71, 161); // Dark blue
        pdf.text(String(result.value), margin + 5, itemY + 10);
        
        // Separator line
        if (idx < results.length - 1) {
          pdf.setDrawColor(144, 202, 249);
          pdf.setLineWidth(0.2);
          pdf.line(margin + 5, itemY + 14, margin + contentWidth - 5, itemY + 14);
        }
      });
      
      yPos += resultsHeight + 15;

      // Footer Section
      const footerY = pageHeight - 35;
      
      pdf.setDrawColor(...borderColor);
      pdf.setLineWidth(0.3);
      pdf.line(margin, footerY, pageWidth - margin, footerY);
      
      // Footer logo
      pdf.setFillColor(...primaryColor);
      pdf.roundedRect(margin, footerY + 5, 6, 6, 0.5, 0.5, 'F');
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + 1.2, footerY + 6.2, 3.6, 1, 'F');
      pdf.rect(margin + 1.2, footerY + 8, 1.5, 1, 'F');
      pdf.rect(margin + 3.3, footerY + 8, 1.5, 1, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...darkText);
      pdf.text('SmartCalc Hub', margin + 9, footerY + 10);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(...grayText);
      pdf.text('Your Trusted Calculator Platform', margin + 9, footerY + 15);
      
      // Website
      pdf.setTextColor(...primaryColor);
      pdf.text('smartcalchub.online', pageWidth - margin - 35, footerY + 10);
      
      // Disclaimer
      pdf.setFontSize(7);
      pdf.setTextColor(...grayText);
      pdf.text('Disclaimer: These calculations are for informational purposes only. Please consult professionals for important decisions.', 
        pageWidth / 2, footerY + 22, { align: 'center' });

      // Save PDF
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
            className="bg-white text-gray-900 rounded-lg border-2 border-gray-200 shadow-sm print:shadow-none print:border-0 overflow-hidden"
          >
            {/* Decorative Top Border */}
            <div className="h-1.5 bg-primary w-full" />
            
            <div className="p-8">
              {/* Header with Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-primary">SmartCalc Hub</h2>
                  <p className="text-xs text-gray-500">Your Trusted Calculator Platform</p>
                </div>
              </div>

              {/* Title Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-primary">
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
                  <h2 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
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
                <h2 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">
                  Calculation Results
                </h2>
                <div className="bg-blue-50 rounded-lg border-2 border-primary p-4">
                  {results.map((result, idx) => (
                    <div 
                      key={idx} 
                      className={`py-3 ${idx !== results.length - 1 ? 'border-b border-blue-200' : ''}`}
                    >
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                        {formatLabel(result.label)}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">{result.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary rounded">
                      <Calculator className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">SmartCalc Hub</p>
                      <p className="text-xs text-gray-500">Your Trusted Calculator Platform</p>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">smartcalchub.online</p>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 text-center">
                  Disclaimer: These calculations are for informational purposes only. Please consult professionals for important decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
