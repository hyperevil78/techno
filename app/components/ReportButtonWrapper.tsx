'use client';
import { useState } from 'react';
import ReportModal from './ReportModal';

export default function ReportButtonWrapper({ deptName, deptId }: { deptName: string, deptId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 rounded-xl font-bold bg-white text-black hover:scale-[1.02] transition-transform active:scale-95"
      >
        Open Reporting Tool
      </button>

      {isOpen && (
        <ReportModal 
          deptName={deptName} 
          deptId={deptId} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}