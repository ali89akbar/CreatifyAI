🎨 CreatifyAI

🚀 Overview

CreatifyAI is a SaaS-based AI productivity platform that combines AI + automation tools to help users with creative and professional tasks.

🔑 Features include:

🖼 Background Remover – Remove image backgrounds in one click

✂️ Object Remover – Delete unwanted objects from photos

📄 Resume Analyzer – AI-powered resume insights

🎨 AI Image Generator – Generate visuals from text prompts

✍️ Article Writer – Create SEO-ready articles

📝 Blog Title Generator – Generate catchy titles instantly

⚡ Tech Stack
Frontend

⚛️ React (Vite)

🎨 TailwindCSS

🔑 Clerk (Auth)

⚡ Framer Motion (Animations)

🔥 React Hot Toast (Notifications)

🌐 Axios

📝 Markdown Renderer

Backend

🟢 Node.js + Express

🗄 Neon PostgreSQL (Serverless DB)

🔑 Clerk (Secure Authentication)

🤖 Google Gemini API (AI Text)

🎨 Clipdrop API (Image Editing)

☁️ Cloudinary (File & Image Storage)

📄 PDF Parser (Resume Analysis)

📂 Multer (File Uploads)

📧 Nodemailer (Email Service)

📂 Project Structure
CreatifyAI/
│── frontend/   # React + Vite app
│   ├── src/
│   ├── public/
│   └── package.json
│
│── server/     # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
│── README.md

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/CreatifyAI.git
cd CreatifyAI

2️⃣ Backend Setup
cd server
npm install


📌 Create .env file inside server/

PORT=5000
DATABASE_URL=your_neon_postgres_url
CLERK_SECRET_KEY=your_clerk_secret
GEMINI_API_KEY=your_google_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MAIL_USER=your_email
MAIL_PASS=your_email_password


Run backend:

npm run dev

3️⃣ Frontend Setup
cd ../frontend
npm install


📌 Create .env file inside frontend/

VITE_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key


Run frontend:

npm run dev

🌐 Deployment

🌍 Frontend → Vercel / Netlify

🖥 Backend → AWS / Render / Railway

🗄 Database → Neon (Postgres)

☁️ Storage → Cloudinary

📧 Contact

👤 Syed Ali Akbar
📩 Email: ali59.aa96@gmail.com
🌐 Portfolio: https://portfolio-git-final-s-ali-akbar.vercel.app/

✨ CreatifyAI – Built with AI to make your creativity smarter & faster!
