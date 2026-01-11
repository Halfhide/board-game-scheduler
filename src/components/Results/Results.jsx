import { getBestDates, getVoteSummary } from '../../utils/pollHelpers';
import { formatDate } from '../../utils/dateHelpers';
import DateSummary from './DateSummary';

function Results({ dates }) {
  const bestDates = getBestDates(dates);

  if (dates.length === 0) {
    return null;
  }

  // Get total unique voters
  const allVoters = new Set();
  dates.forEach(date => {
    date.votes.forEach(vote => {
      allVoters.add(vote.voterName);
    });
  });

  const totalVoters = allVoters.size;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Results</h3>
        <p className="text-sm text-gray-600">
          {totalVoters} {totalVoters === 1 ? 'person has' : 'people have'} voted so far
        </p>
      </div>

      {/* Best Dates */}
      <div className="space-y-3">
        {bestDates.slice(0, 2).map((dateData, index) => {
          const summary = getVoteSummary(dateData.votes);
          const hasVotes = dateData.votes.length > 0;

          return (
            <div
              key={dateData.id}
              className={`border rounded-md p-3 ${
                index === 0 && hasVotes
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {formatDate(dateData.date)}
                    {index === 0 && hasVotes && (
                      <span className="ml-2 text-xs font-medium text-green-700">
                        🏆 Best
                      </span>
                    )}
                  </h4>
                </div>
                <div className="text-xs text-gray-600">
                  {dateData.votes.length} {dateData.votes.length === 1 ? 'vote' : 'votes'}
                </div>
              </div>

              {/* Vote Bars - Compact */}
              {hasVotes ? (
                <div className="space-y-1.5">
                  {/* Yes Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-green-700 w-14">
                      Yes ({summary.yes})
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-green-500 h-full flex items-center justify-end px-1.5 transition-all duration-300"
                        style={{
                          width: `${(summary.yes / dateData.votes.length) * 100}%`,
                        }}
                      >
                        {summary.yes > 0 && (
                          <span className="text-[10px] font-medium text-white">
                            {Math.round((summary.yes / dateData.votes.length) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Maybe Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-yellow-700 w-14">
                      Maybe ({summary.maybe})
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full flex items-center justify-end px-1.5 transition-all duration-300"
                        style={{
                          width: `${(summary.maybe / dateData.votes.length) * 100}%`,
                        }}
                      >
                        {summary.maybe > 0 && (
                          <span className="text-[10px] font-medium text-white">
                            {Math.round((summary.maybe / dateData.votes.length) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* No Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-red-700 w-14">
                      No ({summary.no})
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-red-500 h-full flex items-center justify-end px-1.5 transition-all duration-300"
                        style={{
                          width: `${(summary.no / dateData.votes.length) * 100}%`,
                        }}
                      >
                        {summary.no > 0 && (
                          <span className="text-[10px] font-medium text-white">
                            {Math.round((summary.no / dateData.votes.length) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Voter List */}
                  <DateSummary votes={dateData.votes} />
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No votes yet</p>
              )}
            </div>
          );
        })}
      </div>

      {bestDates.length > 2 && (
        <p className="mt-3 text-xs text-gray-500 text-center">
          Showing top 2 dates
        </p>
      )}
    </div>
  );
}

export default Results;
