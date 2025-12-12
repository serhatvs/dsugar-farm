# 🌾 Sugar Farm - Sui Move dApp

A complete decentralized farming game built on the Sui blockchain with Move smart contracts and a React TypeScript frontend.

## 📋 Project Structure

```
sugar-farm/
├── Move.toml              # Move package configuration
├── Move.lock              # Move dependency lock file
├── sources/               # Sui Move smart contracts
│   └── sugar_farm.move   # Main farming contract with game logic
├── ui/                    # React TypeScript frontend
│   ├── src/              # React components and styles
│   ├── package.json      # npm dependencies
│   ├── tsconfig.json     # TypeScript configuration
│   ├── vite.config.ts    # Vite build configuration
│   └── vitest.config.ts  # Test configuration
└── README.md             # This file
```

## 🎮 Game Features

- **Plant & Harvest**: Create fields, plant crops, and harvest when ready
- **Growth System**: Crops grow over time (10 seconds in this version)
- **Sugar Trading**: Sell harvested sugar for SUI
- **Wallet Integration**: Connect your Slush wallet to play
- **Real-time Updates**: Live balance and field status tracking

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Sui Wallet](https://slush.app) (Slush browser extension)
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install)

### Installation

1. **Install frontend dependencies**:
```bash
cd ui
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Running Tests

**Move contract tests**:
```bash
sui move test
```

**Frontend tests**:
```bash
cd ui
npm run test
```

## 📦 Deployment

### Move Smart Contract

Deploy to Sui testnet:
```bash
sui client publish --gas-budget 100000000
```

### React Frontend

Build for production:
```bash
cd ui
npm run build
```

## 🏗️ Architecture

### Move Smart Contract (`sources/sugar_farm.move`)

Core game mechanics:
- **Field struct**: Stores field state (ID, owner, growth progress)
- **Sugar struct**: Represents harvested sugar items
- **Functions**:
  - `mint_field()`: Create a new farmable field
  - `plant()`: Plant a new crop
  - `check_grow()`: Check crop growth status
  - `harvest()`: Harvest matured crops
  - `sell_sugar()`: Sell sugar for SUI

### React Frontend (`ui/src/`)

Components:
- **App.tsx**: Main app wrapper with wallet connection (dapp-kit)
- **FieldManager.tsx**: Farm field management UI
- **SugarInventory.tsx**: Inventory and sales interface

State Management:
- Uses React hooks with Sui dApp Kit for wallet state
- TanStack Query for blockchain data fetching

## 🧪 Testing

**Test Coverage**: 35+ tests
- Move contract: 11 unit tests
- React components: 24 unit tests

Run tests with:
```bash
# Move tests
sui move test

# Frontend tests  
cd ui
npm run test
npm run test:ui    # Interactive UI
npm run test:coverage  # Coverage report
```

## 🔌 Wallet Integration

The app uses the official [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit) for wallet integration:
- Automatic support for all Sui wallets (Slush, Sui Wallet, etc.)
- Built-in `ConnectButton` component
- Automatic account state management with `useCurrentAccount()`

### Connecting a Wallet

1. Install [Slush Wallet](https://slush.app)
2. Click "Connect" button in the app
3. Approve the connection in your wallet
4. Start playing!

## 📱 Network Configuration

Currently configured for:
- **Testnet**: `https://fullnode.testnet.sui.io:443`
- **Mainnet**: `https://fullnode.mainnet.sui.io:443`

Switch networks in `ui/src/main.tsx`:
```typescript
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
})
```

## 🛠️ Development

### Key Technologies

**Backend (Move)**:
- Sui Move 2024 edition
- Sui Framework (v0.x)

**Frontend (TypeScript/React)**:
- React 18.2.0
- TypeScript 5.3.0
- Vite 5.0.0
- Vitest 1.0.0
- @mysten/dapp-kit (latest)
- @mysten/sui (latest)

### Configuration Files

- `Move.toml`: Sui Move package manifest
- `tsconfig.json`: TypeScript compiler options
- `vite.config.ts`: Vite bundler configuration
- `vitest.config.ts`: Test runner configuration

## 📚 Documentation

Additional docs in `ui/`:
- `INSTALL.md`: Detailed installation instructions
- `QUICK_START.md`: Command reference sheet
- `NPM_COMMANDS.md`: All available npm scripts
- `ERRORS_FIXED.md`: TypeScript config fixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Links

- [GitHub Repository](https://github.com/serhatvs/dsugar-farm)
- [Sui Documentation](https://docs.sui.io)
- [Slush Wallet](https://slush.app)
- [dApp Kit Documentation](https://sdk.mystenlabs.com/dapp-kit)

## 💡 Tips

- Crops take 10 seconds to grow in this version
- Each sugar unit sells for 0.001 SUI
- Multiple fields can be managed simultaneously
- Check the browser console for detailed logs

---

**Built with ❤️ for the Sui ecosystem**
