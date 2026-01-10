import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './components/CreatePoll/CreatePoll';
import PollView from './components/PollView/PollView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Board Game Scheduler
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:pollId" element={<PollView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
