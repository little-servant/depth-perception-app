import { cues as cueItems } from "@/data/cues";
import type { DepthCueState } from "@/types";

import { ToggleSwitch } from "./ToggleSwitch";

type TogglePanelProps = {
  cues: DepthCueState;
  onToggle: (key: keyof DepthCueState) => void;
};

export function TogglePanel({ cues, onToggle }: TogglePanelProps) {
  return (
    <section className="scene-card rounded-[28px] p-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-deep">
          Toggle panel
        </p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          깊이 단서를 하나씩 끄고 켜며 장면이 어떻게 달라지는지 직접 비교해 보세요.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {cueItems.map((cue) => (
          <div key={cue.id} className="panel-line rounded-[20px] p-4">
            <ToggleSwitch
              checked={cues[cue.id]}
              labelEn={cue.nameEn}
              labelKo={cue.nameKo}
              onChange={() => onToggle(cue.id)}
            />
            <p className="mt-3 text-sm leading-6 text-text-secondary">{cue.descriptionKo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
