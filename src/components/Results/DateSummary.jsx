import { useState } from 'react';

function DateSummary({ votes }) {
  const [showVoters, setShowVoters] = useState(false);

  if (votes.length === 0) {
    return null;
  }

  // Group votes by response
  const groupedVotes = votes.reduce((acc, vote) => {
    if (!acc[vote.response]) {
      acc[vote.response] = [];
    }
    acc[vote.response].push(vote.voterName);
    return acc;
  }, {});

  return (
    <div className="mt-3 pt-3 border-t">
      <button
        onClick={() => setShowVoters(!showVoters)}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {showVoters ? 'Hide' : 'Show'} Voter Details
      </button>

      {showVoters && (
        <div className="mt-3 space-y-2 text-sm">
          {groupedVotes.yes && groupedVotes.yes.length > 0 && (
            <div>
              <span className="font-medium text-green-700">Yes: </span>
              <span className="text-gray-700">{groupedVotes.yes.join(', ')}</span>
            </div>
          )}
          {groupedVotes.maybe && groupedVotes.maybe.length > 0 && (
            <div>
              <span className="font-medium text-yellow-700">Maybe: </span>
              <span className="text-gray-700">{groupedVotes.maybe.join(', ')}</span>
            </div>
          )}
          {groupedVotes.no && groupedVotes.no.length > 0 && (
            <div>
              <span className="font-medium text-red-700">No: </span>
              <span className="text-gray-700">{groupedVotes.no.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateSummary;
