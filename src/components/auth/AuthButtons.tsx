import React from 'react';
import { Mail, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthButtonsProps {
  onMethodSelect: (method: 'email' | 'phone') => void;
  onGoogleAuth: () => void;
  isLoading: boolean;
}

export function AuthButtons({ onMethodSelect, onGoogleAuth, isLoading }: AuthButtonsProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => !isLoading && onGoogleAuth()}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800" />
          </div>
        ) : (
          <>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBmaWxsPSIjRkZDMTA3IiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMS42NDksNC42NTctNi4wOCw4LTExLjMwMyw4Yy02LjYyNywwLTEyLTUuMzczLTEyLTEyYzAtNi42MjcsNS4zNzMtMTIsMTItMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxMi45NTUsNCw0LDEyLjk1NSw0LDI0YzAsMTEuMDQ1LDguOTU1LDIwLDIwLDIwYzExLjA0NSwwLDIwLTguOTU1LDIwLTIwQzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkYzRDAwIiBkPSJNNi4zMDYsMTQuNjkxbDYuNTcxLDQuODE5QzE0LjY1NSwxNS4xMDgsMTguOTYxLDEyLDI0LDEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Q0FGNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2Yy01LjIwMiwwLTkuNjE5LTMuMzE3LTExLjI4My03Ljk0NmwtNi41MjIsNS4wMjVDOS41MDUsMzkuNTU2LDE2LjIyNyw0NCwyNCw0NHoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMTk3NkQyIiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMC43OTIsMi4yMzctMi4yMzEsNC4xNjYtNC4wODcsNS41NzFjMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48L3N2Zz4=" 
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <button
        onClick={() => !isLoading && onMethodSelect('email')}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Mail className="w-5 h-5" />
        <span>Continue with Email</span>
      </button>

      <button
        onClick={() => !isLoading && onMethodSelect('phone')}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Smartphone className="w-5 h-5" />
        <span>Continue with Phone</span>
      </button>
    </div>
  );
}