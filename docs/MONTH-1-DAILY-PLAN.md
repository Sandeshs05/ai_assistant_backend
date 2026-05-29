# School CRM — Month 1 Daily Plan (Build From Zero)

Reference guide for learning while building. Follow one day at a time — do not skip verification gates.

**Approach:** Concept → Architecture → Request flow → Build (you) → Verify → Reflect

**Daily rhythm (~2.5–3 hours):**

| Block | Time |
|-------|------|
| Concept + architecture | 45–60 min |
| Implementation | 60–90 min |
| Verify + notes | 30 min |

**Daily log:** Track progress in [`docs/daily-log.md`](./daily-log.md)

**Timeline:** Week 0 (3–4 days refresher) → Week 1–4 (28 build days) ≈ **31–32 days total**

**Week 0 rule:** Hands-on exercises in **`week-0-practice/` inside the backend repo** (Node scripts). Ask your mentor for help **one exercise at a time**.

---

## Repository layout — two separate Git repos

School CRM uses **two independent repositories**. They version, deploy, and scale separately — standard SaaS pattern (not a monorepo).

You may clone both into one parent folder on your machine for convenience; that folder is **not** a third repo.

```
~/school-crm/                          ← optional local folder (not a git repo)
├── school-crm-backend/                ← Git repo #1 (NestJS + Prisma + Postgres)
└── school-crm-frontend/               ← Git repo #2 (Next.js)
```

> **Your workspace today:** folders may be named `ai_assistant_backend/` and `ai_assistant_frontend/`. Same structure applies; rename to `school-crm-*` when you create fresh repos.

### Backend repo (`school-crm-backend/`)

```
school-crm-backend/
├── docs/
│   ├── MONTH-1-DAILY-PLAN.md      # Full curriculum (keep in sync with frontend copy)
│   ├── daily-log.md               # Log backend / Week 0 days here
│   └── README.md
├── week-0-practice/               # Week 0 Node exercises
├── docker-compose.yml             # Local PostgreSQL (owned by backend)
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── generated/prisma/              # Prisma client (generated)
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── auth/
│   ├── config/
│   ├── common/
│   ├── decorators/
│   ├── guards/
│   ├── prisma/
│   └── modules/                   # users, schools, students, teachers, parents, dashboard
├── .env.example
├── .gitignore
└── README.md
```

### Frontend repo (`school-crm-frontend/`)

```
school-crm-frontend/
├── docs/
│   ├── MONTH-1-DAILY-PLAN.md      # Same plan (keep in sync)
│   ├── daily-log.md               # Log frontend days here
│   └── README.md
├── app/                           # Routes: /login, /dashboard, /students, …
├── components/
│   └── ui/                        # ShadCN primitives
├── modules/                       # Feature UI: layout, auth, shared
├── services/                      # API calls per domain
├── hooks/                         # e.g. useAuth
├── types/                         # TS interfaces matching API
├── lib/                           # api client, auth storage
├── .env.local.example
├── .gitignore
└── README.md
```

### How the two repos connect

| Concern | Backend repo | Frontend repo |
|---------|--------------|---------------|
| Git remote | Its own URL | Its own URL |
| Dev port | `3001` | `3000` |
| Env file | `.env` — `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` | `.env.local` — `NEXT_PUBLIC_API_URL` |
| Database | `docker-compose.yml` lives here | — |
| CORS | Allows frontend origin | Calls backend base URL |

### Local dev — three terminals

```bash
# Terminal 1 — Postgres (from backend repo)
cd school-crm-backend && docker compose up -d

# Terminal 2 — API
cd school-crm-backend && npm run start:dev

# Terminal 3 — UI
cd school-crm-frontend && npm run dev
```

**Docs rule:** Learning plan lives in **`docs/` inside each repo**. Update both copies when the plan changes, or treat backend `docs/` as source and copy to frontend.

---

## Month 1 overview

| Week | Theme | End-of-week deliverable |
|------|--------|-------------------------|
| **0** | Skills refresher | Node/Git/async/TS/DB concepts — ready to build |
| **1** | Foundation | Structured apps + DB + health-check connection |
| **2** | Auth + RBAC | Login, JWT, protected routes, role guards |
| **3** | CRUD + relations | Schools, Students, Teachers, Parents APIs |
| **4** | Dashboard UI | Shell, sidebar, tables, responsive layout |

**Stack:** Next.js 15 · NestJS · PostgreSQL · Prisma · JWT · ShadCN

