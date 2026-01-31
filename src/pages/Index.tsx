import React, { useState } from 'react';
import { CheckSquare, FileText, BarChart3, Timer, Search } from 'lucide-react';
import TodoApp from '@/components/Todo/TodoApp';
import UserForm from '@/components/Forms/UserForm';
import MultiProgressBar from '@/components/Progress/MultiProgressBar';
import CountdownTimer from '@/components/Timer/CountdownTimer';
import SearchList from '@/components/Search/SearchList';

type TabType = 'todo' | 'form' | 'progress' | 'timer' | 'search';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('todo');

  const tabs: TabConfig[] = [
    { id: 'todo', label: 'Todo App', icon: <CheckSquare size={18} />, component: <TodoApp /> },
    { id: 'form', label: 'Form', icon: <FileText size={18} />, component: <UserForm /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 size={18} />, component: <MultiProgressBar /> },
    { id: 'timer', label: 'Timer', icon: <Timer size={18} />, component: <CountdownTimer /> },
    { id: 'search', label: 'Search', icon: <Search size={18} />, component: <SearchList /> },
  ];

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            React Developer Assignment
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Vasundharaa Geo Technologies Pvt Ltd
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-border bg-card sticky top-[73px] z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-fade-in" key={activeTab}>
          {activeComponent}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Built with React, TypeScript, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
};

export default Index;
