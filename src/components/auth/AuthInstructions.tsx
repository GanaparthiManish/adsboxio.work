import React from 'react';
import { AlertCircle } from 'lucide-react';

export function AuthInstructions() {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start space-x-2">
        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Before logging in, ensure:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>You have a stable internet connection</li>
            <li>Pop-ups are enabled for this site</li>
            <li>Your browser is up to date</li>
            <li>You're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            Need help? Contact <a href="mailto:help@adsbox.com" className="text-blue-500 hover:text-blue-600">help@adsbox.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}