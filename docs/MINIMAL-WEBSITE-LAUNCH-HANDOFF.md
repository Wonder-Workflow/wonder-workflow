# Minimal website launch handoff — read-only diagnosis

This supersedes the broad gate list in booking-handoff-reconciliation.md. The goal is the existing website launch, not rebuilding GHL workflows. No production setting or credential was changed.

## Verified now without Vex

- Existing site b5ad4440-c287-4446-9b46-fb7226035d54 / ai-operations-assessment / wonderworkflow.com. Current deploy remains 6ab33c3871289d0008bdd477, main SHA5692a92a968c6fb1796667c2e6f78de383ffb0f3. Build metadata confirms hopattic-afk/wonder-workflow, main, npm run build, dist and bridge function routes.
- Existing Netlify CLI authorization permits read-only site/environment inspection. Filtered evidence saved in launch-env-metadata.json outside the repo; only non-secret values and secret presence/length checks were emitted. This resolves the previous tool-catalog limitation.
- Production AND deploy-preview/branch-deploy still use GHL_LOCATION_ID=sNxq4o3kG3iH5yoQ71Oq and GHL_CALENDAR_ID=tFmtpPmm23VC7ygrKxvK (cancelled account). GHL_CALENDAR_TIMEZONE=America/Edmonton is the old saved setting, not verification of the replacement account. WW_BRIDGE_ENABLED=true and WW_APP_ORIGIN=https://wonderworkflow.com.
- Production GHL_PRIVATE_INTEGRATION_TOKEN is present but direct read-only GETs for the replacement calendar and location both return HTTP401. No response body or token was printed. This is fresh proof the configured token cannot presently verify replacement resources.
- Existing WW_INBOX_ACCESS_KEY, WW_SESSION_SECRET and WW_BOOKING_WEBHOOK_SECRET are present. No need to regenerate or disclose them. Existing legacy MCCANN fallbacks are not a reason to rebuild access.
- Live GET /api/integration-status returns assessment/booking/inbox/accepting=true, crm_sync=false, syncEnabled=false, fieldsVerified=false, both snapshot-field-present=false, tagConfigurationSafe=true, public_research=false. The true booleans only prove current old-identity config parses and storage can be read; they do not probe GHL authorization or replacement identity.
- Replacement canonical and short calendar URLs already passed HTTP200 / supplied location, calendar and booking-form identifiers, with all non-GET/HEAD requests blocked. Prior parent Vex booking/tag/booked/showed/owner-email evidence remains separate from these read-only checks.
- Code/build/type check, 371 unit tests and 12 current browser scenarios already passed. Existing photos and approved desktop/mobile design are installed. No independent implementation work remains for the redesign. Original dirty checkout is preserved; latest code commit8e3abad and handoff commit54b3ef5, branch codex/editorial-production-integration. No push/deploy.

## Actual active path and minimum launch requirements

Every homepage review CTA goes to /assessment. src/main.tsx mounts LegacyAssessment, which GETs status and POSTs /api/assessment before rendering the calendar. Server freezes the full seven-answer/contact/consent/attribution snapshot in existing strongly consistent Netlify Blobs, performs exact email/optional-phone contact search, email-only upsert when needed, canonical contact readback, then writes verified receipt/index. Only a matching saved acknowledgment and fixed new booking URL reveal the calendar. All answers and context are retained even with CRM sync off; name/business/answers are not written into GHL custom fields on this base path. GHL email-only contact creation can trigger external Contact Created automations, so its existing workflow effects need confirmation.

Required production environment correction before deploying migrated source:
1. GHL_LOCATION_ID=f1FqhGEvwZsmFiGCaGqK.
2. GHL_CALENDAR_ID=XKr1JMqpBJtxUDzeXcUK.
3. GHL_CALENDAR_TIMEZONE=<verified replacement account/calendar IANA value>; verify calendar override or inherited location/user setting. Do not infer from visitor display or UTC offset.
4. GHL_PRIVATE_INTEGRATION_TOKEN=<existing authorized replacement-subaccount integration credential>. It must permit exact contacts search/read and email upsert, plus canonical appointment read for reconciliation. Current configured token fails401. No need for opportunity-write, email-send, workflow-management or custom-field-write permission for this base path.
5. Keep WW_BRIDGE_ENABLED=true, WW_APP_ORIGIN=https://wonderworkflow.com, existing inbox/session/webhook secrets and durable store. Keep WW_CRM_SYNC_ENABLED=false and WW_CRM_ASSESSMENT_TAG_ENABLED=false; research remains false. No new access is needed.

Apply equivalent replacements to any preview/branch context actually used for a working integration preview; the production origin policy prevents arbitrary preview-origin submissions, so a static preview is sufficient until a separately authorized integration test setup is selected. Do not enable uncontrolled preview lead writes.

