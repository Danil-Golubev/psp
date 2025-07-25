import { ReactNode } from 'react';

export type SemiOption = {
  name: string;
  icon: string;
  data: ReactNode;
};

export type MainOption = {
  name: string;
  icon: string;
  semiOptions: SemiOption[];
};
