'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

/** Not fully implemented */
export default function Component() {
  const { data: session } = useSession();
  return (
    <div className="flex gap-2 bg-red-800 text-white">
      {session?.user ? (
        <>
          <Label>Signed in as {session.user.email}</Label>
          <label className="hidden @sm:block"></label>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <Label>Not signed in</Label>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => {
  return <label className="hidden @xs:block">{children}</label>;
};
