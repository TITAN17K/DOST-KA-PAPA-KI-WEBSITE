# Complete Hosting Guide - Frontend + Backend

Your application is already configured to run **frontend and backend together** from a single server. Here's how to host it:

---

## 🚀 Option 1: Render.com (Recommended - FREE)

### **Step-by-Step Instructions:**

#### 1. **Prepare Your Code**
- Push your code to GitHub
- Make sure `.env` file is in `.gitignore` (it already is)

#### 2. **Sign Up & Create Service**
- Go to [render.com](https://render.com)
- Sign up with GitHub
- Click **"New +"** → **"Web Service"**

#### 3. **Configure the Service**
```
Name: frozelia-app
Region: Choose closest to you
Branch: main (or master)
Root Directory: (leave blank)
Runtime: Node
Build Command: cd backend && npm install && npm run build
Start Command: cd backend && npm start
```

#### 4. **Add Environment Variables**
Click **"Advanced"** → **"Add Environment Variable"**

Add these:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_db_name
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

#### 5. **Deploy**
- Click **"Create Web Service"**
- Wait 5-10 minutes for build and deployment
- Your app will be live at: `https://frozelia-app.onrender.com`

#### 6. **Access Your App**
- **Frontend**: `https://frozelia-app.onrender.com`
- **Admin**: `https://frozelia-app.onrender.com/admin`
- **API**: `https://frozelia-app.onrender.com/api/*`

---

## 🚀 Option 2: Railway.app (Easy & Fast)

#### 1. **Sign Up**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

#### 2. **Deploy**
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose your repository
- Railway will auto-detect Node.js

#### 3. **Configure**
- Go to **Settings** → **Root Directory**: Leave blank
- Add **Environment Variables** (same as Render above)

#### 4. **Add Start Command**
- Go to **Settings** → **Deploy**
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`

#### 5. **Generate Domain**
- Go to **Settings** → **Networking**
- Click **"Generate Domain"**
- Your app will be live!

---

## 🚀 Option 3: Vercel (Frontend Specialist)

**Note**: Vercel is better for static sites. For full-stack with Express, use Render or Railway instead.

But if you want to try:

#### 1. **Install Vercel CLI**
```bash
npm install -g vercel
```

#### 2. **Create `vercel.json` in backend folder**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "index.js"
    },
    {
      "src": "/admin/(.*)",
      "dest": "public/admin/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "public/frontend/index.html"
    }
  ]
}
```

#### 3. **Deploy**
```bash
cd backend
vercel
```

---

## 🚀 Option 4: VPS (DigitalOcean, AWS, Linode)

### **For Ubuntu/Linux Server:**

#### 1. **Connect to Server**
```bash
ssh root@your_server_ip
```

#### 2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 3. **Install PM2**
```bash
npm install -g pm2
```

#### 4. **Clone Your Repository**
```bash
cd /var/www
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

#### 5. **Setup Environment**
```bash
cd backend
nano .env
```
Paste your environment variables, then save (Ctrl+X, Y, Enter)

#### 6. **Build and Start**
```bash
npm install
npm run build
pm2 start index.js --name frozelia
pm2 save
pm2 startup
```

#### 7. **Setup Nginx (Optional - for custom domain)**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/frozelia
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/frozelia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. **Setup SSL (Free with Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔧 Environment Variables You Need

### **MongoDB Atlas (Free Database)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### **Cloudinary (Image Storage)**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free
3. Get: Cloud Name, API Key, API Secret from dashboard

### **Razorpay (Payment Gateway)**
1. Go to [razorpay.com](https://razorpay.com)
2. Sign up
3. Get: Key ID and Key Secret from dashboard

### **JWT Secret**
Generate a random string (minimum 32 characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created
- [ ] Cloudinary account setup
- [ ] Razorpay account setup
- [ ] All environment variables ready
- [ ] `.env` file in `.gitignore`
- [ ] Test build locally: `cd backend && npm run build`
- [ ] Test start locally: `cd backend && npm start`

---

## 🧪 Test Locally Before Hosting

```bash
# From project root
cd backend
npm run deploy
```

Then visit:
- http://localhost:5000 (Frontend)
- http://localhost:5000/admin (Admin)

If it works locally, it will work when hosted!

---

## 🐛 Common Issues & Solutions

### **Issue: Build fails on hosting platform**
**Solution**: Make sure all dependencies are in `package.json`, not just `devDependencies`

### **Issue: Database connection fails**
**Solution**: 
1. Check MongoDB Atlas → Network Access → Add `0.0.0.0/0` (allow all IPs)
2. Verify connection string has correct username/password
3. Make sure database name is in the connection string

### **Issue: Images not uploading**
**Solution**: Verify Cloudinary credentials are correct in environment variables

### **Issue: Payment not working**
**Solution**: 
1. Use Razorpay test keys for testing
2. Switch to live keys for production
3. Verify keys are correctly set in environment variables

### **Issue: 404 on refresh**
**Solution**: The catch-all route in `backend/index.js` should handle this. Make sure it's configured correctly.

### **Issue: CORS errors**
**Solution**: Update CORS origins in `backend/index.js` to include your production domain

---

## 🔄 Updating Your Hosted App

### **Render/Railway (Auto-deploy)**
- Just push to GitHub
- Platform will automatically rebuild and redeploy

### **VPS with PM2**
```bash
cd /var/www/your-repo
git pull
cd backend
npm run build
pm2 restart frozelia
```

---

## 📊 Monitoring Your App

### **Check if server is running (VPS)**
```bash
pm2 status
pm2 logs frozelia
```

### **Check server resources**
```bash
pm2 monit
```

### **Restart server**
```bash
pm2 restart frozelia
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| **Render** | ✅ Yes (sleeps after 15min inactivity) | $7/month |
| **Railway** | ✅ $5 free credit/month | Pay as you go |
| **Vercel** | ✅ Yes (serverless limits) | $20/month |
| **DigitalOcean** | ❌ No | $4-6/month |
| **AWS EC2** | ✅ 12 months free | Varies |

---

## 🎯 Recommended Setup for Production

**Best Choice**: **Render.com** or **Railway.app**

**Why?**
- ✅ Easy setup (5 minutes)
- ✅ Auto-deploy from GitHub
- ✅ Free tier available
- ✅ SSL certificate included
- ✅ No server management needed
- ✅ Automatic scaling
- ✅ Built-in monitoring

---

## 📞 Need Help?

If you encounter issues:
1. Check the logs on your hosting platform
2. Verify all environment variables are set correctly
3. Test locally first: `cd backend && npm start`
4. Make sure MongoDB Atlas allows connections from all IPs

---

**Your app is ready to host! Choose a platform and follow the steps above.** 🚀
