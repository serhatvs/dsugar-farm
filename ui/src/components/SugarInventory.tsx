import React, { useState } from 'react'
import './SugarInventory.css'

interface SugarItem {
  id: string
  amount: number
  owner: string
}

export default function SugarInventory() {
  const [inventory, setInventory] = useState<SugarItem[]>([])
  const [loading, setLoading] = useState(false)
  const [totalSugar] = useState(0)

  const sellSugar = async (sugarId: string, amount: number) => {
    setLoading(true)
    try {
      console.log('Selling sugar:', sugarId, amount)
      // Transaction would be built and executed here
      alert(`Sell functionality would be implemented with transaction builder\nSelling ${amount} sugar`)
    } catch (error) {
      console.error('Error selling sugar:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadInventory = async () => {
    setLoading(true)
    try {
      console.log('Loading inventory...')
      // Query blockchain for user's sugar objects
      alert('Inventory loading would be implemented with SUI RPC queries')
    } catch (error) {
      console.error('Error loading inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sugar-inventory">
      <div className="inventory-header">
        <div>
          <h2>Sugar Inventory</h2>
          <p className="total-sugar">Total Sugar: {totalSugar} 🍬</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={loadInventory}
          disabled={loading}
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Sugar</h3>
          <p className="stat-value">{totalSugar}</p>
        </div>
        <div className="stat-card">
          <h3>Sugar Items</h3>
          <p className="stat-value">{inventory.length}</p>
        </div>
        <div className="stat-card">
          <h3>Est. Value (SUI)</h3>
          <p className="stat-value">{(totalSugar * 0.001).toFixed(3)}</p>
        </div>
      </div>

      <div className="inventory-list">
        {inventory.length === 0 ? (
          <div className="empty-inventory">
            <p>No sugar in inventory yet!</p>
            <p>Harvest crops from your fields to collect sugar.</p>
          </div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Sugar ID</th>
                <th>Amount</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(sugar => (
                <tr key={sugar.id}>
                  <td className="sugar-id">{sugar.id.slice(0, 16)}...</td>
                  <td className="amount">{sugar.amount} 🍬</td>
                  <td className="owner">{sugar.owner.slice(0, 10)}...</td>
                  <td className="action">
                    <button
                      className="btn btn-small btn-success"
                      onClick={() => sellSugar(sugar.id, sugar.amount)}
                      disabled={loading}
                    >
                      💰 Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="sugar-info">
        <h3>Sugar Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>How to Get Sugar:</strong>
            <p>Plant crops in your fields and harvest them when they're ready.</p>
          </div>
          <div className="info-item">
            <strong>How to Sell Sugar:</strong>
            <p>Select sugar from your inventory and click the Sell button to earn SUI tokens.</p>
          </div>
          <div className="info-item">
            <strong>Sugar Value:</strong>
            <p>Each unit of sugar is worth approximately 0.001 SUI tokens.</p>
          </div>
          <div className="info-item">
            <strong>Rewards:</strong>
            <p>Selling sugar grants you rewards that can be used to buy upgrades.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
