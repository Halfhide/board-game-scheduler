import { useState } from 'react';
import VoteButton from './VoteButton';
import CommentSection from './CommentSection';
import { formatDate } from '../../utils/dateHelpers';
import { getVoteSummary } from '../../utils/pollHelpers';

function DateCard({ dateData, pollId, voterName, onVote, onComment }) {
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Find current user's vote
  const currentUserVote = dateData.votes.find(
    (v) => v.voterName === voterName
  );

  const voteSummary = getVoteSummary(dateData.votes);

  const handleVote = async (response) => {
    if (!voterName) return;

    setLoading(true);
    try {
      await onVote(dateData.id, response);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* Date Header */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {formatDate(dateData.date)}
        </h3>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="text-green-600 font-medium">
            {voteSummary.yes} Yes
          </span>
          <span className="text-yellow-600 font-medium">
            {voteSummary.maybe} Maybe
          </span>
          <span className="text-red-600 font-medium">
            {voteSummary.no} No
          </span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex gap-2">
        <VoteButton
          response="yes"
          currentVote={currentUserVote?.response}
          onClick={handleVote}
          loading={loading}
        />
        <VoteButton
          response="maybe"
          currentVote={currentUserVote?.response}
          onClick={handleVote}
          loading={loading}
        />
        <VoteButton
          response="no"
          currentVote={currentUserVote?.response}
          onClick={handleVote}
          loading={loading}
        />
      </div>

      {/* Comments Toggle */}
      <div className="pt-4 border-t">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showComments ? 'Hide Comments' : `Show Comments (${dateData.comments.length})`}
        </button>

        {showComments && (
          <CommentSection
            comments={dateData.comments}
            pollId={pollId}
            dateId={dateData.id}
            voterName={voterName}
            onComment={onComment}
          />
        )}
      </div>
    </div>
  );
}

export default DateCard;
