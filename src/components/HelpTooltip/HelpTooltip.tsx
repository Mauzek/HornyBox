import React from "react";
import styles from "./HelpTooltip.module.scss";
import type { HelpTooltipProps } from "./types";

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ text }) => {
  return (
    <div className={styles.tooltip}>
      <button className={styles.tooltip__button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
        >
          <path
            fill="#fff"
            d="M9 11.996v-2.544q1.296-.064 1.984-.544.705-.495.704-1.456v-.224q0-.736-.448-1.136-.448-.416-1.2-.416-.8 0-1.28.464-.48.465-.656 1.184l-1.52-.608q.144-.495.416-.96.288-.464.72-.816.433-.368 1.024-.576.592-.225 1.36-.224.784 0 1.424.224.64.225 1.088.64.448.4.688.992.24.575.24 1.28 0 .72-.256 1.296a2.9 2.9 0 0 1-.656.96q-.4.4-.912.656-.511.24-1.056.336v1.472zm.848 3.696q-.608 0-.896-.288-.272-.305-.272-.768v-.272q0-.465.272-.752.287-.304.896-.304.608 0 .88.304.288.288.288.752v.272q0 .464-.288.768-.272.288-.88.288"
          />
        </svg>
      </button>
      <div className={styles.tooltip__text}>
        <p>{text}</p>
      </div>
    </div>
  );
};
