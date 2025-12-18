
import React from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  UploadCloud,
  Globe
} from 'lucide-react';
import { KnowledgeItem } from '../types';

const KnowledgeBase: React.FC = () => {
  const [items, setItems] = React.useState<KnowledgeItem[]>([
    { id: '1', name: 'Standard_Operating_Procedures.pdf', type: 'file', size: '1.2 MB', addedAt: Date.now() - 5000000 },
    { id: '2', name: 'Product_Roadmap_2024.xlsx', type: 'file', size: '450 KB', addedAt: Date.now() - 10000000 },
    { id: '3', name: 'XARAXIA Project Wiki', type: 'link', addedAt: Date.now() - 15000000 },
  ]);

  const [isUploading, setIsUploading] = React.useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search knowledge..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Globe size={18} />
            Add Link
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all">
            <Plus size={18} />
            Upload File
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Date Added</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.type === 'file' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.type === 'file' ? <FileText size={18} /> : <Globe size={18} />}
                    </div>
                    <span className="font-semibold text-slate-700">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 capitalize">{item.type}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.size || '--'}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(item.addedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={40} className="text-slate-300" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">No knowledge items yet</h4>
            <p className="text-slate-500 max-w-xs mt-2">Upload documents or add links for your AI agents to reference during missions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
