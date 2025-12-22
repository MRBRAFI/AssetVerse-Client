# AssetVerse - Corporate Asset Management System

**AssetVerse** is a sophisticated, full-stack corporate asset management solution designed to streamline resource tracking, employee management, and organizational efficiency. It provides tailored experiences for HR Managers and Employees to ensure seamless asset allocation and inventory control.

### 🌐 [Live Deployment](https://asset-verse-client-nine.vercel.app/)

---

## 🚀 Key Features

### 📋 For HR Managers
- **Organization Registration:** Create and manage a custom company profile.
- **Asset Inventory:** Add, update, and track physical assets (e.g., laptops, chairs, monitors).
- **Employee Management:** Hire employees, view their profiles, and manage team affiliations.
- **Request Processing:** Review, approve, or reject asset requests from employees.
- **Subscription Model:** Integrated package system (Basic, Standard, Premium) with Stripe for increasing employee capacity.

### 👥 For Employees
- **Asset Requests:** Easily request available assets from the company inventory.
- **My Team:** View colleagues and team information.
- **Personal Dashboard:** Track personal asset requests and status.
- **Return Assets:** Easy workflow for returning assets when no longer needed.

### 🛠 System Wide
- **Role-Based Access Control (RBAC):** Secure navigation and data access based on user roles.
- **Dynamic Statistics:** Visual representation of asset distribution and request status using Recharts.
- **Premium UI/UX:** Responsive design built with Tailwind CSS, DaisyUI, and smooth animations using Framer Motion.
- **Secure Authentication:** Robust login/signup flow powered by Firebase.

---

## 📦 Tech Stack & Packages

### Core
- **React 19** & **Vite** (Frontend)
- **Tailwind CSS** & **DaisyUI** (Styling)
- **Firebase** (Authentication)
- **TanStack Query (v5)** (State & Data Fetching)

### Key Packages
- `axios`: For API communication.
- `framer-motion`: For fluid UI transitions and animations.
- `react-hook-form`: To handle complex form validation.
- `react-hot-toast` & `sweetalert2`: For interactive user feedback.
- `recharts`: For data visualization in dashboards.
- `@stripe/react-stripe-js`: For handling secure subscription payments.
- `lucide-react` & `react-icons`: For a modern icon system.

---

## 🛠 Setup & Installation

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/assetverse-client.git
   cd assetverse-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_sender_id
   VITE_appId=your_firebase_app_id
   VITE_IMGBB_API_KEY=your_imgbb_api_key
   VITE_BACKEND_URL=your_backend_server_url
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📧 Contact
For any inquiries or feedback, please reach out via the [Live Site Contact Form](https://asset-verse-client-nine.vercel.app/contact-us).
