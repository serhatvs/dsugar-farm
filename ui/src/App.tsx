import React, { useState } from 'react'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import '@mysten/dapp-kit/dist/index.css'
import FieldManager from './components/FieldManager'
import SugarInventory from './components/SugarInventory'
import './App.css'

function AppContent() {
  const [activeTab, setActiveTab] = useState<'farm' | 'inventory'>('farm')
  const currentAccount = useCurrentAccount()

  return (
    <div className="app">
      <header className="header">
        <h1>🌾 Sugar Farm</h1>
        <div className="wallet-status">
          {currentAccount ? (
            <div>
              <span className="connected">✓ Connected: {currentAccount.address.slice(0, 10)}...</span>
              <ConnectButton />
            </div>
          ) : (
            <div>
              <span className="disconnected">⚠ Connect Wallet to Play</span>
              <ConnectButton />
            </div>
          )}
        </div>
      </header>

      <nav className="nav-tabs">
        <button
          className={`tab ${activeTab === 'farm' ? 'active' : ''}`}
          onClick={() => setActiveTab('farm')}
        >
          🌱 Farm
        </button>
        <button
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          🍬 Inventory
        </button>
      </nav>

      <main className="content">
        {currentAccount ? (
          <>
            {activeTab === 'farm' && <FieldManager />}
            {activeTab === 'inventory' && <SugarInventory />}
          </>
        ) : (
          <div className="no-wallet">
            <p>Please connect your Slush wallet to start playing!</p>
            <p style={{ fontSize: '14px', marginTop: '10px', color: '#999' }}>
              Click the "Connect" button above to link your wallet
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default AppContent
