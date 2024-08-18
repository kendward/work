import { auth } from "@/utils/auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import QueryProvider from "./query-provider";
import ToastProvider from "./toast-provider";

const Providers = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <QueryProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </QueryProvider>
        </SessionProvider>
    )
};

export default Providers;
