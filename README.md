# Burn — Subscription Tracker

Local-first web app for recurring bills and subscriptions. No backend, no account. Data stays in the browser (`localStorage`) until you export a JSON backup.

Open `index.html` in any modern browser, or enable GitHub Pages on this repo (Settings → Pages → Deploy from branch `main` / root).

## What it does

- Add subscriptions with amount, billing interval (week / month / quarter / year), next due date, category, optional cancel-by / trial date, and notes
- Monthly burn and yearly equivalent (yearly ÷ 12, weekly × 52 ÷ 12, quarterly ÷ 3)
- Upcoming charges in the next 30 days
- Mark paid → advances next due by one cycle
- Pause without deleting
- Search, status filter, sort by due date / name / monthly cost
- Currency symbol (display only): HK$, $, £, €, ¥
- Export / import JSON

## Data model

```json
{
  "currency": "HK$",
  "items": [
    {
      "id": "uuid",
      "name": "Netflix",
      "amount": 98,
      "freq": "monthly",
      "nextDue": "2026-09-15",
      "category": "Entertainment",
      "cancelBy": "",
      "note": "",
      "paused": false,
      "createdAt": "2026-09-02T00:00:00.000Z"
    }
  ]
}
```

Storage key: `burn.subs.v1`.

## Refine next

Suggested work, in priority order:

1. Calendar / ICS export of due dates
2. Notification API reminders (needs permission + page to be open, or a later backend)
3. Multi-currency conversion instead of symbol-only
4. Split from one HTML file into `css/` + `js/` + tests
5. Optional sync (GitHub Gist, or a tiny backend)
6. Recurring “shared house” split field
7. Dark/light theme toggle
8. PWA manifest + service worker so it installs on phone

## License

MIT. See `LICENSE`.
