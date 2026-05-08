"use client";

import { useHideTransitionOnMount } from "@/components/TransitionProvider";

export default function HideTransition() {
  useHideTransitionOnMount(420);
  return null;
}