**Roles:** SUPER_ADMIN · SCHOOL_ADMIN · TEACHER · STUDENT · PARENT

**Not in Month 1:** AI, mobile, payments, notifications, attendance, analytics

---

## Architecture mental model

```
Browser
  ↓ HTTP
Next.js (:3000) — routing, auth state, API calls
  ↓ HTTP + JWT
NestJS (:3001) — validation, guards, business logic
  ↓ Prisma
PostgreSQL (:5432) — source of truth
```

**Backend folders** (under `school-crm-backend/src/`):

| Folder | Responsibility |
|--------|----------------|
| `auth/` | Login, JWT issuance |
| `guards/` | JwtAuthGuard, RolesGuard |
| `decorators/` | `@Roles()`, `@CurrentUser()` |
| `modules/` | Domain features (students, schools, …) |
| `prisma/` | DB connection |
| `common/` | Enums, shared types |
| `config/` | Environment config |

**Frontend folders** (under `school-crm-frontend/`):

| Folder | Responsibility |
|--------|----------------|
| `app/` | Routes (URLs) |
| `components/ui/` | Reusable ShadCN primitives |
| `modules/` | Feature-specific UI (sidebar, login) |
| `services/` | API calls — pages never call `fetch` directly |
| `hooks/` | Shared client state (auth) |
| `lib/` | API client, token storage |
| `types/` | TypeScript contracts |

**Database pattern — Identity + Profile:**

- `User` = who logs in (email, password, role)
- `Teacher` / `Student` / `Parent` = role-specific data
- `School` = tenant; `schoolId` scopes non–super-admin users

**RBAC layers:**

1. `JwtAuthGuard` — logged in?
2. `@Roles()` + `RolesGuard` — correct role?
3. Service layer — correct school's data?

---

# WEEK 0 — Skills refresher (Prep Days 1–4)

**Goal:** Refresh fundamentals so Week 1 is about **building**, not fighting syntax.

**Time:** ~2–3 hours per prep day (half a week). Optional **Prep Day 5** = catch-up only.

**Where to practice:** `school-crm-backend/week-0-practice/` (inside backend repo — Week 0 is mostly Node/Git).

**How to work with your mentor:** Say *"I'm on Week 0 Prep Day X, exercise Y"* — implement yourself, ask when stuck.

