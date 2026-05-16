"use client";

import { useEffect } from "react";

const sectionIds = ["intro", "about", "expertise", "services", "insights", "contact"];

function getHeaderOffset() {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? Math.round(header.getBoundingClientRect().height) : 0;
}

function getTargetTop(section: HTMLElement, headerOffset: number) {
  if (section.id === "intro") {
    return 0;
  }

  return Math.max(0, section.offsetTop - headerOffset);
}

export default function MobileScrollSettler() {
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mobileQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    let ignoreScrollUntil = 0;
    let touchStartY: number | undefined;
    let touchStartScrollY: number | undefined;

    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

    const getSectionStops = () => {
      const headerOffset = getHeaderOffset();

      return getSections().map((section) => ({
        id: section.id,
        top: getTargetTop(section, headerOffset),
      }));
    };

    const getCurrentStopIndex = (stops: Array<{ id: string; top: number }>, scrollTop = window.scrollY) => {
      const viewportPoint = scrollTop + getHeaderOffset() + 8;
      let currentIndex = 0;

      stops.forEach((stop, index) => {
        if (stop.top <= viewportPoint) {
          currentIndex = index;
        }
      });

      return currentIndex;
    };

    const scrollToStop = (top: number) => {
      if (window.performance.now() < ignoreScrollUntil) {
        return;
      }

      if (Math.abs(window.scrollY - top) < 6) {
        return;
      }

      ignoreScrollUntil = window.performance.now() + 700;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY;
      touchStartScrollY = window.scrollY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const changedTouchY = event.changedTouches[0]?.clientY;

      if (touchStartY === undefined || touchStartScrollY === undefined || changedTouchY === undefined) {
        return;
      }

      const fingerDelta = touchStartY - changedTouchY;
      const scrollDelta = window.scrollY - touchStartScrollY;
      const movement = Math.abs(fingerDelta) > Math.abs(scrollDelta) ? fingerDelta : scrollDelta;

      touchStartY = undefined;
      touchStartScrollY = undefined;

      if (Math.abs(movement) < 40) {
        return;
      }

      const stops = getSectionStops();
      const currentIndex = getCurrentStopIndex(stops, touchStartScrollY);
      const direction = movement > 0 ? 1 : -1;
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), stops.length - 1);
      const target = stops[targetIndex];

      if (target) {
        scrollToStop(target.top);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}
