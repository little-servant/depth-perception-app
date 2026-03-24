"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { TabNav } from "@/components/ui/TabNav";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="panel-surface sticky top-4 z-20 rounded-[32px] px-5 py-4 sm:px-6 sm:py-5"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/explore" className="flex items-center gap-4">
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,170,0.36),rgba(10,10,15,0.24))]">
            <span className="absolute inset-[10px] rounded-[14px] border border-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(0,212,170,0.8)]" />
          </span>

          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-text-secondary">
              Depth Perception Lab
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                Depth Lab
              </h1>
              <p className="text-sm text-text-secondary">깊이를 해부하다</p>
            </div>
          </div>
        </Link>

        <TabNav />
      </div>
    </motion.header>
  );
}
