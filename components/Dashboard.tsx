
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { MOCK_STATS, MOCK_HISTORY } from '../constants';

const data = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 7 },
  { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 12 },
  { name: 'Fri', tasks: 8 },
  { name: 'Sat', tasks: 3 },
  { name: 'Sun', tasks: 6 },
];

const Dashboard: React.FC<{ onNewTask: () => void }> = ({ onNewTask }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Tasks', value: MOCK_STATS.activeTasks, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Completed', value: MOCK_STATS.completedTasks, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Credits Left', value: MOCK_STATS.creditsRemaining, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Time Saved', value: MOCK_STATS.timeSaved, icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Task Activity</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-medium p-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Quick Start</h3>
            <p className="text-slate-500 text-sm mb-6">Start a new automated mission with one of our high-performance agents.</p>
            <div className="space-y-3">
               <button onClick={onNewTask} className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all">
                  Create New Task
                  <ArrowRight size={18} />
               </button>
               <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all">
                  Upload Knowledge
                  <ArrowRight size={18} />
               </button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
             <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Recent History</h4>
             <div className="space-y-4">
                {MOCK_HISTORY.map(h => (
                   <div key={h.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-700 font-medium truncate">{h.title}</span>
                      <span className="text-[10px] text-slate-400 ml-auto">2h ago</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
