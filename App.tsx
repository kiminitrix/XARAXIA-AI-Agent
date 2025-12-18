
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AgentInterface from './components/AgentInterface';
import KnowledgeBase from './components/KnowledgeBase';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNewTask={() => setActiveTab('new-task')} />;
      case 'new-task':
        return <AgentInterface />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'history':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <h3 className="text-lg font-bold">Task History</h3>
            <p>Historical logs of all your AI missions will appear here.</p>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNewTask={() => setActiveTab('new-task')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
