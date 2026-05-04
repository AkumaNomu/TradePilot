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
            <p className="mb-4 font-headline text-label-md uppercase tracking-[0.22em] text-secondary">
              {eyebrow}
            </p>
          </MotionItem>
        ) : null}
        <MotionItem>
          <h2 className="font-headline text-headline-lg text-white">{title}</h2>
        </MotionItem>
        <MotionItem>
          <p className="mt-5 text-body-lg text-on-surface-variant">{description}</p>
        </MotionItem>
      </MotionStagger>
    </div>
  );
}
