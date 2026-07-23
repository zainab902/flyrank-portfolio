# FE-05: Accessible Component Notes

## Overview
Comparing pure React + ARIA implementations of Modal Dialog, Tabs, and Disclosure against Radix UI / `shadcn/ui` source implementations.

---

## Concrete Gaps Handled by shadcn/ui / Radix UI

### 1. Scroll Locking & Portal Management (Modal Dialog)
* **Custom Gap:** Our custom modal handles focus trapping via keyboard listeners, but background body content remains scrollable behind the backdrop when open.
* **shadcn Solution:** `shadcn/ui` (via Radix Dialog) renders through `@radix-ui/react-portal` outside the main DOM tree and automatically appends `data-scroll-locked` to `document.body`, preventing background scrolling and layout shifts.

### 2. Screen Reader Portal Announcements & Inert Attributes
* **Custom Gap:** Screen readers can still navigate outside the modal container if elements aren't visually hidden or marked inert.
* **shadcn Solution:** Radix automatically applies `aria-hidden="true"` or `aria-controls` to siblings outside the dialog subtree when active, ensuring screen reader virtual focus remains strictly contained inside the modal.

### 3. Dynamic Keyboard Focus Trap Edge Cases
* **Custom Gap:** If child elements inside our modal are dynamically unmounted or loaded asynchronously, the hardcoded query selector array for focus trapping can desynchronize.
* **shadcn Solution:** Radix uses FocusScope primitives with dynamic MutationObservers to update focusable node lists in real time.