import { ReactNode } from 'react';

const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="mb-2 text-4xl font-bold">{children}</h1>;
};

export default H1;
