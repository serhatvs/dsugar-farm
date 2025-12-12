# Sugar Farm UI - NPM Commands Quick Reference

## Installation

### Windows (PowerShell)
```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
.\install.ps1
```

### Windows (Command Prompt)
```cmd
cd C:\Users\VICTUS\project\Hackthon\ui
install.bat
```

### Windows (Manual)
```powershell
cd C:\Users\VICTUS\project\Hackthon\ui
npm install
```

### macOS/Linux
```bash
cd ~/project/Hackthon/ui
chmod +x install.sh
./install.sh
```

### macOS/Linux (Manual)
```bash
cd ~/project/Hackthon/ui
npm install
```

---

## Development Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run dev` | Start dev server | http://localhost:5173 |
| `npm run build` | Production build | `./dist/` folder |
| `npm run preview` | Preview production | Local server |
| `npm run test` | Run all tests | Console output |
| `npm run test:ui` | Interactive tests | Browser dashboard |
| `npm run test:coverage` | Coverage report | `./coverage/` folder |
| `npm run lint` | Check code quality | Console errors |

---

## Common Workflows

### Start Development
```bash
cd C:\Users\VICTUS\project\Hackthon\ui
npm install      # First time only
npm run dev      # Starts server on localhost:5173
```

### Run Tests
```bash
npm run test                    # All tests once
npm run test -- --watch        # Watch mode
npm run test:coverage          # Coverage report
npm run test:ui                # Browser UI
```

### Build for Production
```bash
npm run build                  # Creates dist/
npm run preview                # Test the build locally
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | `npm run dev -- --port 3000` |
| Module not found | `npm install` |
| npm: command not found | Install Node.js from nodejs.org |
| Clear cache | `npm cache clean --force` |
| Reinstall fresh | `rm -rf node_modules && npm install` |

---

## Environment Setup

### Check Versions
```bash
node --version      # Should be v18+
npm --version       # Should be v8+
```

### Update npm
```bash
npm install -g npm@latest
```

### Install Node.js
1. Visit: https://nodejs.org/
2. Download LTS version
3. Run installer
4. Verify: `node --version`

---

## File Structure

```
ui/
├── src/
│   ├── components/       (React components)
│   ├── App.tsx          (Main app)
│   ├── main.tsx         (Entry point)
│   └── *.css            (Styles)
├── package.json         (Dependencies)
├── tsconfig.json        (TypeScript)
├── vite.config.ts       (Build config)
├── vitest.config.ts     (Test config)
├── install.bat          (Windows batch)
├── install.ps1          (Windows PowerShell)
├── install.sh           (Linux/macOS)
└── INSTALL.md           (Full guide)
```

---

## Test Status

```
✅ FieldManager Tests: 7/7 passing
✅ SugarInventory Tests: 9/9 passing
✅ App Tests: 8/8 passing
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Total: 24/24 tests passing
```

---

## Next Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start dev server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Visit: http://localhost:5173

4. **Run tests**
   ```bash
   npm run test
   ```

5. **Make changes**
   Edit files in `src/` folder

6. **Build for production**
   ```bash
   npm run build
   ```

---

## Support

**Documentation**: See `INSTALL.md` for detailed instructions
**Move Contract**: See `../sources/sugar_farm.move` for smart contract
**Test Files**: See `src/components/*.test.ts` for test examples
