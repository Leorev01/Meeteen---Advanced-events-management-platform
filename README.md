# Meeteen - My Meetup App

Welcome to **Meeteen**, a modern web application built with [Next.js](https://nextjs.org) to help users track and visualize their activities. This project leverages the power of [Supabase](https://supabase.com/) for backend services and [Tailwind CSS](https://tailwindcss.com/) for responsive, sleek designs.

## 🚀 Features

- **User Authentication**: Secure login and user management powered by Supabase.
- **Activity Tracking**: Fetch and display user activities from the database.
- **Interactive Charts**: Visualize user activities with dynamic line and pie charts.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm**, **yarn**, or **pnpm** (package managers)
- A **Supabase account** for backend services

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/meeteen.git
   cd meeteen
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   Replace `your-supabase-url` and `your-supabase-anon-key` with your Supabase credentials.

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

## 📂 Project Structure

```plaintext
my-meetup-app/
├── app/
│   ├── (auth)/dashboard/page.tsx  # Dashboard page with activity charts
│   └── ...                        # Other app routes
├── components/
│   ├── Dashboard/
│   │   ├── ActivityLineChart.tsx  # Line chart component
│   │   └── ActivityPieChart.tsx   # Pie chart component
├── lib/
│   └── supabase.ts                # Supabase client configuration
├── public/
│   └── fonts/                     # Custom fonts
├── styles/
│   └── globals.css                # Global styles
├── .env.local                     # Environment variables (not included in repo)
├── README.md                      # Project documentation
└── ...
```

---

## 🌐 Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/):

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy your app with a single click.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📖 Learn More

To learn more about the tools and frameworks used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase services.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS for styling.

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

### ✨ Happy Coding!