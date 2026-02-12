

This stack prioritizes **SEO** (crucial for calculator traffic), **Speed** (instant calculation results), and **Scalability** (for future features like user login and PDF reports).

### **1\. Core Framework: The "Next-Gen" Standard**

* **Framework:** **Next.js 14+ (App Router)**  
  * **Why?**  
    * **SEO Dominance:** Financial keywords (e.g., "SIP Calculator") are competitive. Next.js offers Server-Side Rendering (SSR) and Static Site Generation (SSG), making your pages load instantly and rank higher on Google than standard React apps.  
    * **Unified Architecture:** You can build both the frontend (UI) and the backend (calculation logic/API) within the same project.  
* **Language:** **TypeScript**  
  * **Why?** Financial applications require strict accuracy. TypeScript catches errors (like mixing up "Interest Rate" strings with numbers) during development, preventing bugs in your money logic.

### **2\. Frontend & UI (Matching Your Design)**

* **Styling:** **Tailwind CSS**  
  * **Why?** Your design relies on specific rounded corners, distinct spacing, and a clean "card" aesthetic. Tailwind allows you to replicate that exact look rapidly without writing bulky custom CSS files.  
* **Component Library:** **Shadcn/ui** (highly recommended) or **Mantine**  
  * **Why?** These libraries are built on Tailwind and provide accessible, professional-looking components (sliders, inputs, switches, tables) out of the box. They look very similar to your uploaded design reference.  
* **State Management:** **Zustand** or **React Context**  
  * **Why?** You need to manage complex state (e.g., changing a slider updates the chart *and* the table *and* the summary text simultaneously). Zustand is lightweight and perfect for this.

### **3\. Data Visualization (The Charts)**

* **Library:** **Recharts** or **Chart.js** (via react-chartjs-2)  
  * **Why?**  
    * **Recharts:** Built specifically for React. It is incredibly flexible and makes creating the **Double-Ring Donut Chart** (seen in your design) and dynamic **Line Graphs** (for SIP growth) very easy.  
    * **Responsiveness:** Both libraries handle mobile-screen resizing automatically, ensuring your charts don't break on phones.

### **4\. Backend & Database (Future-Proofing)**

* **Backend Logic:** **Next.js API Routes** (Serverless Functions)  
  * **Why?** You don't need a separate heavy backend server initially. You can write your calculation logic (e.g., Tax Regime comparison) as secure API endpoints within your Next.js project.  
* **Database:** **Supabase** (PostgreSQL)  
  * **Why?**  
    * **User Data:** Best for storing user profiles and saved calculations (Phase 2 requirement).  
    * **Auth:** Comes with built-in authentication (Google/Email login) which you will need later.  
    * **Free Tier:** Excellent free tier to start with.

### **5\. Specialized Libraries (The "Financial" Tools)**

To achieve the specific features mentioned in your PRD:

| Feature | Recommended Library | Purpose |
| :---- | :---- | :---- |
| **Math Precision** | **decimal.js** or **big.js** | **Critical.** JavaScript creates floating-point errors (e.g., 0.1 \+ 0.2 \= 0.300000004). These libraries ensure your money calculations are 100% accurate. |
| **PDF Reports** | **react-pdf** or **jspdf** | Allows users to download their financial plan or tax breakdown as a clean PDF file (Roadmap Phase 2). |
| **Blog/Content** | **Sanity.io** or **Strapi** | A "Headless CMS" to manage the educational content below each calculator (vital for SEO) without touching the code. |
| **Icons** | **Lucide React** | Clean, modern SVG icons that match your design's aesthetic. |

### **6\. Infrastructure & Deployment**

* **Hosting:** **Vercel**  
  * **Why?** The creators of Next.js. It offers the fastest global CDN, meaning your website loads instantly whether the user is in Mumbai or New York. It also handles SSL and scaling automatically.  
* **Analytics:** **PostHog** or **Google Analytics 4**  
  * **Why?** To track which calculators are most popular and where users are dropping off.

---

### **Summary: The "Amorwealth" Stack**

| Layer | Technology |
| :---- | :---- |
| **Frontend** | Next.js 14, React, Tailwind CSS, Shadcn/ui |
| **Language** | TypeScript |
| **Charts** | Recharts (Best for custom styling) |
| **Logic** | decimal.js (for math accuracy) |
| **Backend** | Next.js API Routes \+ Supabase (Postgres) |
| **CMS** | Sanity.io (for blog content) |
| **Hosting** | Vercel |

