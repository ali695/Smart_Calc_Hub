import { useCallback } from "react";

interface PrintCalculatorData {
  title: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string }[];
  formula?: string;
  timestamp?: Date;
}

export const usePrintCalculator = () => {
  const printCalculation = useCallback((data: PrintCalculatorData) => {
    const { title, inputs, results, formula, timestamp = new Date() } = data;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print calculations");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - SmartCalc Hub</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              padding: 40px;
              color: #1a1a1a;
              line-height: 1.6;
            }
            .header {
              border-bottom: 3px solid #0066cc;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            h1 {
              color: #0066cc;
              font-size: 32px;
              margin-bottom: 10px;
            }
            .timestamp {
              color: #666;
              font-size: 14px;
            }
            .section {
              margin: 30px 0;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 20px;
              font-weight: 600;
              color: #333;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e0e0e0;
            }
            .data-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            }
            .data-item {
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #0066cc;
            }
            .data-label {
              font-size: 12px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .data-value {
              font-size: 18px;
              font-weight: 600;
              color: #1a1a1a;
            }
            .results {
              background: #e3f2fd;
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
              border: 2px solid #0066cc;
            }
            .result-item {
              padding: 15px 0;
              border-bottom: 1px solid #90caf9;
            }
            .result-item:last-child {
              border-bottom: none;
            }
            .result-label {
              font-size: 14px;
              color: #1565c0;
              margin-bottom: 5px;
            }
            .result-value {
              font-size: 28px;
              font-weight: 700;
              color: #0d47a1;
            }
            .formula {
              background: #fff3e0;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #ff9800;
              margin: 20px 0;
              font-family: 'Courier New', monospace;
              font-size: 16px;
            }
            .formula-title {
              font-size: 14px;
              color: #e65100;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body {
                padding: 20px;
              }
              .no-print {
                display: none;
              }
            }
            @page {
              margin: 20mm;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
            <div class="timestamp">
              Calculated on: ${timestamp.toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          ${inputs.length > 0 ? `
            <div class="section">
              <div class="section-title">Input Values</div>
              <div class="data-grid">
                ${inputs.map(input => `
                  <div class="data-item">
                    <div class="data-label">${input.label}</div>
                    <div class="data-value">${input.value}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${formula ? `
            <div class="section">
              <div class="formula">
                <div class="formula-title">Formula Used:</div>
                ${formula}
              </div>
            </div>
          ` : ''}

          <div class="section">
            <div class="section-title">Calculation Results</div>
            <div class="results">
              ${results.map(result => `
                <div class="result-item">
                  <div class="result-label">${result.label}</div>
                  <div class="result-value">${result.value}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="footer">
            <p><strong>SmartCalc Hub</strong> - Your Trusted Calculator Platform</p>
            <p>Visit smartcalchub.com for more calculators and tools</p>
            <p style="margin-top: 10px; font-size: 10px;">
              Disclaimer: These calculations are for informational purposes only. 
              Please consult with professionals for important financial, health, or engineering decisions.
            </p>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  }, []);

  return { printCalculation };
};
