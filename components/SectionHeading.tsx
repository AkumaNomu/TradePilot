"use client";

import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <MotionStagger delayChildren={0.04} staggerChildren={0.1}>
        {eyebrow ? (
          <MotionItem>
            <div
              className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-md ${
                align === "center" ? "" : ""
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.85)]" />
              <span className="font-mono text-mono-sm uppercase tracking-[0.18em] text-secondary">
                {eyebrow}
              </span>
            </div>
          </MotionItem>
        ) : null}
        <MotionItem>
          <h2 className="font-headline text-headline-xl text-white">{title}</h2>
        </MotionItem>
        <MotionItem>
          <p className="mt-6 font-body text-body-lg leading-relaxed text-on-surface-variant">{description}</p>
        </MotionItem>
      </MotionStagger>
    </div>
  );
}
