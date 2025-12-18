
import React from 'react';
import { 
  Send, 
  Paperclip, 
  Globe, 
  Sparkles, 
  Loader2, 
  Play, 
  Square,
  CheckCircle,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';
import { TASK_TEMPLATES } from '../constants';
import { generateAgentPlan, executeStep, summarizeFinalResult } from '../geminiService';
import { TaskStatus, AgentStep } from '../types';

const AgentInterface: React.FC = () => {
  const [prompt, setPrompt] = React.useState('');
  const [status, setStatus] = React.useState<TaskStatus>(TaskStatus.PENDING);
  const [steps, setSteps] = React.useState<AgentStep[]>([]);
  const [result, setResult] = React.useState<string | null>(null);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [sources, setSources] = React.useState<any[]>([]);

  const handleStartTask = async () => {
    if (!prompt.trim()) return;
    
    setIsExecuting(true);
    setStatus(TaskStatus.RUNNING);
    setResult(null);
    setSources([]);

    try {
      // Step 1: Generate Plan
      const plan = await generateAgentPlan(prompt);
      const initialSteps: AgentStep[] = plan.steps.map((s, idx) => ({
        id: String(idx),
        action: s,
        status: 'pending',
        timestamp: Date.now()
      }));
      setSteps(initialSteps);

      // We'll simulate a slight delay for realism and process each step
      let fullContext = "";
      for (let i = 0; i < initialSteps.length; i++) {
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
        
        const stepResult = await executeStep(initialSteps[i].action, fullContext);
        fullContext += `\nStep ${i+1} (${initialSteps[i].action}): ${stepResult.result}`;
        
        if (stepResult.sources) {
          setSources(prev => [...prev, ...stepResult.sources!]);
        }

        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done', details: stepResult.result } : s));
        await new Promise(r => setTimeout(r, 1000));
      }

      // Final Step: Summarize
      const finalSummary = await summarizeFinalResult(fullContext);
      setResult(finalSummary);
      setStatus(TaskStatus.COMPLETED);
    } catch (err) {
      console.error(err);
      setStatus(TaskStatus.FAILED);
    } finally {
      setIsExecuting(false);
    }
  };

  const useTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {status === TaskStatus.PENDING ? (
        <div className="space-y-8">
          {/* Templates Section */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Select Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TASK_TEMPLATES.map(t => (
                <button 
                  key={t.id}
                  onClick={() => useTemplate(t.prompt)}
                  className="p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-indigo-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Sparkles size={18} />
                    </div>
                    <h4 className="font-bold text-slate-800">{t.title}</h4>
                  </div>
                  <p className="text-sm text-slate-500">{t.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Main Input */}
          <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Globe size={20} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-800">What is the mission today?</h3>
                  <p className="text-sm text-slate-500">Provide detailed instructions for XARAXIA agent.</p>
               </div>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Search for the 5 best articles about AI Agents in 2024 and summarize..."
                className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all text-black font-medium"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Paperclip size={20} />
                </button>
                <button 
                  onClick={handleStartTask}
                  disabled={!prompt.trim() || isExecuting}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  {isExecuting ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
                  Start Agent
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress / Step List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800">Execution Log</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    status === TaskStatus.RUNNING ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {status}
                  </span>
               </div>
               <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                          step.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' :
                          step.status === 'running' ? 'bg-indigo-50 border-indigo-500 text-indigo-500' :
                          'bg-white border-slate-200 text-slate-300'
                        }`}>
                          {step.status === 'done' ? <CheckCircle size={12} /> : idx + 1}
                        </div>
                        {idx !== steps.length - 1 && (
                          <div className={`w-0.5 h-10 ${step.status === 'done' ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`text-sm font-semibold ${
                          step.status === 'running' ? 'text-indigo-600' : 'text-slate-700'
                        }`}>
                          {step.action}
                        </p>
                        {step.status === 'running' && (
                           <div className="flex items-center gap-2 mt-2">
                              <Loader2 size={12} className="animate-spin text-indigo-500" />
                              <span className="text-[10px] text-slate-400 font-medium">Processing...</span>
                           </div>
                        )}
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-8 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-50">
                    Pause
                  </button>
                  <button 
                    onClick={() => setStatus(TaskStatus.PENDING)}
                    className="flex-1 py-2 rounded-lg border border-rose-100 bg-rose-50 text-rose-600 text-sm font-bold hover:bg-rose-100"
                  >
                    Stop
                  </button>
               </div>
            </div>

            {sources.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Globe size={18} />
                  Referenced Sources
                </h3>
                <div className="space-y-3">
                  {sources.slice(0, 5).map((source, i) => (
                    <a 
                      key={i} 
                      href={source.web?.uri} 
                      target="_blank" 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="p-1 bg-slate-100 rounded text-slate-400">
                        <ExternalLink size={12} />
                      </div>
                      <span className="text-xs text-slate-600 font-medium truncate max-w-[150px]">
                        {source.web?.title || 'External Link'}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 text-white rounded-xl">
                      <FileText size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Mission Output</h2>
                  </div>
                  {result && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold transition-all">
                      <Download size={16} />
                      Export PDF
                    </button>
                  )}
               </div>

               <div className="flex-1 prose prose-slate max-w-none text-slate-600">
                  {!result ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Loader2 className="animate-spin text-slate-300" size={32} />
                      </div>
                      <h4 className="font-bold text-slate-400">Agent is working...</h4>
                      <p className="text-sm text-slate-400 max-w-xs mt-1">Collecting data and synthesizing information for your mission.</p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed animate-in fade-in duration-700">
                      {result}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentInterface;
