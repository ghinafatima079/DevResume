# 🚀 DevResume

> Generate ATS-friendly resumes from your DevJournal projects.

DevResume transforms your development work into structured, professional resume content — automatically.

---

## ✨ Features

* 🔐 Connect with DevJournal using token
* 📦 Fetch projects with logs + issues
* 🧠 Intelligent bullet generation system
* ✍️ Fully editable resume content
* 📄 Clean A4 resume layout
* 📥 Export as PDF with proper pagination
* 💾 Local persistence (user profile + token)

---

## 🧠 How It Works

```text
DevJournal Data
 → Fetch Projects
 → Extract Logs & Issues
 → Transform into Resume Bullets
 → Rank & Clean Content
 → Generate Sections
 → Edit
 → Export PDF
```

---

## 🏗️ Architecture

```
app/
  page.tsx                → Orchestrator

components/
  SetUpPanel.tsx          → Input UI (profile + projects)
  ResumeEditor.tsx        → Editable content
  ResumeView.tsx          → A4 + PDF view
  ProjectSelector.tsx
  UserProfileForm.tsx

hooks/
  useProjects.ts          → Fetch + selection logic
  useResume.ts            → Generation + sections

services/
  devjournal.ts           → API layer

lib/resume/
  generateProjectResume.ts
  generateBullets.ts
  generateFeatures.ts
  generateSummary.ts
  transformLogs.ts
  filterLogs.ts
  extractLogs.ts
  processIssues.ts
  rankBullets.ts
```

---

## ⚙️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend (DevJournal):** FastAPI
* **PDF:** html2pdf.js

---

## 📸 Screenshots

> (Add screenshots here later)

---

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/devresume.git
cd devresume
npm install
npm run dev
```

---

## 🔑 Usage

1. Enter your DevJournal token
2. Fetch your projects
3. Select projects
4. Generate resume
5. Edit content
6. Export PDF

---

## 🧩 Roadmap

### ✅ Phase 1 (Completed)

* Resume generation
* Editor
* PDF export
* Basic refactor

### 🔜 Phase 2

* Save user profile
* Save generated resumes
* Load saved resumes

### 🔜 Phase 3

* Deep DevJournal integration (logs + issues improvements)

### 🔜 Phase 4

* AI bullet enhancement

### 🔜 Phase 5

* ATS analyzer

### 🔜 Phase 6

* UI redesign

---

## 💡 Vision

DevResume aims to become:

> “The fastest way to turn real development work into job-ready resumes.”

---

## 👤 Author

Built by you 🚀
