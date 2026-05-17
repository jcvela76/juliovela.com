"use client";

import { useEffect } from "react";

const sectionIds = ["intro", "about", "expertise", "services", "insights", "contact"];
const swipeThreshold = 44;
const animationLockMs = 760;

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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function MobileScrollSettler() {
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mobileQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    let touchStartY: number | undefined;
    let activeIndex = 0;
    let gestureLocked = false;
    let isAnimating = false;
    let unlockTimer: number | undefined;

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

    const syncActiveIndexFromScroll = () => {
      if (isAnimating) {
        return;
      }

      const headerOffset = getHeaderOffset();
      const viewportPoint = window.scrollY + headerOffset + 8;
      const stops = getSectionStops();

      stops.forEach((stop, index) => {
        if (stop.top <= viewportPoint) {
          activeIndex = index;
        }
      });
    };

    const unlockAnimation = () => {
      isAnimating = false;
      gestureLocked = false;
      syncActiveIndexFromScroll();
    };

    const navigateToIndex = (targetIndex: number) => {
      const stops = getSectionStops();
      const target = stops[targetIndex];

      if (!target || targetIndex === activeIndex) {
        return;
      }

      activeIndex = targetIndex;
      isAnimating = true;
      gestureLocked = true;

      if (unlockTimer) {
        window.clearTimeout(unlockTimer);
      }

      window.scrollTo({
        top: target.top,
        behavior: "smooth",
      });

      unlockTimer = window.setTimeout(unlockAnimation, animationLockMs);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (isAnimating) {
        return;
      }

      syncActiveIndexFromScroll();
      touchStartY = event.touches[0]?.clientY;
      gestureLocked = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === undefined || isAnimating) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      const delta = touchStartY - currentY;

      if (Math.abs(delta) < swipeThreshold) {
        return;
      }

      event.preventDefault();

      if (gestureLocked) {
        return;
      }

      const stops = getSectionStops();
      const direction = delta > 0 ? 1 : -1;
      const targetIndex = clamp(activeIndex + direction, 0, stops.length - 1);

      gestureLocked = true;
      navigateToIndex(targetIndex);
    };

    const handleTouchEnd = () => {
      touchStartY = undefined;
    };

    const handleScroll = () => {
      syncActiveIndexFromScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      if (unlockTimer) {
        window.clearTimeout(unlockTimer);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return null;
}
