---
name: Lead CRM Pipeline
description: Consultation requests treated as CRM leads with pipeline statuses and admin notes history
type: feature
---
- Pipeline statuses stored in `public.consultation_requests.status` (text): `new`, `contacted`, `qualified`, `proposal_sent`, `closed_won`, `closed_lost`. Public INSERT policy still forces `status='new'` on submission.
- Status changeable inline from the lead row select OR from the detail dialog.
- Notes history in `public.consultation_notes` (FK to consultation_requests, ON DELETE CASCADE). Admin-only RLS via `has_role`. Authors can edit/delete only their own notes; all admins can read & insert.
- `author_id` (auth.users) + `author_email` snapshotted on insert so display survives user deletion.
- Note text validated 1–5000 chars in WITH CHECK.
- Pipeline summary cards: Total / Baru / Open Pipeline / Closed Won shown above table.
