import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { auth } from "./auth";

const Providers = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>
};

export default Providers;
