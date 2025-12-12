# 📦 Sugar Farm UI - Complete NPM Installation Commands

## ⚡ FASTEST WAY TO GET STARTED

### Windows Users - PICK ONE:

**Option A: PowerShell (Recommended)**
```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
.\install.ps1
```

**Option B: Command Prompt**
```cmd
cd C:\Users\VICTUS\project\Hackthon\ui
install.bat
```

**Option C: Manual**
```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
npm install
npm run dev
```

### macOS/Linux Users:

```bash
cd ~/project/Hackthon/ui
chmod +x install.sh
./install.sh
# OR manually:
npm install
npm run dev
```

---

## ✅ VERIFY INSTALLATION

After running install, verify with:
```bash
npm list
npm run test
```

Expected output:
```
✅ Total tests: 24; passed: 24; failed: 0
```

---

## 🚀 AFTER INSTALLATION - START DEVELOPING

```bash
# Development server (with hot reload)
npm run dev
# Then open: http://localhost:5173

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📋 ALL AVAILABLE COMMANDS

```bash
npm run dev              # Start dev server on localhost:5173
npm run build            # Create production build in ./dist/
npm run preview          # Preview production build locally
npm run test             # Run all 24 unit tests
npm run test:ui          # Run tests with browser dashboard
npm run test:coverage    # Generate coverage report
npm run lint             # Check TypeScript code quality
```

---

## 🆘 TROUBLESHOOTING

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "Port 5173 already in use"
→ Use different port: `npm run dev -- --port 3000`

### "Cannot find module 'react'"
→ Run: `npm install`

### "Tests failing"
→ Run: `npm install` then `npm run test`

### Start completely fresh
```bash
cd C:\Users\VICTUS\project\Hackthon\ui
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 📊 INSTALLATION CHECKLIST

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Navigated to ui directory
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run test` → 24/24 tests pass
- [ ] Ran `npm run dev` → Server started
- [ ] Opened http://localhost:5173 in browser

---

## 📁 PROJECT STRUCTURE

```
Sugar Farm Project
├── sources/
│   └── sugar_farm.move         (Move smart contract - ✅ 11 tests passing)
├── tests/                      (Move test files)
└── ui/                         (JavaScript/TypeScript frontend - ✅ 24 tests passing)
    ├── src/
    │   ├── components/
    │   │   ├── FieldManager.tsx
    │   │   ├── FieldManager.test.ts
    │   │   ├── SugarInventory.tsx
    │   │   └── SugarInventory.test.ts
    │   ├── App.tsx
    │   ├── App.test.ts
    │   ├── main.tsx
    │   └── *.css
    ├── package.json            (npm dependencies)
    ├── tsconfig.json           (TypeScript config)
    ├── vite.config.ts          (Build config)
    ├── vitest.config.ts        (Test config)
    ├── install.bat             (Windows batch installer)
    ├── install.ps1             (Windows PowerShell installer)
    ├── install.sh              (macOS/Linux installer)
    ├── run-tests.js            (Simple test runner)
    ├── INSTALL.md              (Detailed guide)
    ├── QUICK_START.md          (Quick reference)
    └── ERRORS_FIXED.md         (Error resolution notes)
```

---

## 🎯 WHAT YOU'LL GET

✅ **24 Unit Tests** - All passing
- 7 FieldManager tests
- 9 SugarInventory tests  
- 8 App tests

✅ **Development Environment**
- Vite dev server with hot reload
- TypeScript support
- React 18.2

✅ **Test Framework**
- Vitest for unit testing
- Interactive test dashboard available

✅ **Production Ready**
- Optimized build output
- Test coverage reports

---

## 📚 DOCUMENTATION

- `INSTALL.md` - Full installation guide
- `QUICK_START.md` - Command reference
- `ERRORS_FIXED.md` - TypeScript fixes
- `README.md` - Project overview
- `run-tests.js` - Test runner

---

## 🔗 USEFUL LINKS

- **Node.js**: https://nodejs.org/ (download LTS)
- **React**: https://react.dev (docs)
- **TypeScript**: https://www.typescriptlang.org (handbook)
- **Vite**: https://vitejs.dev (guide)
- **Vitest**: https://vitest.dev (testing)
- **Sui Docs**: https://docs.sui.io (blockchain)

---

**Ready to start? Run one of the install commands above!** 🚀
