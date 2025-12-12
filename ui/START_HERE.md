# Sugar Farm UI - Step by Step Installation

## Step 1: Install Node.js (if you don't have it)

1. Go to: https://nodejs.org/
2. Download LTS version
3. Run the installer
4. Verify: Open PowerShell and type:
   ```powershell
   node --version
   npm --version
   ```

---

## Step 2: Navigate to UI Folder

```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
```

---

## Step 3: Install Dependencies (ONE TIME ONLY)

```powershell
npm install
```

This downloads React, TypeScript, Vite, and all other packages.
**Wait for it to finish** (1-3 minutes)

---

## Step 4: Start Development Server

```powershell
npm run dev
```

Your browser will open: http://localhost:5173

---

## Step 5: Run Tests

Open a NEW PowerShell window and run:

```powershell
npm run test
```

You should see:
```
✅ Total tests: 24; passed: 24; failed: 0
```

---

## That's It! 

Now you can:
- Edit files in `src/` folder
- Changes appear automatically in browser
- Run tests anytime with `npm run test`

---

## Common Commands After Install

```powershell
# See all available commands
npm run

# Stop dev server
# Press Ctrl + C in the terminal

# Build for production
npm run build

# View tests in browser dashboard
npm run test:ui
```

---

## Troubleshooting

**Port 5173 already in use?**
```powershell
npm run dev -- --port 3000
```

**npm command not found?**
- Restart PowerShell
- Or reinstall Node.js

**Tests failing?**
```powershell
npm install
npm run test
```

**Completely start fresh?**
```powershell
rm -r node_modules
del package-lock.json
npm install
```

---

That's everything! Just follow the 5 steps above. 🚀
