import React, { useState } from 'react';
import { X, Download, FileText, Table2, FileSpreadsheet, Check } from 'lucide-react';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageName?: string;
}

const formats = [
  { id: 'csv',   label: 'CSV',   icon: Table2,           desc: 'Comma-separated values' },
  { id: 'excel', label: 'Excel', icon: FileSpreadsheet,  desc: 'Microsoft Excel (.xlsx)' },
  { id: 'pdf',   label: 'PDF',   icon: FileText,         desc: 'Portable Document Format' },
];

const dateRanges = [
  { id: 'today',   label: 'Today' },
  { id: 'week',    label: 'Last 7 days' },
  { id: 'month',   label: 'Last 30 days' },
  { id: 'quarter', label: 'Last 3 months' },
  { id: 'year',    label: 'This year' },
  { id: 'all',     label: 'All time' },
];

export const ExportDataModal: React.FC<ExportDataModalProps> = ({ isOpen, onClose, pageName = 'Data' }) => {
  const [format, setFormat]       = useState('csv');
  const [dateRange, setDateRange] = useState('month');
  const [exporting, setExporting] = useState(false);
  const [done, setDone]           = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      // Simulate file download
      const filename = `${pageName.toLowerCase().replace(/\s+/g, '_')}_${dateRange}.${format === 'excel' ? 'xlsx' : format}`;
      const blob = new Blob([`# ${pageName} Export\nDate Range: ${dateRange}\nFormat: ${format}\nGenerated: ${new Date().toISOString()}`], { type: 'text/plain' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setExporting(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(15,22,41,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[460px] mx-4 overflow-hidden"
        style={{ boxShadow: '0px 20px 60px rgba(0,0,0,0.18)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[25px] py-[20px]"
          style={{ borderBottom: '1px solid rgba(56,78,133,0.07)' }}
        >
          <div className="flex items-center gap-[12px]">
            <div
              className="flex items-center justify-center rounded-[11px]"
              style={{ width: 38, height: 38, backgroundColor: '#eef1f8' }}
            >
              <Download style={{ width: 18, height: 18, color: '#384e85' }} />
            </div>
            <div>
              <p className="font-bold text-[#0f1629] text-[14px] leading-[21px]">Export {pageName}</p>
              <p className="font-normal text-[#7a8299] text-[12px] leading-[18px]">Choose format and date range</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border-none bg-transparent cursor-pointer rounded-[8px] p-[6px] hover:bg-[#f4f5f8] transition"
          >
            <X style={{ width: 16, height: 16, color: '#7a8299' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[25px] py-[20px] flex flex-col gap-[20px]">

          {/* Format */}
          <div>
            <p className="font-semibold text-[#4a5568] text-[12px] leading-[18px] mb-[8px]">File Format</p>
            <div className="grid grid-cols-3 gap-[8px]">
              {formats.map((f) => {
                const Icon = f.icon;
                const selected = format === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className="flex flex-col items-center gap-[6px] rounded-[12px] border-none cursor-pointer py-[14px] px-[8px] transition"
                    style={{
                      backgroundColor: selected ? '#eef1f8' : '#fafafa',
                      border: selected ? '2px solid #384e85' : '2px solid rgba(56,78,133,0.12)',
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: selected ? '#384e85' : '#7a8299' }} />
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: selected ? '#384e85' : '#0f1629' }}
                    >
                      {f.label}
                    </span>
                    <span className="text-[10px] text-[#7a8299] text-center leading-[14px]">{f.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <p className="font-semibold text-[#4a5568] text-[12px] leading-[18px] mb-[8px]">Date Range</p>
            <div className="grid grid-cols-3 gap-[6px]">
              {dateRanges.map((d) => {
                const selected = dateRange === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDateRange(d.id)}
                    className="rounded-[10px] border-none cursor-pointer py-[8px] px-[10px] text-[12px] font-medium transition text-center"
                    style={{
                      backgroundColor: selected ? '#eef1f8' : 'transparent',
                      border: selected ? '2px solid #384e85' : '2px solid rgba(56,78,133,0.12)',
                      color: selected ? '#384e85' : '#4a5568',
                      fontWeight: selected ? 700 : 500,
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-[10px] px-[25px] py-[16px]"
          style={{ borderTop: '1px solid rgba(56,78,133,0.07)' }}
        >
          <button
            onClick={onClose}
            className="border-none cursor-pointer rounded-[10px] font-semibold text-[13px] text-[#7a8299] hover:bg-[#f4f5f8] transition"
            style={{ padding: '9px 18px', backgroundColor: 'transparent' }}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || done}
            className="flex items-center gap-[7px] border-none cursor-pointer rounded-[12px] text-white font-bold text-[13px] leading-[19.5px] transition"
            style={{
              padding: '9px 22px',
              background: done
                ? 'linear-gradient(166.73deg, #10b981 0%, #34d399 100%)'
                : 'linear-gradient(166.73deg, rgb(56, 78, 133) 0%, rgb(91, 123, 200) 100%)',
              boxShadow: '0px 4px 7px rgba(56,78,133,0.28)',
              opacity: exporting ? 0.8 : 1,
              minWidth: 140,
              justifyContent: 'center',
            }}
          >
            {done ? (
              <>
                <Check style={{ width: 14, height: 14 }} />
                Downloaded!
              </>
            ) : exporting ? (
              <>
                <div
                  className="rounded-full border-2 border-white border-t-transparent animate-spin"
                  style={{ width: 14, height: 14 }}
                />
                Exporting...
              </>
            ) : (
              <>
                <Download style={{ width: 14, height: 14 }} />
                Export {format.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
