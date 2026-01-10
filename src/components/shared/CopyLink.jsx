import { useState } from 'react';

function CopyLink({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4">
      <h3 className="text-sm font-medium text-green-900 mb-2">
        Poll created successfully!
      </h3>
      <p className="text-sm text-green-700 mb-3">
        Share this link with participants:
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          readOnly
          className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-sm text-gray-700"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default CopyLink;
