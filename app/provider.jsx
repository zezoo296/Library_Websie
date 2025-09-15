"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "../context/AuthContext";

export const queryClient = new QueryClient();
const CLIENT_ID =
    "1031000372523-seqau285gq0au2kr8unmddsv2otkco6v.apps.googleusercontent.com";

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </AuthProvider>
    );
}
