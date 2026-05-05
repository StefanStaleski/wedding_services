import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Session } from '@supabase/supabase-js';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });
    }, []);

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError('Wrong credentials');
        else setSession(data.session);
    };

    if (loading) return null;
    if (!session) return (
        <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="font-serif text-3xl text-charcoal mb-8 text-center">Admin</h1>
            <input className="w-full border border-gray-200 rounded-lg p-3 mb-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    <input className="w-full border border-gray-200 rounded-lg p-3 mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={login} className="w-full bg-charcoal text-white py-3 rounded-lg font-sans">Sign In</button>
    </div>
    </div>
    );

        return <>{children}</>;
    }