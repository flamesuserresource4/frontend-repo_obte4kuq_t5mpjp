import React from 'react';
import { ShieldCheck, CalendarClock, Ban } from 'lucide-react';

export default function KeyTable({ items = [], onRevoke }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h2 className="text-sm font-semibold text-gray-900">Active keys</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2 font-medium">Key</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Expires</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">No keys yet</td>
              </tr>
            ) : items.map((item) => (
              <tr key={item.key} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-[12px] break-all">{item.key}</td>
                <td className="px-4 py-2">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${item.revoked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {item.revoked ? 'Revoked' : 'Valid'}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700">
                  <div className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4 text-gray-400" />
                    {new Date(item.expiresAt).toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {!item.revoked && (
                    <button onClick={() => onRevoke?.(item.key)} className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-white text-xs">
                      <Ban className="h-3.5 w-3.5" /> Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
