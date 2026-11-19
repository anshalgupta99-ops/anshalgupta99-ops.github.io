# Design notes

## Brief
- Subject: Anshal Gupta, full-stack software engineer (React, Elixir/Phoenix, PostgreSQL), Delhi NCR.
- Audience: recruiters and hiring managers who open the link from a resume or a job-platform profile.
- Job of the site: get him interviews for full-stack and React roles. Work code is private, so the site is the proof.
- Content: all facts come from his resume. No invented clients, awards or metrics. The 60% engagement claim is left out because it is unverified.

## Concept card
```
Idea:        One white-label template that re-skins itself per section, the way his platform serves every brand from one codebase.
Metaphor:    Tenant config. A domain resolves to a skin: ground, ink, accent and radius are tokens, nothing else changes.
Signature:   The hero. Four tenant skins cross-fade through registered CSS properties while a live config panel scrambles to the new values. It cycles by itself and stops the moment the visitor picks one.
Emotion:     Precise and engineered, with a bit of play. Reads as someone who thinks in systems.
Motion verb: "Apply". Things fill in from the left like a config being applied (accent wipes on buttons, chips and rows).
Screenshot:  The hero, name in two lines, config panel beside it, one skin mid-switch.
Anchor:      His real work: a white-label, multi-tenant platform with per-domain config.
```
Concepts considered and rejected: a reconciliation ledger (too close to a worked example in the skill), and a "many API shapes into one schema" pipeline (strong, but harder to carry through every section).

## System
- Palette (four tenants, generated from `src/data/site.ts`): slate `#0f1115` / `#ecebe6` / `#ff5a1f`, paper `#e7ebf0` / `#0b1b2b` / `#0b57d0`, forest `#0b2b26` / `#e8f3ec` / `#ffc93c`, signal `#dcdcd7` / `#111111` / `#c4001f`. Radius per skin: 0, 8, 16, 28 px.
- Type: Bricolage Grotesque Variable for display and body, JetBrains Mono Variable for labels and the config panel. Display tracking is negative and set per size.
- Grid: 12 columns, 1440 px max, fluid padding. Section layouts differ: hero (name plus panel), about (7/4 split), work (stats then index rows), stack (three-column groups), projects (8/4), contact (one oversized link).
- Motion: GSAP only, one clock (ticker). Lenis for smooth scroll. Transforms, opacity, clip-path and registered custom properties only.
- Idle state: the hero cycles skins every 4.2 s, the caret blinks, and the stack chips are scanned one by one while that section is on screen. All of it stops under reduced motion.
- Reduced motion: no smooth scroll, no loader, no scrub, no reveals. All content is visible and the skin buttons still work.

## Genericness test
A generic model would likely give a dark hero with a gradient blob and three feature cards. Changed: the concept comes from his actual platform, the hero is a working skin switcher, and sections use different layouts.
