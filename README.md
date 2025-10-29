# Buy It 🛒

A modern, fully responsive e-commerce platform built with React and Vite, featuring a complete shopping experience with cart management and user authentication.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://buy-it-store-3bd.netlify.app)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-purple.svg)](https://vitejs.dev/)

## 🌐 Live Demo

Visit the live application: **[buy-it-store-3bd.netlify.app](https://buy-it-store-3bd.netlify.app)**

## 📖 About

**Buy It** is a modern and responsive e-commerce web application built with **React** and **Vite**, designed to deliver a clean and dynamic shopping experience. The project demonstrates best practices in component-based architecture, state management, and UI design, while integrating Firebase authentication and a simulated product API.

## ✨ Key Features

-  **Product Catalog** - Browse products from multiple categories
-  **Shopping Cart** - Add, remove, and update item quantities
-  **User Authentication** - Secure login and registration with Firebase
-  **Fully Responsive** - Optimized for mobile, tablet, and desktop
-  **Modern UI** - Built with Material-UI components
-  **Smooth Animations** - Enhanced UX with Framer Motion
-  **Image Carousel** - Interactive product galleries
-  **Form Validation** - Robust validation with React Hook Form and Zod

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### UI & Styling
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling
- **Framer Motion** - Animation library

### State Management
- **Context API** - Global state management for cart and authentication
- **useReducer Hook** - Cart state management

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Hookform Resolvers** - Integration between React Hook Form and Zod

### Backend & Data
- **Firebase** - Authentication and backend services
- **Fake Store API** - Product data source

### Additional Features
- **Embla Carousel** - Image slider functionality with autoplay

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # Context API providers (Cart & Auth)
├── data/            # Static data 
├── firebase/        # Firebase configuration
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── reducers/        # Reducer functions (Cart management)
├── routes/          # Route definitions
├── schemas/         # Zod validation schemas
├── theme/           # MUI theme and color configurations
└── utils/           # Utility functions
```

## 🎨 Implementation Details

### Cart Management
The shopping cart is powered by Context API and useReducer, providing:
- Add/remove items
- Update quantities
- Persist cart state
- Calculate totals

### Authentication
Firebase Authentication handles:
- User registration
- Login/logout
- Protected routes
- Session management

### Responsive Design
The application is fully responsive with breakpoints:
- **xs**: Extra small devices (mobile phones)
- **sm**: Small devices (tablets portrait)
- **md**: Medium devices (tablets landscape)

### Theme System
Custom color palette stored in a separate file for easy maintenance and consistent styling across the application.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd buy-it-ecommerce
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add your Firebase configuration to the project

4. Run the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 📝 License

This project is open source and available under the MIT License.