**Gate to Week 1:** Pass the [Week 0 exit checklist](#week-0-exit-checklist) below.

**Progress tracker:** [LEARNING-TRACKER.md](./LEARNING-TRACKER.md)

**Codecademy ([Full-Stack Engineer path](https://www.codecademy.com/learn/paths/full-stack-engineer-career-path))** — use alongside local practice:

| Prep day | Codecademy units |
|----------|------------------|
| **1** | Overview of Web Development · Developing Websites Locally · Git and GitHub Part I |
| **2** | JavaScript Syntax Part I · JavaScript Syntax Part II |
| **3** | Async JavaScript and HTTP Requests |
| **4** | Database Basics · Designing Relational Databases |
| **5** | Catch-up only — revisit weak units |

Daily rhythm: **Codecademy (learn) → `week-0-practice/` (build) → daily-log (reflect)**

---

### Prep Day 1 — Environment + Git + Terminal

**Concept:** Every full-stack dev lives in the terminal. Git = save points.

**Skills:** Node.js setup · Terminal basics · Git basics

**Hands-on:**

1. Install **Node.js LTS** — verify `node -v` and `npm -v`
2. Create **backend repo** folder, `git init`, add `docs/` and `week-0-practice/`
3. Practice commands (run each, understand output):
   - `pwd`, `cd`, `ls`, `mkdir`, `touch`
   - `git status`, `git add`, `git commit`, `git log`
4. Create `week-0-practice/hello.js`:
   ```javascript
   console.log("School CRM — Week 0");
   ```
   Run: `node hello.js`

**Verify:**

- [x] Node and npm versions print without errors
- [x] Git repo exists with at least 1 commit
- [x] You can explain what `git add` vs `git commit` does

**Status:** ✅ Completed 2026-05-29 (see [daily-log.md](./daily-log.md))

**Learn:** What Node.js is (runtime) vs npm (package manager).

**Stretch:** Create a `main` branch; understand branch = parallel timeline.

---

### Prep Day 2 — JavaScript refresh

**Concept:** Modern JS patterns appear in every NestJS and Next.js file.

**Skills:** JavaScript basics (functions, objects, arrays, ES6+)

**Hands-on:** Create `week-0-practice/day2/` with small scripts you run via `node`.

**Exercise 1 — Functions & objects**

```javascript
// user.js — model a school admin
const user = { id: "1", firstName: "Ada", lastName: "Lovelace", role: "SCHOOL_ADMIN" };
function fullName(u) {
  return `${u.firstName} ${u.lastName}`;
}
```

**Exercise 2 — Arrays + `map` / `filter`**

```javascript
const roles = ["SUPER_ADMIN", "TEACHER", "STUDENT"];
const upper = roles.map((r) => r.toLowerCase());
const admins = roles.filter((r) => r.includes("ADMIN"));
```

**Exercise 3 — Destructuring & spread**

```javascript
const { firstName, role } = user;
const updated = { ...user, role: "TEACHER" };
```

**Verify:**

- [ ] All three scripts run with `node`
- [ ] You can explain `map` vs `filter` in one sentence each
- [ ] You can predict output before running (QA habit)

**Learn:** Immutability — why `...spread` instead of mutating objects.

**Mentor prompt:** *"Review my day2 exercises and quiz me on destructuring."*

---

### Prep Day 3 — Async/await + fetch (MOST IMPORTANT)

**Concept:** APIs, databases, and login are **async**. The server doesn't respond instantly.

**Skills:** Async/await · Promises · HTTP with fetch

**Mental model:**

```
sync code:   step 1 → step 2 → step 3
async code:  step 1 → wait for network → step 3
```

**Hands-on:** Create `week-0-practice/day3/async-demo.js`

**Exercise 1 — Promises vs async/await**

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
  console.log("start");
  await wait(1000);
  console.log("after 1 second");
}
demo();
```

**Exercise 2 — fetch a public API (no auth)**

```javascript
async function getPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}
```

**Exercise 3 — trace login pseudocode (on paper, then in comments)**

```
1. User clicks Login
2. await POST /auth/login
3. await store token
4. redirect to /dashboard
```

Mark which lines block/wait.

**Verify:**

- [ ] You can explain why forgetting `await` causes bugs
- [ ] fetch exercise returns JSON with `title` field
- [ ] You can draw sync vs async on paper

**Common bugs to understand:**

- `fetch()` without `await` → Promise object, not data
- Missing `try/catch` → unhandled rejection

**Mentor prompt:** *"Here's my fetch script — why does line X fail?"*

---

### Prep Day 4 — TypeScript reading + database concepts

**Concept:** TypeScript = contracts. Database = source of truth with relations.

**Skills:** TypeScript basics · Database basics (tables, PK, FK)

**Hands-on Part A — TypeScript:** Create `week-0-practice/day4/types.ts`

Run with: `npx ts-node day4/types.ts` (or compile with `tsc` — install locally in practice folder if needed).

```typescript
interface Role {
  id: string;
  name: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
}

interface User {
  id: string;
  email: string;
  roleId: string;
  schoolId?: string | null; // optional; null for SUPER_ADMIN
}

function describeUser(user: User, role: Role): string {
  return `${user.email} (${role.name})`;
}
```

**Understand:**

- `interface` = shape of an object
- `?` = optional field
- `string | null` = string or empty
- Union types for role names

**Hands-on Part B — Database (paper / Excalidraw):**

Draw ER diagram:

```
Role 1 ── * User
School 1 ── * User (optional FK)
```

Label PK and FK on each table.

**Exercise:** List 5 fields that belong on `Student`, not on `User`.

**Verify:**

- [ ] TypeScript file compiles or runs without errors
- [ ] ER diagram drawn from memory once
- [ ] You can explain FK in one sentence: *"FK ensures the row points to a real parent row."*

**Learn:** Normalization — avoid one giant table with 50 nullable columns.

**Mentor prompt:** *"Check my ER diagram — what's wrong with storing role name only as a string on User?"*

---

### Prep Day 5 — Optional catch-up

Use only if Prep Days 1–4 aren't solid. **Do not add new topics.**

- Re-run failed exercises
- Redo async day if fuzzy
- Complete Week 0 exit checklist
- Write `docs/week-0-summary.md` in **backend repo** (half page, your words)

---

### Week 0 exit checklist

Before **Week 1 Day 1**, you must be able to:

| # | Skill | Self-test |
|---|--------|-----------|
| 1 | Terminal | Navigate folders and run `node script.js` |
| 2 | Git | Make a commit and read `git log` |
| 3 | JS | Use `map`, destructuring, spread correctly |
| 4 | Async | Explain `await` and use `fetch` + `json()` |
| 5 | TS | Read interfaces and optional/null types |
| 6 | DB | Draw Role ↔ User ↔ School with FK arrows |

**Optional quick quiz (answer without notes):**

1. What port will Postgres use in our project? (5432)
2. What does `npm install` do?
3. Why is async critical for login API calls?

**When all pass → start Week 1 Day 1.**

---

# WEEK 1 — Foundation (Days 1–7)

**Goal:** Two **separate git repos** exist, Postgres runs in backend repo, Prisma connects, frontend can call backend health check.

### Day 1 — Vision + two-repo structure

**Concept:** SaaS product = **frontend repo + backend repo + database** (not one mixed folder).

**Build — backend repo:**

- Create `school-crm-backend/` (empty NestJS later)
- `README.md`, `.gitignore`, `.env.example`, `docs/daily-log.md`
- `git init` + first commit

**Build — frontend repo:**

- Create `school-crm-frontend/` (empty Next.js later)
- Same: README, `.gitignore`, `docs/daily-log.md`
- Separate `git init` + first commit

**Optional:** Parent folder `~/school-crm/` containing both clones (not a git repo).

**Verify:**

- [ ] Two separate `git log` histories
- [ ] Each repo has its own `docs/` folder
- [ ] You can draw two boxes: Frontend repo → Backend repo → DB

**Learn:** Why teams split repos (deploy cadence, team ownership, CI pipelines).

**Question:** Why is Postgres/docker in the **backend** repo, not frontend?

**Which repo today?** Both — structure only, minimal code.

---

### Day 2 — PostgreSQL + data model on paper

**Concept:** Schema before code. Database belongs to backend.

**Build (backend repo):**

- Add `docker-compose.yml` at backend root
- Start Postgres: `docker compose up -d`
- ER diagram on paper: `Role`, `User`, `School` only

**Verify:** Database `school_crm` exists; `DATABASE_URL` in backend `.env.example`.

**Learn:** 1:N, optional FK, normalization.

**Which repo today?** Backend only (+ paper diagram).

---

### Day 3 — NestJS bootstrap

**Concept:** Request lifecycle: `main.ts` → `AppModule` → `Controller`.

**Build (backend repo):**

- `nest new` or scaffold inside backend repo root
- `GET /api/v1/health` → `{ status: "ok" }`
- Global prefix `api/v1`, CORS for `http://localhost:3000`

**Verify (from any terminal):**

```bash
curl http://localhost:3001/api/v1/health
```

**Which repo today?** Backend only.

---

### Day 4 — Prisma + first migration

**Concept:** Prisma schema = TypeScript ↔ Postgres contract.

**Build (backend repo):**

- `prisma/` at backend root
- Schema: `Role`, `User`, `School`
- First migration + seed (5 roles + 1 SUPER_ADMIN)

**Verify:** `npx prisma studio` — see roles and users.

**Which repo today?** Backend only.

---

### Day 5 — Next.js bootstrap

**Concept:** App Router — folders under `app/` are URLs.

**Build (frontend repo):**

- `create-next-app` at frontend repo root
- Folders: `app/`, `components/`, `modules/`, `services/`, `hooks/`, `types/`, `lib/`
- Page: `/` only; ShadCN init + Button

**Verify:** `npm run dev` → home loads on `:3000`.

**Which repo today?** Frontend only.

---

### Day 6 — Cross-repo wire-up (health check)

**Concept:** Frontend repo calls backend repo over HTTP — no shared code, only env URL.

**Build (frontend repo):**

- `.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- `lib/api.ts`, `services/health.service.ts`
- Home page shows live API status

**Build (backend repo):**

- Confirm CORS allows frontend origin

**Request flow:**

```
frontend repo: page → service → lib/api
        ↓ HTTP
backend repo: /api/v1/health → JSON
```

**Verify:** Both repos running; UI shows "API status: ok".

**Which repo today?** Both — first integration day.

---

### Day 7 — Week 1 review

**Build:**

- `docs/week-1-architecture.md` in **both repos** (backend copy: API+DB focus; frontend copy: UI+API client focus)
- Or one shared doc duplicated in both

**Week 1 quiz:**

1. What runs on port 3000 vs 3001 vs 5432?
2. Where does business logic live in NestJS?
3. Why is `Role` a separate table?
4. What command applies a schema change to the DB?

**Gate to Week 2:** All four answered + health check works end-to-end.

---

# WEEK 2 — Auth + RBAC (Days 8–14)

**Goal:** Login returns JWT; protected routes enforce roles.

| Day | Focus | Repo | Build | Verify |
|-----|--------|------|-------|--------|
| **8** | JWT theory | — (paper) | Draw login flow; study payload | Explain `sub`, `exp`, `role` |
| **9** | Login API | **Backend** | `AuthModule`, `LoginDto`, bcrypt | Wrong password → 401 |
| **10** | JWT issue | **Backend** | `JwtStrategy` + `JwtAuthGuard` | `GET /auth/me` with Bearer |
| **11** | RBAC | **Backend** | `@Roles()`, `RolesGuard` | TEACHER blocked on admin route |
| **12** | Login UI | **Frontend** | `/login`, `AuthProvider`, token | Login → redirect |
| **13** | Protected routes | **Frontend** | `middleware.ts` + client guard | No token → `/login` |
| **14** | Week 2 review | **Both** | Postman + browser demo | Document auth in both READMEs |

**Week 2 gate:** Demo login in browser AND repeat flow in Postman without code.

---

# WEEK 3 — CRUD + relations (Days 15–21)

**Goal:** Domain modules with school scoping; User+Profile transactions.

| Day | Focus | Repo | Build | Verify |
|-----|--------|------|-------|--------|
| **15** | Schools API | **Backend** | Create + list | curl POST/GET |
| **16** | Tenant scoping | **Backend** | Filter by `schoolId` | Admin can't see other school |
| **17** | Students | **Backend** | User+Student transaction | Prisma Studio |
| **18** | Teachers | **Backend** | Same pattern | curl + Studio |
| **19** | Parents | **Backend** | Parent + Student link | Parent shows children |
| **20** | Frontend read | **Frontend** | `students.service` + table | Table from API |
| **21** | Week 3 review | **Both** | One create form — you implement | Form → API → DB → UI |

**Week 3 gate:** Explain Identity + Profile pattern without notes.

---

# WEEK 4 — Dashboard shell (Days 22–28)

**Goal:** Admin shell, stats, tables, responsive layout.

| Day | Focus | Repo | Build | Verify |
|-----|--------|------|-------|--------|
| **22** | Dashboard API | **Backend** | `GET /dashboard/stats` | Counts match Studio |
| **23** | Layout shell | **Frontend** | Sidebar + `DashboardShell` | Shared layout |
| **24** | Dashboard page | **Frontend** | Stat cards from API | Role in UI |
| **25** | Teachers + Parents | **Frontend** | Data tables | Data loads |
| **26** | Responsive | **Frontend** | Mobile sidebar | 375px width |
| **27** | Role-based nav | **Frontend** | Hide items by role | TEACHER limited nav |
| **28** | Month 1 retro | **Both** | README + demo script | 5-min demo |

**Month 1 complete when:** Login → dashboard → list students/teachers/parents works for SUPER_ADMIN.

---

## Pages to build (by end of Month 1)

- `/login`
- `/dashboard`
- `/students`
- `/teachers`
- `/parents`

---

## Database tables (end state)

| Table | Purpose |
|-------|---------|
| `Role` | RBAC role definitions |
| `User` | Login identity |
| `School` | Tenant |
| `Teacher` | Teacher profile |
| `Student` | Student profile |
| `Parent` | Parent profile |

---

## Mentor questions ( revisit often )

1. Why seed roles in the DB instead of hardcoding in TypeScript only?
2. If two schools must never see each other's data — enforce in UI, guard, or service?
3. What's the smallest shippable proof the full stack works? (Week 1: health check.)

---

## Concepts to study (by week)

| Week | Topics |
|------|--------|
| 0 | Node/npm, Git, JS ES6+, async/await, fetch, TS interfaces, PK/FK/ER diagrams |
| 1 | Postgres, Prisma relations, NestJS lifecycle, Next.js App Router |
| 2 | JWT structure, bcrypt, guards, middleware |
| 3 | DTO validation, transactions, multi-tenancy (`schoolId`) |
| 4 | Layout composition, service layer, responsive UI |

---

## How to use this doc with your mentor

When starting a session, say:

> "I'm on **Week 0 Prep Day X**" or **"Week Y Day Z**". Here's what I built and verified: …"

Do not ask for the next day's full implementation — ask for **one step at a time**.

**Week 0 mentor sessions:** Bring your `school-crm-backend/week-0-practice/` code, errors, or ER sketch.

---

*Last updated: Two-repo layout · Week 0 refresher · Month 1 foundation.*
