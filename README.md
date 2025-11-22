# 🏋️ Fitvora

**AI-Powered Fitness Tracking Progressive Web App**

Fitvora is a comprehensive fitness tracking PWA designed for both gym and home workouts. It combines workout tracking with an embedded music player and AI-driven workout suggestions based on your progress.

## 🚀 Features

- **All-in-One Tracking:** Integrated workout tracking with music player
- **AI-Driven Suggestions:** Personalized workout plans based on goals and progress
- **Visual Guidance:** Video/image demonstrations for exercises
- **Progress Tracking:** Daily reports and PDF export capabilities
- **Offline Support:** PWA with IndexedDB for offline functionality

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** Redux Toolkit + React Context
- **Icons:** Lucide React
- **Offline Storage:** IndexedDB (Dexie.js)

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT (NextAuth v5)
- **File Storage:** Cloudinary

### Infrastructure
- **Monorepo:** Turborepo
- **Language:** TypeScript (Strict Mode)

## 📦 Project Structure

```
fitvora/
├── client/          # Next.js Frontend
├── server/          # NestJS Backend
└── turbo.json       # Turborepo Configuration
```

## 🏃 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitvora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `client/` and `server/` directories:
   
   **client/.env.local:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```
   
   **server/.env:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/fitvora"
   JWT_SECRET=your-jwt-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Run database migrations**
   ```bash
   cd server
   npx prisma migrate dev
   cd ..
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 📱 PWA Installation

The app can be installed on mobile devices:
1. Open the app in your mobile browser
2. Tap "Add to Home Screen"
3. Launch from your home screen like a native app

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build all packages
- `npm run start` - Start production servers
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

### Workspace Commands

Run commands in specific workspaces:
```bash
npm run dev --workspace=client
npm run dev --workspace=server
```

## 📚 Documentation

- [API Documentation](http://localhost:3001/api) - Swagger/OpenAPI docs
- [Project Structure](/project_structure.md) - Detailed architecture

## 🎨 Design System

Fitvora uses a "Cyber-Sport" aesthetic:
- **Theme:** Dark mode by default
- **Accents:** Neon Green (#00FF41) / Neon Blue (#00D9FF)
- **Typography:** Inter, Roboto
- **Mobile-First:** Touch targets 44px+

## 🔐 Security

- JWT-based authentication with refresh tokens
- Secure password hashing (bcrypt)
- CORS configuration
- Environment variable protection

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 🐛 Issues

Found a bug? Please open an issue with detailed reproduction steps.

---

Built with ❤️ for fitness enthusiasts
# Fitvora
