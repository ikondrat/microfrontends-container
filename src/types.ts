export type FrontendName = 'sso' | 'sell' | 'invest';

export type FrontEnd = {
  register: (container: string, history: History) => void;
  unregister: (container: string) => void;
};
