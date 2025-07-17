'use client'

import { useState } from 'react'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  student: {
    id: number
    name: string
    balance: number
  } | null
  type: 'deposit' | 'withdrawal'
  onTransaction: (amount: number, description: string) => void
}

export default function TransactionModal({
  isOpen,
  onClose,
  student,
  type,
  onTransaction
}: TransactionModalProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !student) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const numAmount = parseInt(amount)
    
    // 유효성 검사
    if (!amount || numAmount <= 0) {
      setError('처리할 금액을 정확히 입력해주세요')
      return
    }

    if (type === 'withdrawal' && numAmount > student.balance) {
      setError('고객님의 계좌 잔액이 부족합니다')
      return
    }

    if (!description.trim()) {
      setError('거래 내역을 입력해주세요')
      return
    }

    // 거래 실행
    onTransaction(numAmount, description.trim())
    
    // 초기화
    setAmount('')
    setDescription('')
    setError('')
    onClose()
  }

  const handleClose = () => {
    setAmount('')
    setDescription('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {type === 'deposit' ? '💰 입금 처리' : '💸 출금 처리'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">👤 {student.name} 고객님</p>
          <p className="text-gray-600">계좌 잔액: {student.balance.toLocaleString()}원</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'deposit' ? '입금 처리' : '출금 처리'} 금액
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="처리할 금액을 입력하세요"
              min="1"
              step="1"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              거래 내역
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="예: 용돈 저금, 간식비 인출, 저축 등"
              maxLength={50}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-xl text-white font-semibold transition-colors ${
                type === 'deposit'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {type === 'deposit' ? '입금 처리' : '출금 처리'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 