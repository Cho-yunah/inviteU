'use client';
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
// import { createBrowserClient } from '@supabase/ssr';

interface SupabaseProviderProp {
	children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
	const [supabaseClient] = useState(() =>
		createClientComponentClient({
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!
		})
	);

	return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>;
};

export default SupabaseProvider;
