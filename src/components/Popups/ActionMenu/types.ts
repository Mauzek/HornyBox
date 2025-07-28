import type { User } from "../../../types";


export interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
  isGamePage: boolean;
  user: User | null;
}