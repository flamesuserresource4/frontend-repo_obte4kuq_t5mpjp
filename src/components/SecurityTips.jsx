import React from 'react';
import { ShieldAlert, Lock, EyeOff, Server, KeySquare } from 'lucide-react';

export default function SecurityTips() {
  const tips = [
    {
      icon: <Lock className="h-5 w-5" />, title: 'Store keys hashed',
      desc: 'Never store raw keys. Hash with a modern KDF (Argon2id or scrypt) and compare on validation.'
    },
    {
      icon: <EyeOff className="h-5 w-5" />, title: 'Show once policy',
      desc: 'Display generated keys only once. After issuing, you should not be able to reveal them again.'
    },
    {
      icon: <Server className="h-5 w-5" />, title: 'Server-side verification',
      desc: 'Validate licenses on your server via short-lived signed tokens. Never trust client checks.'
    },
    {
      icon: <KeySquare className="h-5 w-5" />, title: 'Rotation & revocation',
      desc: 'Support key rotation, expiration, device binding, and instant revocation endpoints.'
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert className="h-5 w-5 text-amber-400" />
        <h2 className="text-sm font-semibold">Security checklist</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {tips.map((t) => (
          <li key={t.title} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="shrink-0 grid place-items-center h-9 w-9 rounded-md bg-white/10 text-amber-200">
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-slate-300 mt-0.5">{t.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
