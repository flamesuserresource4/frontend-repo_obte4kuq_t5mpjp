import React from 'react';
import { Shield, KeyRound, Plus } from 'lucide-react';

export default function Header({ onCreateClick }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">License Admin</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Secure key generation & management</p>
          </div>
        </div>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 active:bg-indigo-700 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          New keys
        </button>
      </div>
    </header>
  );
}
