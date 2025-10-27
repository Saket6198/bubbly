# Bubbly 💬

A modern React Native chat application built with Expo Router and styled with NativeWind and ReactNative-ReAnimated.

## ✨ Features

- **Modern UI**: Clean design with pattern backgrounds and smooth animations
- **Dark/Light Theme**: Automatic adaptation to system theme
- **Cross-Platform**: iOS, Android, and Web support
- **Type-Safe Routing**: Built with Expo Router and TypeScript
- **Responsive Design**: Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saket6198/bubbly.git
   cd bubbly
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm start
   ```

### Running on Different Platforms

```bash
# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Language**: TypeScript
- **Icons**: Phosphor React Native
- **State Management**: React Context (planned)
- **Backend**: (to be integrated)

## 📁 Project Structure

```
app/
├── (auth)/               # Authentication screens
│   ├── welcome.tsx       # Welcome/landing page
│   ├── register.tsx      # User registration
│   └── _layout.tsx       # Auth layout
├── _layout.tsx           # Root layout
└── index.tsx             # Main entry point

components/
├── ScreenWrapper.tsx     # Reusable screen container
└── Typo.tsx             # Typography component

constants/
└── theme.ts             # App theme and colors

types/
└── types.ts             # TypeScript type definitions
```

## 🎨 Design System

The app uses a consistent design system with:

- **Primary Color**: `#facc15` (Yellow)
- **Dark Background**: `#1c1917` (Neutral 900)
- **Light Background**: `#ffffff` (White)
- **Typography**: Custom Typo component with consistent sizing
- **Icons**: Phosphor icon library
- **Patterns**: Background patterns for visual appeal

## 📱 Screenshots

*(Screenshots will be added as the app develops)*

## 🚧 Development Status

This project is currently in development. Planned features include:

- [ ] User authentication
- [ ] Real-time messaging
- [ ] Group chats
- [ ] Media sharing
- [ ] Push notifications
- [ ] Backend integration

## 🤝 Contributing

This is a personal project by Saket. Feel free to fork and create your own version!

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

**Made by Saket**

---

*Stay Connected. Private by design. Secure by default.*
