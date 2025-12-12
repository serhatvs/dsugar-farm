# Sugar Farm UI - Installation & Setup Guide

## Quick Start (Windows)

### Step 1: Run Installation Script
```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
.\install.ps1
```

### Step 2: Start Development Server
```powershell
npm run dev
```

Opens: http://localhost:5173

---

## Quick Start (macOS/Linux)

### Step 1: Run Installation Script
```bash
cd ~/project/Hackthon/ui
chmod +x install.sh
./install.sh
```

### Step 2: Start Development Server
```bash
npm run dev
```

Opens: http://localhost:5173

---

## Manual Installation Steps

### 1. Install Node.js and npm
- Download from: https://nodejs.org/
- Recommended: LTS version (v20+)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Navigate to UI Directory
```bash
cd C:\Users\VICTUS\project\Hackthon\ui
```

### 3. Install Dependencies
```bash
npm install
```

This installs:
- **React** (v18.2.0) - UI library
- **Vite** (v5.0.0) - Build tool
- **Vitest** (v1.0.0) - Testing framework
- **TypeScript** (v5.3.0) - Type safety
- **@mysten/sui.js** (v1.0.0) - Sui blockchain SDK

### 4. Verify Installation
```bash
npm list
```

Should show:
```
sugar-farm-ui@0.1.0
├── @mysten/sui.js@^1.0.0
├── react@^18.2.0
├── react-dom@^18.2.0
├── typescript@^5.3.0
└── vite@^5.0.0
```

---

## Available Commands

### Development
```bash
npm run dev
# Starts Vite dev server on http://localhost:5173
# Hot module replacement enabled
```

### Production Build
```bash
npm run build
# Creates optimized production build in ./dist/
```

### Preview Build
```bash
npm run preview
# Serves production build locally for testing
```

### Testing

#### Run All Tests
```bash
npm run test
# Runs unit tests with Vitest
# Current: 24 tests, all passing
```

#### Interactive Test Dashboard
```bash
npm run test:ui
# Opens browser UI for test debugging
```

#### Test Coverage Report
```bash
npm run test:coverage
# Generates coverage reports in ./coverage/
```

#### Watch Mode (Auto-rerun on changes)
```bash
npm run test -- --watch
```

### Linting
```bash
npm run lint
# Checks TypeScript files for errors
```

---

## Troubleshooting

### Error: "npm: command not found"
- Node.js/npm not installed
- Solution: Download and install from https://nodejs.org/

### Error: "Cannot find module 'react'"
- Dependencies not installed
- Solution: Run `npm install`

### Error: "Port 5173 already in use"
- Another process using the port
- Solution: Kill process or use different port:
  ```bash
  npm run dev -- --port 3000
  ```

### Error: "vitest not found"
- Vitest not installed as dev dependency
- Solution: Run `npm install --save-dev vitest`

### Clear Cache and Reinstall
```bash
# Remove node_modules and package lock
rm -rf node_modules package-lock.json

# Reinstall fresh
npm install

# Clear npm cache if needed
npm cache clean --force
```

---

## Project Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── FieldManager.tsx      (Farm UI)
│   │   ├── FieldManager.test.ts  (Tests)
│   │   ├── SugarInventory.tsx    (Inventory UI)
│   │   └── SugarInventory.test.ts (Tests)
│   ├── App.tsx                    (Main component)
│   ├── App.test.ts                (App tests)
│   ├── main.tsx                   (Entry point)
│   ├── App.css                    (Styles)
│   └── index.css                  (Global styles)
├── package.json                   (Dependencies)
├── tsconfig.json                  (TypeScript config)
├── vite.config.ts                 (Vite config)
├── vitest.config.ts               (Vitest config)
├── index.html                     (HTML template)
├── install.ps1                    (Windows installer)
├── install.sh                     (Unix installer)
└── run-tests.js                   (Simple test runner)
```

---

## Development Workflow

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start dev server**
   ```bash
   npm run dev
   ```

3. **Make changes** to files in `src/`
   - Changes auto-reload in browser
   - TypeScript errors shown in terminal

4. **Run tests**
   ```bash
   npm run test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy** to hosting service (Vercel, Netlify, etc.)

---

## Integration with Move Smart Contract

To connect the UI to the Move smart contract:

1. Update `src/App.tsx` with wallet integration:
   ```typescript
   import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
   ```

2. Build transactions in components:
   ```typescript
   import { Transaction } from '@mysten/sui.js'
   const tx = new Transaction()
   // Add Move contract calls
   ```

3. Execute transactions via wallet:
   ```typescript
   const result = await signAndExecuteTransaction({ transaction: tx })
   ```

---

## Next Steps

- [ ] Run `npm install`
- [ ] Run `npm run dev` to start dev server
- [ ] Open http://localhost:5173 in browser
- [ ] Run `npm run test` to verify setup
- [ ] Integrate with Move smart contract
- [ ] Deploy to production

---

## Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev
- **Vitest**: https://vitest.dev
- **Sui Documentation**: https://docs.sui.io
- **Move Language**: https://move-language.github.io
