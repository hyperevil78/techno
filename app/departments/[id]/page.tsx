import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

// Define the structure of a department
interface DeptInfo {
  name: string;
  color: string;
  bg: string;
}

// Use Record to tell TypeScript that any string key will return a DeptInfo
const departmentData: Record<string, DeptInfo> = {
  pwd: { name: 'Public Works (PWD)', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  electricity: { name: 'Electricity Board', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  water: { name: 'Water & Sewage', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  sanitation: { name: 'Sanitation', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  health: { name: 'Public Health', color: 'text-red-500', bg: 'bg-red-500/10' },
  safety: { name: 'Safety & Police', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
};

// Next.js 15 requires params to be treated as a Promise in Server Components
export default async function DepartmentDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // 1. Await the params
  const { id } = await params; 
  
  // 2. Access data safely. Using the 'Record' type above fixed the indexing error.
  const dept = departmentData[id] || { 
    name: 'Department Not Found', 
    color: 'text-slate-400', 
    bg: 'bg-slate-800' 
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link href="/departments" className="flex items-center text-slate-400 hover:text-white transition gap-2 mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Departments
        </Link>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`p-4 rounded-2xl ${dept.bg} border border-white/5`}>
             <AlertCircle className={dept.color} size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">{dept.name}</h1>
            <p className="text-slate-400">Manage and report issues for this sector.</p>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Report Card */}
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Report New Issue</h3>
            <p className="text-slate-400 mb-6 text-sm">
              Submit a photo and location to notify the {dept.name} ground team.
            </p>
            <button className="w-full py-4 rounded-xl font-bold bg-white text-black hover:scale-[1.02] transition-transform active:scale-95">
              Open Reporting Tool
            </button>
          </div>

          {/* Status Card */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Department Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Clock size={16}/> Response Time
                </span>
                <span className="text-white font-mono text-xs">~24 Hours</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={16}/> Resolution Rate
                </span>
                <span className="text-emerald-500 font-mono text-xs">88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
          <div className="bg-slate-900/20 border border-white/5 p-12 rounded-[2rem] text-center text-slate-500 italic">
            No active reports found in {dept.name} for your current location.
          </div>
        </div>
      </div>
    </main>
  );
}