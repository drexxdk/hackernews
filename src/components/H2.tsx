import { ReactNode } from 'react';

const H2 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-2xl font-bold">{children}</h2>;
};

export default H2;
