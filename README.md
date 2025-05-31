# Meeteen - Advanced Events Management Platform

Welcome to **Meeteen**, a feature-rich web application built with [Next.js](https://nextjs.org) to help users create, manage, and participate in events. This project leverages [Supabase](https://supabase.com/) for backend services, [Tailwind CSS](https://tailwindcss.com/) for responsive design, and integrates advanced features like real-time chat, Google Maps API, and dynamic data visualizations.

---

## 🚀 Features

- **User Management**: Full CRUD operations for user accounts.
- **Authentication**: Sign‑up and sign‑in powered by Supabase Auth (email, magic‑link & OAuth).Users can update their own profile details.
- **Event Management**: 
  - Create, edit, delete, and view events with detailed information.
  - Event organizers can view and manage attendees for their events.
  - Event organizers can remove attendees from events.
- **Chatroom per Event**: Real‑time messaging using Supabase Realtime channels.
- **Google Maps Integration**: Interactive map with event markers and distance‑based filtering via Maps & Geocoding APIs.
- **Image Storage**: Upload and serve event images from Supabase Storage buckets.
- **Activity Tracking**: Visualise user activity with dynamic Recharts (bar, line & pie charts).
- **Responsive Design**: Built with Tailwind CSS for full responsiveness (laptop & mobile).

---

## 🛠 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm**, **yarn**, or **pnpm** (package managers)
- A **Supabase account** for backend services
- A **Google Cloud account** for Maps and Geocoder APIs

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Leorev01/Meeteen---Advanced-events-management-platform
   cd my-meetup-app
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
   NEXT_PUBLIC_SUPABASE_URL=your‑supabase‑url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your‑supabase‑anon‑key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your‑maps‑api‑key
   //Optional – only if using Geocoding REST directly
   NEXT_PUBLIC_GOOGLE_GEOCODER_API_KEY=your‑geocoder‑api‑key
   ```

   Replace `your-supabase-url`, `your-supabase-anon-key`, and `your-google-maps-api-key` with your credentials.

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
│   ├── (auth)/
│   │   ├── dashboard/               # Dashboard with activity charts
│   │   ├── create-event/            # Create event page
│   │   ├── edit-event/              # Edit event page
│   │   ├── my-events/               # User's events page
│   │   ├── chat/                    # Event chatroom
│   │   └── ...                      # Other authenticated routes
├── components/
│   ├── Dashboard/
│   │   ├── ActivityLineChart.tsx    # Line chart component
│   │   └── ActivityPieChart.tsx     # Pie chart component
│   ├── Events/
│   │   ├── EventsChat.jsx           # Chatroom component
│   │   └── EventCard.tsx            # Event card component
│   ├── HomePage/
│   │   ├── CategoriesSection.tsx    # Categories section component
│   │   └── ...                      # Other homepage components
│   └── ...                          # Other reusable components
├── lib/
│   ├── supabase.ts                  # Supabase client configuration
│   └── google-maps.ts               # Google Maps API integration
├── public/
│   ├── fonts/                       # Custom fonts
│   └── images/                      # Static images
├── styles/
│   └── globals.css                  # Global styles
├── .env.local                       # Environment variables (not included in repo)
├── README.md                        # Project documentation
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
- [Google Maps API Documentation](https://developers.google.com/maps/documentation) - Learn about Google Maps API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS for styling.

---


### ✨ Happy Coding!