Booking reconciliation is required to preserve the authorized internal inbox/audit behavior, but a missing webhook does not prevent the customer calendar itself booking. Vex should confirm the replacement account's published bridge workflow (ID/link, not a secret): exact replacement-calendar filter, Appointment Status normal/contact enrollment, no narrow status filter that loses cancellation/showed/no-show, re-entry enabled, and existing lifecycle/time-change handling. Action POST https://wonderworkflow.com/api/booking, application/json, X-WW-Webhook-Secret matching the EXISTING Netlify WW_BOOKING_WEBHOOK_SECRET, exactly these body keys:

    appointment_id: {{appointment.id}}
    contact_id: {{contact.id}}
    location_id: f1FqhGEvwZsmFiGCaGqK
    calendar_id: XKr1JMqpBJtxUDzeXcUK

No status, answers or personal details in this envelope; server reads canonical appointment/contact and associates its own durable assessment. A saved workflow-config view without secret and an existing delivery log for this endpoint can verify the setup without a new test booking. Any new live submission/replay requires parent approval. Vex's booking owner email and Call booked/showed stages do not by themselves prove this separate bridge action ran.

## Exact minimal NON-SECRET Vex reply

- Confirm replacement location/calendar/form already supplied; provide the effective calendar IANA timezone and whether inherited or overridden.
- Confirm an already authorized replacement private integration exists and its current granted contact search/read/upsert + appointment-read capabilities. Put the credential directly into the EXISTING site's Netlify environment-variable UI through the owner/authorized operator; reply only that GHL_PRIVATE_INTEGRATION_TOKEN is configured in production, not its value. Owner/operator must authorize any necessary replacement credential update. Do not paste tokens here, into the repository, a PR, Slack or logs. Do not create broader/new permanent access just to launch.
- Confirm the existing replacement bridge workflow ID/link, published state, filters/re-entry, exact destination/body and existing secret-match confirmation, plus any existing successful delivery evidence. Do not disclose the secret.
- Confirm email-only contact upsert for website assessment does not enroll unintended campaigns or send unapproved customer mail. The website assessment-completed tag is OFF and not required.

Owner/authorized secure setup route: open https://app.netlify.com/projects/ai-operations-assessment → Project configuration → Environment variables; edit only the scoped existing site values for the needed contexts. Secrets remain in the platform's protected UI. Vex can provide non-secret metadata if not authorized to access Netlify; the owner performs the setup. No secret rotation or setting mutation is performed by this agent.

## NOT website launch gates

- The 17 WW_GHL_FIELD_* entries in .env.example are NOT read anywhere by executable src/server/function code. No seven-answer GHL field mapping is required for durable website capture. They are historical template placeholders, not active dependencies.
- Optional snapshot synchronization uses ONLY WW_CRM_FIRST_ASSESSMENT_FIELD_ID and WW_CRM_LATEST_ASSESSMENT_FIELD_ID: distinct dedicated multiline contact fields in the replacement location, WW_CRM_FIELDS_VERIFIED=true and WW_CRM_SYNC_ENABLED=true after explicit field/readback approval. Leave OFF for launch. Optional ww-assessment-completed tagging also requires WW_CRM_ASSESSMENT_TAG_ENABLED=true plus WW_CRM_TAG_WORKFLOWS_REVIEWED=true after reviewing that tag's enrollments; leave OFF.
- No pipeline/stage IDs are used by the active website bridge. assessOpportunitySync is an uncalled pure planner (only tests reference it), executes no writes and has historical IDs. No replacement pipeline mapping is required for launch. Book-a-call tag/Call booked/Call showed and no-show opportunity-stage workflows are GHL-owned optional operations; preserve them, but do not rebuild them for the redesign.
- The two separate review forms are not loaded by any active site path. /request-diagnostic/ now leads to the same assessment with query attribution and does not embed the cancelled form. No review-form URLs, IDs, field maps or trigger setup are required to launch this path. If later restored, separately supply exact replacement form URL/ID/location, submitted fields and desired workflow enrollment evidence; booking form f8pq4XeGu32OocBwz7ha is not a substitute.
- Live no-show stage/email automation, Google Calendar connection, customer reminder/confirmation wording, domain/reply-to repair and deleting fake test contacts are separate operations. Mock no-show packet reconciliation passes and is retained; no real no-show or customer message test is required for the visual website release.
- Production chat widget6aad8507aaad87c6c4b513a1 is unchanged secondary functionality, not a dependency of assessment/booking. Its ownership remains unknown; do not make this an invented prerequisite to verifying the primary path.

## Publication decision

The concrete blocker is now established, not generic: all relevant Netlify contexts still point at the cancelled account and the production GHL credential returns401. The current public readiness boolean is misleading as a replacement-account proof. Once the minimal settings/authorization and bridge workflow evidence above are confirmed securely, run bounded read-only replacement API checks and readConfig validation, then parent-approved controlled end-to-end verification/publication. Do not publish the migrated code against the presently verified old environment. No credentials or settings were changed during this diagnosis.
