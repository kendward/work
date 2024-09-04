import { auth } from "@/utils/auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import QueryProvider from "./query-provider";
import ToastProvider from "./toast-provider";
import StoreProvider from "./store-provider";

const Providers = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <QueryProvider>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </QueryProvider>
            </StoreProvider>
        </SessionProvider>
    )
};

export default Providers;
