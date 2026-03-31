# 🚀 Feedlytix – AI Powered Feedback Analyzer

Feedlytix is a full-stack AI-powered application that transforms raw, unstructured feedback into actionable insights using sentiment analysis, summarization, and trend-based analytics.

🔗 **Live Demo:** https://feedlytix.vercel.app

---

## 🎯 Problem Statement

Organizations collect large volumes of feedback from users, surveys, and interviews, but this data is often unstructured and difficult to analyze at scale.

Manual analysis leads to:

- Time-consuming workflows
- Missed patterns and insights
- Inconsistent interpretation of feedback

---

## 💡 Why Feedlytix?

Most systems only **store feedback** — they don’t **understand or analyze trends**.

Feedlytix bridges this gap by:

- Converting raw feedback into structured insights
- Enabling faster, data-driven decisions
- Tracking **sentiment trends over time**
- Reducing manual effort using AI

---

## 🧠 Solution Overview

Feedlytix allows users to:

- Add and manage feedback (CRUD operations)
- Analyze feedback using AI (Gemini)
- View:
  - Sentiment classification
  - AI-generated summaries

- Re-analyze feedback dynamically
- Visualize insights through:
  - Sentiment distribution
  - **7-day trend analysis (time-series insights)**

- Efficiently browse feedback using **server-side pagination**

---

## ⚙️ Features

- ✅ Full CRUD operations for feedback
- ✅ AI-powered sentiment analysis (Gemini)
- ✅ Feedback summarization
- ✅ Re-analyze feature (dynamic AI reprocessing)
- ✅ Dashboard analytics (distribution + trends)
- ✅ **7-day sentiment trend analysis (time-series visualization)**
- ✅ **Server-side pagination for scalable data handling**
- ✅ Filtering support
- ❌ File upload (not implemented)

---

## 🏗️ Tech Stack

### Frontend & Backend

- Next.js 16 (API Routes)
- React.js
- Tailwind CSS

### Database

- PostgreSQL (Aiven)
- TypeORM

### AI Integration

- Gemini API

### Authentication

- JWT-based authentication

---

## 🧩 Architecture Overview

1. User submits feedback via UI
2. Request hits Next.js API routes
3. Backend validates and stores feedback in PostgreSQL
4. Gemini API processes feedback
5. AI returns sentiment + summary
6. Data is stored and visualized in dashboard (distribution + trends)

### Design Highlights

- Clean separation of API and UI logic
- Dedicated **metrics API for analytics (decoupled from CRUD)**
- Efficient DB queries using aggregation and filtering
- Time-series processing for trend analytics
- Scalable pagination strategy

---

## 🔐 Security

- Protected routes using JWT authentication
- Input validation to prevent invalid/malicious data
- Basic rate limiting to prevent API abuse
- Secure environment variable handling

---

## ⚡ Real-World Considerations

- **Scalability:**
  Server-side pagination ensures efficient handling of large datasets

- **Performance:**
  Optimized queries and separated analytics endpoints

- **Analytics:**
  Time-series trend analysis enables better decision-making

- **Error Handling:**
  Handles AI/API failures gracefully

- **User Experience:**
  Clean, minimal dashboard with intuitive visualizations

---

## 🔮 Future Improvements

- **Workflow Automation using n8n:**
  Automate feedback ingestion from forms, emails, CRMs

- **Multi-source Integration:**
  Integrate platforms like Google Forms, Slack, or support systems

- **Advanced Analytics:**
  - Custom date range filters
  - Comparative trend analysis
  - AI-driven insights (topic extraction)

- **Role-Based Access Control (RBAC):**
  Introduce admin/user roles

- **Caching Layer:**
  Use Redis for faster analytics and AI responses

- **Export Reports:**
  Download insights as PDF/CSV

---

## 🚀 Deployment

- **Platform:** Vercel
- **Live URL:** https://feedlytix.vercel.app
- **Database:** Aiven PostgreSQL

---

## 👤 Author

**Shreyash Thaware**
GitHub: https://www.github.com/shreyashthaware2003
LinkedIn: https://www.linkedin.com/in/shreyash-thaware1705

---

## 📌 Conclusion

Feedlytix is not just a CRUD application — it demonstrates the ability to design a **real-world, AI-powered analytics system** that converts unstructured data into meaningful insights.

It reflects strong fundamentals in:

- Full-stack development
- API design
- AI integration
- Data visualization
- Real-world problem solving

---
