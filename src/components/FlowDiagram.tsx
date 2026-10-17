"use client";

import { useRef, useState } from "react";
import { audiences } from "@/content/company";

export function FlowDiagram() {
  const [active, setActive] = useState(audiences[0].id);
  const [run, setRun] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const current = audiences.find((a) => a.id === active) ?? audiences[0];

  const select = (id: string) => {
    if (id === active) return;
    setActive(id);
    setRun((n) => n + 1);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = audiences.length - 1;
    let next = -1;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      select(audiences[next].id);
      tabsRef.current[next]?.focus();
    }
  };

  const travel = listRef.current ? `${listRef.current.offsetHeight - 40}px` : "14rem";

  return (
    <div className="flow" data-changed={run > 0}>
      <p className="flow-question" id="flow-label">
        Kebutuhan Anda datang dari mana?
      </p>
      <div className="flow-tabs" role="tablist" aria-labelledby="flow-label">
        {audiences.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${a.id}`}
            aria-selected={a.id === active}
            aria-controls="flow-panel"
            tabIndex={a.id === active ? 0 : -1}
            className="flow-tab"
            onClick={() => select(a.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div id="flow-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`}>
        <div className="flow-track" key={`${current.id}-${run}`}>
          <span
            className="flow-pulse"
            aria-hidden="true"
            data-run={run > 0}
            style={{ ["--travel" as string]: travel }}
          />
          <ol className="flow-steps" ref={listRef}>
          {current.flow.map((step, i) => (
            <li className="flow-step" key={step.title}>
              <span className="flow-dot" aria-hidden="true">
                {i + 1}
              </span>
              <div className="flow-node">
                <strong>{step.title}</strong>
                <span>{step.detail}</span>
              </div>
            </li>
          ))}
          </ol>
        </div>
        <p className="flow-caption">
          <strong>{current.name}.</strong> {current.description}
        </p>
      </div>
    </div>
  );
}
