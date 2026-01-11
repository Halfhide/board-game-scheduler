import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePoll } from '../../hooks/usePoll';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { addVote, addComment } from '../../utils/pollHelpers';
import { sortDates } from '../../utils/dateHelpers';
import Loading from '../shared/Loading';
import CopyLink from '../shared/CopyLink';
import Calendar from './Calendar';
import DateModal from './DateModal';
import Results from '../Results/Results';
import confetti from 'canvas-confetti';

function PollView() {
  const { pollId } = useParams();
  const { poll, loading, error } = usePoll(pollId);
  const [voterName, setVoterName] = useLocalStorage('voterName', '');
  const [tempName, setTempName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate shareable link
  const pollUrl = `${window.location.origin}/poll/${pollId}`;

  const handleVote = async (dateId, response) => {
    if (!voterName) {
      alert('Please enter your name first');
      return;
    }
    await addVote(pollId, dateId, voterName, response);
  };

  const handleComment = async (dateId, text) => {
    if (!voterName) {
      alert('Please enter your name first');
      return;
    }
    await addComment(pollId, dateId, voterName, text);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setVoterName(tempName.trim());
      setTempName('');

      // 🎉 Celebration confetti when name is saved!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleDateClick = (dateData) => {
    setSelectedDate(dateData);
  };

  if (loading) {
    return <Loading message="Loading poll..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-red-900 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!poll) {
    return null;
  }

  const sortedDates = sortDates(poll.dates);

  return (
    <div className="space-y-6">
      {/* Poll Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{poll.title}</h2>

        {/* Share Link */}
        <CopyLink url={pollUrl} />
      </div>

      {/* Name Input Section - Prominent and Clear */}
      {!voterName ? (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Step 1: Enter Your Name
              </h3>
              <p className="text-blue-100 mb-4">
                Please provide your name to start voting and commenting on dates. This helps everyone see who has voted.
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your name (e.g., John Smith)"
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                  }}
                />
                <button
                  onClick={handleSaveName}
                  disabled={!tempName.trim()}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-bounce-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">
                  You're voting as:
                </p>
                <p className="text-lg font-bold text-green-900">
                  {voterName}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setTempName(voterName);
                setVoterName('');
              }}
              className="text-sm text-green-700 hover:text-green-900 font-medium underline"
            >
              Change Name
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <Results dates={sortedDates} />

      {/* Calendar View */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {voterName ? 'Step 2: Click on dates to vote' : 'Available Dates'}
        </h3>
        <Calendar
          dates={sortedDates}
          voterName={voterName}
          onDateClick={handleDateClick}
        />
      </div>

      {/* Date Modal */}
      {selectedDate && (
        <DateModal
          dateData={selectedDate}
          pollId={pollId}
          voterName={voterName}
          onVote={handleVote}
          onComment={handleComment}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default PollView;
