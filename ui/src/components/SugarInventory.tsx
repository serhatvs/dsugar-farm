import React, { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit'
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import './SugarInventory.css'

interface SugarItem {
  id: string
  amount: number
  owner: string
}

export default function SugarInventory() {
  const [inventory, setInventory] = useState<SugarItem[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const currentAccount = useCurrentAccount()
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransactionBlock()

  const PACKAGE_ID = '0xdeadbeef'
  const MODULE = 'sugar_farm'

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  // Zincirden sugar objelerini çek
  const loadInventory = async () => {
    if (!currentAccount) return
    setLoading(true)
    try {
      const client = new SuiClient({ url: getFullnodeUrl('testnet') })
      const objects = await client.getOwnedObjects({
        owner: currentAccount.address,
        filter: { StructType: `${PACKAGE_ID}::${MODULE}::Sugar` },
        options: { showContent: true },
      })
      const sugars: SugarItem[] = objects.data.map(obj => {
        const content = (obj.data as any)?.content?.fields
        return {
          id: obj.data.objectId,
          owner: content.owner,
          amount: Number(content.amount),
        }
      })
      setInventory(sugars)
    } catch (error) {
      showToast('error', 'Şekerler yüklenirken hata oluştu!')
      console.error('Error loading inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  // Zincire sugar satışı işlemi gönder
  const sellSugar = async (sugarId: string, amount: number) => {
    if (!currentAccount) {
      showToast('error', 'Cüzdan bağlı değil!')
      return
    }
    setLoading(true)
    try {
      const txb = new TransactionBlock()
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE}::sell_sugar`,
        arguments: [txb.object(sugarId), txb.object('0x6')], // 0x6: Clock objesi (örnek, gerçek clock id kullanılmalı)
      })
      const result = await signAndExecute({
        transactionBlock: txb,
        options: { showEffects: true, showEvents: true },
      })
      if (result?.effects?.status.status === 'success') {
        showToast('success', 'Şeker başarıyla satıldı!')
        await loadInventory()
      } else {
        showToast('error', 'Şeker satılamadı!')
      }
    } catch (error) {
      showToast('error', 'Satış sırasında hata oluştu: ' + (error as Error).message)
      console.error('Error selling sugar:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadInventory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount])

  const totalSugar = inventory.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="sugar-inventory">
      {toast && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
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
