# AI Video Prompt Wizard

A guided, browser-only form for building AI property-ad video prompts (Seedance 2.0 and similar tools), based on the 12-step brief method and 7-block master prompt system from the *AI Video Prompt Workshop* (8 July 2026).

**Live site:** enable GitHub Pages on this repo (Settings → Pages → Deploy from branch → `main` / root) to get a public URL.

## What it does

- **Phase A — Your Reusable Style.** Talent persona, camera/delivery rules, lifestyle-to-talk ratio, negative prompt. Save once to `localStorage`; every future project loads it automatically.
- **Phase B — This Project.** Goal, audience, objective, project facts, selling points, video length.
- **Framework advisor.** Suggests one of the 7 marketing frameworks (AIDA, PAS, FFAB, BAB, 4 P's, Hook-Story-Offer, PASTOR) based on your audience/objective text, with a one-click accept.
- **Trigger picker.** Pick 2–3 of the 6 psychological triggers (FOMO, Scarcity, Urgency, Social Proof, Authority, Anchoring) — the UI won't let you over-season.
- **Scene-timing skeleton.** Splits your target duration into framework-weighted stages and ~7-second shots, so ChatGPT gets exact time codes instead of guessing.
- **Readiness checklist.** Flags anything missing before you copy the prompt — the goal is to never burn a Seedance credit on an incomplete brief.
- **One assembled prompt**, copy-button ready, in the same 7-block format (Role / Project / Framework / Talent·Cam / Style / Negative / Output) taught in the workshop.

## How to use it

1. Fill in Phase A once, click **Save style as default**.
2. For each new property, fill in Phase B and pick a framework/triggers (or accept the suggestion).
3. Copy the assembled prompt into ChatGPT to get the actual scene-by-scene script.
4. Paste that into Seedance 2.0 (or your generator of choice).

Nothing here calls any AI API or leaves your browser — it's a static form that assembles text using rules from the workshop, not a generator itself.

## Tech

Plain HTML/CSS/JS, no build step, no dependencies. Deploys as-is to GitHub Pages.
