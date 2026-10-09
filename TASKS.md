# October 9: approved editorial redesign integration

Production base: 5692a92a968c6fb1796667c2e6f78de383ffb0f3, origin/main, verified against the current existing Netlify deployment. Local branch: codex/editorial-production-integration. This is a separate worktree; original dirty checkout and all unrelated work were preserved.

Shared source used: 53e6359e93442c4e36372cdb400c46f847e8b0fe in the sibling Content/shared project. The explicitly approved ivory/gold desktop/mobile direction supersedes historical styling instructions.

Implemented approved headline/subheading, native responsive homepage, review CTA and attribution, section navigation and keyboard focus, intro safeguards, current-production master wordmark, SEO routes/canonicals/structured data, and original workflow-review campaign. Public offer is Business Operations Review. Windows npm scripts now invoke Node entry points directly. Deployment staging explicitly includes all needed source imports, fonts, brand assets and photos; private files stay excluded.

Approved photos found in C:\Users\12505\Downloads and visually inspected, then copied without changing bytes:
- contractor-workbench.png from hf_20261007_015706_4d51ce92-30f1-4537-8952-4e3fd2bf78f7.png, SHA256 1C55F40D8F70BB4A5F57A25DB0BF418C63046D8C0F1B8EB0E6DE1048D1EA6AAB.
- hospitality-counter.png from hf_20261007_015730_28b28949-2e38-4e8c-bc9c-b136ea24df17.png, SHA256 659547F14B24229FA1739E81BA02FA026FB6B86C0B481E4F09F9D44AE9B47004.

Checks: production baseline 367 unit tests passed; integrated source 367 unit tests passed. Build includes TypeScript, Vite and public-page prerender. Six staging tests cover import/asset completeness, exact bytes, exclusion of private files, tampering, boundaries and missing sources. Eighteen distinct browser scenarios passed across targeted runs: mocked assessment/save/booking/inbox/audit, 28 public desktop/mobile page layouts/accessibility, 1440/768/390/320 native homepage, five UTMs, keyboard navigation, production trailing-slash canonicals, intro autoplay/skip/failure/reduced motion, and workflow homepage smoke. After adding photos, both native tests passed again with image loading assertions at all four widths. Fresh screenshots: output/redesign/qa/home-1440.png, home-768.png, home-390.png, home-320.png.

Protected production server, Netlify function/routing, intake schemas and assessment data contracts are unchanged. No live lead, email, campaign or appointment created. No screenshot-upload retry, credential change, merge, push or publication.

Remaining publication blocker: verified active replacement HighLevel location/calendar/form/widget ownership, 30-minute duration/timezone/availability, contact custom-field and opportunity mappings, tags and trigger review. Historical replacement location f1FqhGEvwZsmFiGCaGqK is unverified; parent connector checks return 401. Source still retains old enforced location/calendar pair. Grokbot is assigned external verification only. After verified data arrives, update validation/booking acknowledgement/environment mappings together, run isolated checks, and report to parent before any live test/publication.


## Replacement calendar migration checkpoint

Source calendar/location migrated to f1FqhGEvwZsmFiGCaGqK / XKr1JMqpBJtxUDzeXcUK. Both public booking URLs verified with all writes blocked. Removed confirmed cancelled-account diagnostic embed, preserving route and attribution into assessment. Build and 371 unit tests passed; five current mocked/native browser scenarios passed. No-show replay and old-account rejection covered. Deployment remains gated on replacement live server environment/token/timezone/webhook, field/pipeline mappings and separate review-form evidence. See ../booking-handoff-reconciliation.md for exact evidence and local screenshots. No push or publication.
Final current public-site browser suite: 7/7 passed after final rebuild, including desktop/mobile accessibility, diagnostic fallback, SEO, navigation and reduced motion.
