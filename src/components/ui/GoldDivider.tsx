"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  length?: number;
  align?: "left" | "center";
}

export function GoldDivider({
  className,
  length = 50,
  align = "left",
}: GoldDividerProps) {
  return (
    <motion.span
      aria-hidden
      initial={{ width: 0 }}
      whileInView={{ width: length }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "block h-px bg-gold",
        align === "center" && "mx-auto",
        className,
      )}
    />
  );
}
