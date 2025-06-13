import type { IconName } from "../../assets/icons";
import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  title: string;
  id: IconName;
}
