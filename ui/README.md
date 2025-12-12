# Sugar Farm UI

A React + TypeScript frontend for the Sugar Farm Sui Move smart contract DApp.

## Project Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── FieldManager.tsx      - Farm field management UI
│   │   ├── FieldManager.css
│   │   ├── SugarInventory.tsx    - Sugar inventory & sales
│   │   └── SugarInventory.css
│   ├── App.tsx                   - Main app component
│   ├── App.css
│   ├── main.tsx                  - Entry point with wallet setup
│   └── index.css                 - Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Installation

```bash
cd ui
npm install
```

## Development

```bash
npm run dev
```

Opens http://localhost:5173 with hot module reloading.

## Build

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

## Features

### FieldManager Component
- Create new fields
- Plant crops (10-second growth time)
- Check growth status
- Harvest crops and collect sugar
- View field details and owner info

### SugarInventory Component
- View total sugar in inventory
- List all sugar items
- Estimated SUI value calculation
- Sell sugar for SUI tokens
- Refresh inventory from blockchain

## Integration with Smart Contract

The UI is designed to work with the Sui Move smart contract at `../sources/sugar_farm.move`:

- **mint_field**: Create new field
- **plant**: Plant crop on field
- **check_grow**: Check if crop is ready
- **harvest**: Harvest crop and get sugar
- **sell_sugar**: Burn sugar and emit event

## Transaction Building

To integrate with the Move contract, implement transaction building using:

```typescript
import { Transaction } from '@mysten/sui.js'

const tx = new Transaction()
// Build transaction with Move contract calls
```

## Wallet Integration

Uses `@mysten/dapp-kit` for wallet connection:
- Supports Sui Wallet, Martian, Ethos, and more
- Testnet by default (configurable to mainnet/devnet)
- Connected account display in header

## Styling

Modern gradient design with:
- Purple-blue gradient background
- Clean white cards
- Responsive grid layouts
- Smooth transitions and hover effects
- Mobile-friendly design

## Future Enhancements

- [ ] Real transaction building with Transaction API
- [ ] RPC queries for field/sugar data
- [ ] Event listener for blockchain state
- [ ] Leaderboard system
- [ ] NFT field upgrades
- [ ] Multiplayer farming
- [ ] Advanced crop types
