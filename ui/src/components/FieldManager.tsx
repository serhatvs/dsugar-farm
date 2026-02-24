import React, { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import './FieldManager.css'

interface Field {
  id: string
  owner: string
  plantedAt: number
  cropReady: boolean
}

export default function FieldManager() {
  const [fields, setFields] = useState<Field[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const currentAccount = useCurrentAccount()
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransactionBlock()

  const PACKAGE_ID = '0xdeadbeef'
  const MODULE = 'sugar_farm'
  const GROW_TIME_MS = 10_000

  // Zincirden field'ları çekmek için Sui RPC entegrasyonu
  const fetchFields = async () => {
    if (!currentAccount) return
    const client = new SuiClient({ url: getFullnodeUrl('testnet') })
    // Field objelerini bulmak için owner address ile obje sorgulama
    const objects = await client.getOwnedObjects({
      owner: currentAccount.address,
      filter: { StructType: `${PACKAGE_ID}::${MODULE}::Field` },
      options: { showContent: true },
    })
    const fieldsOnChain: Field[] = objects.data.map(obj => {
      const content = (obj.data as any)?.content?.fields
      return {
        id: obj.data.objectId,
        owner: content.owner,
        plantedAt: Number(content.planted_at),
        cropReady: content.crop_ready,
      }
    })
    setFields(fieldsOnChain)
  }

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const mintField = async () => {
    if (!currentAccount) {
      showToast('error', 'Cüzdan bağlı değil!')
      return
    }
    setLoading(true)
    try {
      const txb = new TransactionBlock()
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE}::mint_field`,
        arguments: [txb.pure(currentAccount.address)],
      })
      const result = await signAndExecute({
        transactionBlock: txb,
        options: { showEffects: true, showEvents: true },
      })
      if (result?.effects?.status.status === 'success') {
        showToast('success', 'Tarla başarıyla oluşturuldu!')
        await fetchFields()
      } else {
        showToast('error', 'Tarla oluşturulamadı!')
      }
    } catch (error) {
      showToast('error', 'İşlem sırasında hata oluştu: ' + (error as Error).message)
      console.error('Error minting field:', error)
    } finally {
      setLoading(false)
    }
  }

  const plantCrop = async (fieldId: string) => {
    if (!currentAccount) {
      showToast('error', 'Cüzdan bağlı değil!')
      return
    }
    setLoading(true)
    try {
      const txb = new TransactionBlock()
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE}::plant`,
        arguments: [txb.object(fieldId), txb.object('0x6')], // 0x6: Clock objesi (örnek, gerçek clock id kullanılmalı)
      })
      const result = await signAndExecute({
        transactionBlock: txb,
        options: { showEffects: true, showEvents: true },
      })
      if (result?.effects?.status.status === 'success') {
        showToast('success', 'Ekim başarılı!')
        await fetchFields()
      } else {
        showToast('error', 'Ekim başarısız!')
      }
    } catch (error) {
      showToast('error', 'İşlem sırasında hata oluştu: ' + (error as Error).message)
      console.error('Error planting:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkGrowth = async (fieldId: string) => {
    if (!currentAccount) {
      showToast('error', 'Cüzdan bağlı değil!')
      return
    }
    setLoading(true)
    try {
      const txb = new TransactionBlock()
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE}::check_grow`,
        arguments: [txb.object(fieldId), txb.object('0x6')], // 0x6: Clock objesi (örnek, gerçek clock id kullanılmalı)
      })
      const result = await signAndExecute({
        transactionBlock: txb,
        options: { showEffects: true, showEvents: true },
      })
      if (result?.effects?.status.status === 'success') {
        showToast('success', 'Büyüme kontrolü başarılı!')
        await fetchFields()
      } else {
        showToast('error', 'Büyüme kontrolü başarısız!')
      }
    } catch (error) {
      showToast('error', 'İşlem sırasında hata oluştu: ' + (error as Error).message)
      console.error('Error checking growth:', error)
    } finally {
      setLoading(false)
    }
  }

  const harvest = async (fieldId: string) => {
    if (!currentAccount) {
      showToast('error', 'Cüzdan bağlı değil!')
      return
    }
    setLoading(true)
    try {
      const txb = new TransactionBlock()
      txb.moveCall({
        target: `${PACKAGE_ID}::${MODULE}::harvest`,
        arguments: [txb.object(fieldId), txb.object(currentAccount.address), txb.object('0x6')], // 0x6: Clock objesi (örnek, gerçek clock id kullanılmalı)
      })
      const result = await signAndExecute({
        transactionBlock: txb,
        options: { showEffects: true, showEvents: true },
      })
      if (result?.effects?.status.status === 'success') {
        showToast('success', 'Hasat başarılı!')
        await fetchFields()
      } else {
        showToast('error', 'Hasat başarısız!')
      }
    } catch (error) {
      showToast('error', 'İşlem sırasında hata oluştu: ' + (error as Error).message)
      console.error('Error harvesting:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount])

  return (
    <div className="field-manager">
      {toast && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
      <div className="manager-header">
        <h2>Your Fields</h2>
        <button 
          className="btn btn-primary" 
          onClick={mintField}
          disabled={loading}
        >
          {loading ? 'Processing...' : '+ Create New Field'}
        </button>
      </div>

      <div className="fields-grid">
        {fields.length === 0 ? (
          <div className="empty-state">
            <p>No fields yet! Create your first field to start farming.</p>
          </div>
        ) : (
          fields.map(field => (
            <div key={field.id} className="field-card">
              <div className="field-status">
                <h3>Field {field.id.slice(0, 8)}</h3>
                <span className={`status-badge ${field.cropReady ? 'ready' : 'growing'}`}>
                  {field.cropReady ? '✓ Ready to Harvest' : '🌱 Growing'}
                </span>
              </div>

              <div className="field-info">
                <p><strong>Owner:</strong> {field.owner.slice(0, 10)}...</p>
                <p><strong>Planted At:</strong> {new Date(field.plantedAt).toLocaleString()}</p>
              </div>

              <div className="field-actions">
                {!field.plantedAt ? (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => plantCrop(field.id)}
                    disabled={loading}
                  >
                    🌾 Plant Crop
                  </button>
                ) : field.cropReady ? (
                  <button 
                    className="btn btn-success"
                    onClick={() => harvest(field.id)}
                    disabled={loading}
                  >
                    🍬 Harvest
                  </button>
                ) : (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => checkGrowth(field.id)}
                    disabled={loading}
                  >
                    ⏱️ Check Growth
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="game-info">
        <h3>How to Play</h3>
        <ul>
          <li>Create a new field</li>
          <li>Plant a crop (will grow for {GROW_TIME_MS / 1000} seconds)</li>
          <li>Check growth status and harvest when ready</li>
          <li>Collect sugar from harvested crops</li>
          <li>Sell sugar in the inventory</li>
        </ul>
      </div>
    </div>
  )
}
