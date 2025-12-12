import React, { useState } from 'react'
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

  const PACKAGE_ID = '0xdeadbeef'
  const MODULE = 'sugar_farm'
  const GROW_TIME_MS = 10_000

  const mintField = async () => {
    setLoading(true)
    try {
      console.log('Minting field...')
      // Transaction would be built and executed here
      alert('Field minting functionality would be implemented with transaction builder')
    } catch (error) {
      console.error('Error minting field:', error)
    } finally {
      setLoading(false)
    }
  }

  const plantCrop = async (fieldId: string) => {
    setLoading(true)
    try {
      console.log('Planting crop in field:', fieldId)
      // Transaction would be built and executed here
      alert('Plant functionality would be implemented with transaction builder')
    } catch (error) {
      console.error('Error planting:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkGrowth = async (fieldId: string) => {
    setLoading(true)
    try {
      console.log('Checking growth for field:', fieldId)
      // Query blockchain for field status
      alert('Growth check would be implemented with SUI RPC queries')
    } catch (error) {
      console.error('Error checking growth:', error)
    } finally {
      setLoading(false)
    }
  }

  const harvest = async (fieldId: string) => {
    setLoading(true)
    try {
      console.log('Harvesting field:', fieldId)
      // Transaction would be built and executed here
      alert('Harvest functionality would be implemented with transaction builder')
    } catch (error) {
      console.error('Error harvesting:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="field-manager">
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
