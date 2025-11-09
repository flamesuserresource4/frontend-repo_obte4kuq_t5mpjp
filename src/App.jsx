import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import KeyGenerator from './components/KeyGenerator.jsx';
import KeyTable from './components/KeyTable.jsx';
import SecurityTips from './components/SecurityTips.jsx';

function App() {
  const [keys, setKeys] = useState([]);

  const onCreate = (newKeys) => {
    // Merge newly generated keys into table (not persisted here)
    const enriched = newKeys.map(k => ({ ...k, revoked: false }));
    setKeys(prev => [...enriched, ...prev]);
  };

  const onRevoke = (keyString) => {
    setKeys(prev => prev.map(k => k.key === keyString ? { ...k, revoked: true } : k));
  };

  const stats = useMemo(() => {
    const total = keys.length;
    const active = keys.filter(k => !k.revoked).length;
    const expired = keys.filter(k => new Date(k.expiresAt) < new Date()).length;
    return { total, active, expired };
  }, [keys]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-gray-900">
      <Header onCreateClick={() => { /* scroll to generator */ document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' }); }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Total keys</p>
            <p className="mt-1 text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Active</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600">{stats.active}</p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Expired</p>
            <p className="mt-1 text-2xl font-semibold text-amber-600">{stats.expired}</p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 items-start" id="generator">
          <div className="lg:col-span-2 space-y-6">
            <KeyGenerator onCreate={onCreate} />
            <KeyTable items={keys} onRevoke={onRevoke} />
          </div>
          <div className="lg:col-span-1">
            <SecurityTips />
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        Built for secure license operations. For production, pair this with server-side hashing, verification, and RBAC.
      </footer>
    </div>
  );
}

export default App;
