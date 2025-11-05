# Frozelia E-Commerce Platform

A full-stack e-commerce application with React frontend, admin panel, and Express backend - all running on a single server!

## 🚀 Quick Start

### One Command Deployment
```bash
cd backend
npm run deploy
```

This will build everything and start the server on **port 5000**.

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Admin
cd admin
npm run dev
```

## 📍 Access Points

- **Frontend**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin
- **API**: http://localhost:5000/api/*

## 📦 Tech Stack

- **Frontend**: React 19 + Vite + TailwindCSS
- **Admin**: React 19 + Vite + TailwindCSS
- **Backend**: Express.js + MongoDB + Node.js
- **Payment**: Razorpay
- **Storage**: Cloudinary
- **Auth**: JWT + Google OAuth

## 🔧 Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Configure environment variables** in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret
   ```

4. **Run the application**:
   ```bash
   npm run deploy
   ```

## 📖 Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed hosting instructions.

## 🌐 Hosting

Recommended platforms:
- **Render.com** (Free tier available)
- **Railway.app**
- **DigitalOcean/AWS** (VPS)

## 📂 Project Structure

```
Frozelia 2/
├── backend/          # Express API + serves static files
├── frontend/         # React customer-facing app
├── admin/            # React admin dashboard
└── package.json      # Root scripts
```

## 🛠️ Available Scripts

From root directory:
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend & admin
- `npm run start` - Start production server
- `npm run dev` - Start development server
- `npm run deploy` - Full deployment (install + build + start)

## ✨ Features

- User authentication (JWT + Google OAuth)
- Product management
- Shopping cart
- Order processing
- Payment integration (Razorpay)
- Image uploads (Cloudinary)
- Admin dashboard
- Responsive design

## 📝 License

ISC
