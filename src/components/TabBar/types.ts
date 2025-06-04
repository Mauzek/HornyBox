export interface Tab {
  id: string;
  path: string;
  icon: React.ReactNode | string;
  label: string;
  show?: boolean;
}
