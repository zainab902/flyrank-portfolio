'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

// ==========================================
// 1. MODAL DIALOG COMPONENT
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AccessibleModal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus modal container on open
      setTimeout(() => modalRef.current?.focus(), 50);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap & Escape key handler
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab' && modalRef.current) {
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg bg-slate-900 p-6 border border-slate-800 text-slate-100 shadow-xl focus:outline-none"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 id="modal-title" className="text-xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-1 text-slate-400 hover:text-white focus:ring-2 focus:ring-emerald-500"
          >
            ✕
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}

// ==========================================
// 2. TABS COMPONENT
// ==========================================
interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

export function AccessibleTabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="w-full max-w-md">
      <div role="tablist" aria-label="Accessible Tabs" className="flex border-b border-slate-800">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={activeIndex === idx}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeIndex === idx ? 0 : -1}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              activeIndex === idx
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, idx) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIndex !== idx}
          tabIndex={0}
          className="p-4 bg-slate-900/50 rounded-b text-slate-300 focus:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. DISCLOSURE (ACCORDION) COMPONENT
// ==========================================
interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export function AccessibleDisclosure({ title, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-md border border-slate-800 rounded-lg overflow-hidden my-2">
      <h3>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls="disclosure-panel"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center p-4 bg-slate-900 text-left font-medium text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <span>{title}</span>
          <span className="text-slate-400">{isExpanded ? '−' : '+'}</span>
        </button>
      </h3>
      <div
        id="disclosure-panel"
        hidden={!isExpanded}
        className="p-4 bg-slate-950 text-slate-300 border-t border-slate-800"
      >
        {children}
      </div>
    </div>
  );
}