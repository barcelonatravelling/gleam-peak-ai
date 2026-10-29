"use client";

import AssistantChat from "@/components/AssistantChat";
import FloatingButton from "@/components/FloatingButton";
import { useLang } from "./LangContext";

export default function Assistant() {
  const { lang } = useLang();
  return (
    <>
      <FloatingButton lang={lang} />
      <AssistantChat key={lang} bookingUrl={process.env.NEXT_PUBLIC_BOOKING_URL || "#"} lang={lang} />
    </>
  );
}
