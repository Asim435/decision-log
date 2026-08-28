let id = 0
const next = () => (id += 1)

export const statuses = ['active', 'superseded', 'reversed']

export const seedDecisions = [
  {
    id: next(),
    title: 'Move billing to usage-based pricing',
    why: 'Flat-fee plans were pushing power users to churn once they hit the seat cap, while light users felt they were overpaying. Usage-based pricing lets revenue track actual value delivered and removes the awkward upsell conversation at the seat limit.',
    date: '2026-06-02',
    status: 'active',
    owner: 'Priya N.',
  },
  {
    id: next(),
    title: 'Deprecate the v1 public API',
    why: 'v1 has no rate limiting and forces us to keep a mongo shard alive just for three enterprise customers. We are giving everyone a 6-month migration window to v2 before shutting the endpoints off.',
    date: '2026-05-14',
    status: 'active',
    owner: 'Marcus D.',
  },
  {
    id: next(),
    title: 'Rewrite onboarding in-house instead of buying a checklist tool',
    why: 'Evaluated Userflow and Appcues for two weeks. Both cost more per year than the two days it took an engineer to build a lighter version tailored to our actual funnel, and we keep full control of the data.',
    date: '2026-04-29',
    status: 'active',
    owner: 'Sana K.',
  },
  {
    id: next(),
    title: 'Pause expansion into the EU market',
    why: 'GDPR data residency work would have taken a full quarter from the platform team, right when the US pipeline was our biggest growth lever. Revisit once ARR crosses $2M.',
    date: '2026-03-11',
    status: 'reversed',
    owner: 'Priya N.',
  },
  {
    id: next(),
    title: 'Adopt Postgres over DynamoDB for the core ledger',
    why: 'The team already knows SQL, and our access patterns are relational, not key-value. DynamoDB would have saved on ops early on but cost us in query flexibility for reporting later.',
    date: '2026-02-20',
    status: 'active',
    owner: 'Marcus D.',
  },
  {
    id: next(),
    title: 'Use a single shared Slack channel for support instead of a ticketing tool',
    why: 'Worked fine under 20 customers. Response times slipped once we crossed 60 and nothing was tracked. Replaced by Linear-based intake in April.',
    date: '2025-12-08',
    status: 'superseded',
    owner: 'Sana K.',
  },
]
