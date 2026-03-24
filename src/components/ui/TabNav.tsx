"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";

import type { TabId } from "@/types";

const tabs: Array<{
  id: TabId;
  href: `/${TabId}`;
  label: string;
  labelKo: string;
}> = [
  { id: "explore", href: "/explore", label: "EXPLORE", labelKo: "탐색" },
  { id: "test", href: "/test", label: "TEST", labelKo: "테스트" },
];

const spring = {
  type: "spring",
  stiffness: 420,
  damping: 32,
} as const;

export function TabNav() {
  const segment = useSelectedLayoutSegment();
  const activeTab: TabId = segment === "test" ? "test" : "explore";

  return (
    <LayoutGroup id="depth-lab-tabs">
      <nav
        aria-label="Primary tabs"
        className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className="relative isolate min-w-[160px] overflow-hidden rounded-[24px] border border-white/10 px-4 py-3"
            >
              {active ? (
                <motion.span
                  layoutId="active-depth-tab"
                  transition={spring}
                  className="absolute inset-0 rounded-[23px] bg-accent-primary shadow-[0_18px_38px_rgba(0,212,170,0.28)]"
                />
              ) : null}

              <span className="relative flex items-center justify-between gap-4">
                <span>
                  <span
                    className={`block text-[11px] font-semibold tracking-[0.3em] ${
                      active ? "text-[#052017]" : "text-text-secondary"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`mt-1 block text-sm font-medium ${
                      active ? "text-[#052017]" : "text-text-primary"
                    }`}
                  >
                    {tab.labelKo}
                  </span>
                </span>
                <motion.span
                  layout
                  transition={spring}
                  className={`text-lg leading-none ${
                    active ? "text-[#052017]" : "text-text-secondary"
                  }`}
                >
                  {tab.id === "explore" ? "01" : "02"}
                </motion.span>
              </span>
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
