// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openDemoModal, setOpenDemoModal] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const handleClaim = () => {
    setClaimed(true)
    setTimeout(() => setClaimed(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-400 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">MasterPass 🎟️</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Your exclusive ticket to join an immersive Web3 event. Claim your pass, connect your wallet, and let the experience begin.
        </p>

        <div className="space-y-4">
          <button
            data-test-id="connect-wallet"
            onClick={toggleWalletModal}
            className="btn btn-primary w-full"
          >
            Connect Wallet
          </button>

          {activeAddress && (
            <>
              <button
                data-test-id="transactions-demo"
                onClick={toggleDemoModal}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
              >
                Send Payment
              </button>

              <button
                onClick={handleClaim}
                className="btn bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Get Your MasterPass
              </button>
            </>
          )}

          {claimed && (
            <div className="mt-4 text-green-700 font-semibold">
              🎉 You've claimed your ticket!
            </div>
          )}
        </div>

        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
      </div>
    </div>
  )
}

export default Home
