import React, { useState } from 'react';
import { KeyRound, Hash, Calendar, CheckCircle2, Copy } from 'lucide-react';

function generateSecureKey(length = 32) {
  const cryptoObj = window.crypto || window.msCrypto;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' ;
  const randomValues = new Uint32Array(length);
  cryptoObj.getRandomValues(randomValues);
  let key = '';
  for (let i = 0; i < length; i++) {
    key += charset[randomValues[i] % charset.length];
  }
  return key;
}

export default function KeyGenerator({ onCreate }) {
  const [count, setCount] = useState(1);
  const [prefix, setPrefix] = useState('LIC');
  const [days, setDays] = useState(365);
  const [keys, setKeys] = useState([]);

  const handleGenerate = () => {
    const newKeys = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => {
      const core = generateSecureKey(32);
      const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      return {
        key: `${prefix}-${core}`,
        expiresAt: expiresAt.toISOString(),
      };
    });
    setKeys(newKeys);
    onCreate?.(newKeys);
  };

  const copyAll = async () => {
    const text = keys.map(k => `${k.key}\t${k.expiresAt}`).join('\n');
    await navigator.clipboard.writeText(text);
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50/80">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm font-semibold text-gray-900">Generate keys</h2>
        </div>
      </div>
      <div className="p-4 grid md:grid-cols-4 gap-4">
        <label className="block">
          <span className="text-xs font-medium text-gray-700">Count</span>
          <input type="number" min={1} max={100} value={count} onChange={(e)=>setCount(parseInt(e.target.value||'1',10))}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-700">Prefix</span>
          <div className="mt-1 flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-400" />
            <input value={prefix} onChange={(e)=>setPrefix(e.target.value)}
              className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm" />
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-700">Validity (days)</span>
          <div className="mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input type="number" min={1} max={3650} value={days} onChange={(e)=>setDays(parseInt(e.target.value||'1',10))}
              className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm" />
          </div>
        </label>
        <div className="flex items-end">
          <button onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 active:bg-indigo-700 shadow-sm w-full md:w-auto">
            <CheckCircle2 className="h-4 w-4" /> Generate
          </button>
        </div>
      </div>

      {keys.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="p-3 flex items-center justify-between bg-gray-50">
            <p className="text-xs text-gray-600">Generated {keys.length} keys</p>
            <button onClick={copyAll} className="inline-flex items-center gap-2 px-2 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-white text-xs">
              <Copy className="h-3.5 w-3.5" /> Copy all
            </button>
          </div>
          <div className="max-h-64 overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white sticky top-0">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-2 font-medium">Key</th>
                  <th className="px-4 py-2 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {keys.map((k, idx)=> (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-[12px] break-all">{k.key}</td>
                    <td className="px-4 py-2 text-gray-700">{new Date(k.expiresAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
