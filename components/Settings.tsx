
import React from 'react';
import { 
  Shield, 
  Key, 
  User, 
  Bell, 
  CreditCard,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Settings as SettingsIcon
} from 'lucide-react';

const Settings: React.FC = () => {
  const [showKey, setShowKey] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Section */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-8">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
          JD
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">John Doe</h2>
          <p className="text-slate-500">john.doe@xaraxia.ai</p>
          <div className="flex gap-2 mt-4">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">Pro Account</span>
            <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">Malaysia (MY)</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all">
          Edit Profile
        </button>
      </section>

      {/* Settings Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          {[
            { id: 'general', icon: User, label: 'General' },
            { id: 'api', icon: Key, label: 'API Keys' },
            { id: 'billing', icon: CreditCard, label: 'Billing' },
            { id: 'security', icon: Shield, label: 'Security' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
          ].map(item => (
            <button key={item.id} className={`w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${
              item.id === 'api' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-800 text-lg">External API Keys</h3>
               <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
                  {/* Fixed: Use imported Plus icon from lucide-react which correctly accepts 'size' prop */}
                  <Plus size={14} />
                  Add New Key
               </button>
            </div>
            
            <p className="text-sm text-slate-500 mb-6">Connect your favorite tools by adding their API keys below. These are stored securely and never shared.</p>

            <div className="space-y-4">
              {[
                { name: 'Google Workspace', status: 'Connected', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
                { name: 'Slack', status: 'Not Connected', icon: 'https://cdn-icons-png.flaticon.com/512/3800/3800024.png' },
                { name: 'GitHub', status: 'Connected', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
              ].map((tool, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={tool.icon} alt={tool.name} className="w-8 h-8 rounded-lg" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{tool.name}</h4>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${tool.status === 'Connected' ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {tool.status}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600">
                    {/* Fixed: Use aliased SettingsIcon to avoid recursion/naming conflict with the current component */}
                    <SettingsIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-800 text-lg mb-6">System API Configuration</h3>
             <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 block mb-2">Gemini API Key (Internal)</span>
                  <div className="relative">
                    <input 
                      type={showKey ? 'text' : 'password'} 
                      value="••••••••••••••••••••••••••••"
                      readOnly
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    >
                      {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                   <Shield className="text-amber-600 mt-1" size={18} />
                   <div className="text-xs text-amber-800 leading-relaxed">
                     This key is provided by the system context. To use your own billing account for higher limits, toggle the "Custom Billing" option in Account Security.
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
