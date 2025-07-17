'use client'

import { useState } from 'react'
import { useBank } from '../../hooks/useBank'
import Navigation from '../../components/Navigation'

type TransactionStep = 'select_customer' | 'select_type' | 'enter_amount' | 'confirm' | 'processing' | 'complete'

export default function TransactionPage() {
  const { students, updateStudentBalance, addTransactionSimple } = useBank()
  const [currentStep, setCurrentStep] = useState<TransactionStep>('select_customer')
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit')
  const [amount, setAmount] = useState('')
  const [nameInput, setNameInput] = useState('')

  const handleSelectStudent = () => {
    const student = students.find(s => s.name === nameInput.trim())
    if (student) {
      setSelectedStudent(student.name)
      setCurrentStep('select_type')
    } else {
      alert('고객 정보를 찾을 수 없습니다. 이름을 다시 확인해주세요.')
    }
  }

  const handleSelectType = (type: 'deposit' | 'withdraw') => {
    setTransactionType(type)
    setCurrentStep('enter_amount')
  }

  const handleEnterAmount = () => {
    const amountNum = parseInt(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('올바른 금액을 입력해주세요.')
      return
    }

    const student = students.find(s => s.name === selectedStudent)
    if (transactionType === 'withdraw' && student && student.balance < amountNum) {
      alert('잔액이 부족합니다.')
      return
    }

    setCurrentStep('confirm')
  }

  const handleConfirm = () => {
    setCurrentStep('processing')
    
    // 처리 중 애니메이션을 위한 딜레이
    setTimeout(() => {
      const amountNum = parseInt(amount)
      const finalAmount = transactionType === 'deposit' ? amountNum : -amountNum
      
      updateStudentBalance(selectedStudent, finalAmount)
      addTransactionSimple({
        studentName: selectedStudent,
        type: transactionType,
        amount: amountNum,
        timestamp: new Date()
      })
      
      setCurrentStep('complete')
    }, 2000)
  }

  const handleReset = () => {
    setCurrentStep('select_customer')
    setSelectedStudent('')
    setTransactionType('deposit')
    setAmount('')
    setNameInput('')
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'select_customer': return '👋 고객 확인'
      case 'select_type': return '💳 거래 종류 선택'
      case 'enter_amount': return '💰 금액 입력'
      case 'confirm': return '✅ 거래 확인'
      case 'processing': return '⏳ 처리 중...'
      case 'complete': return '🎉 거래 완료'
    }
  }

  const currentStudent = students.find(s => s.name === selectedStudent)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-5xl animate-pulse opacity-20">🏦</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">💰</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse opacity-20">💎</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20">🎈</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20">🌟</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20">🎊</div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-3">
              🏦 규암은행 창구 🏦
            </h1>
            <p className="text-xl font-bold text-purple-700">은행원님, 고객 응대를 시작하세요 ✨</p>
          </div>

          {/* 네비게이션 */}
          <Navigation />

          {/* 진행 단계 표시 */}
          <div className="mb-8">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl px-6 py-3 shadow-lg">
                <div className="text-3xl font-black">{getStepTitle()}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-3">
                {['select_customer', 'select_type', 'enter_amount', 'confirm', 'processing', 'complete'].map((step, index) => (
                  <div
                    key={step}
                    className={`w-5 h-5 rounded-full shadow-lg ${
                      ['select_customer', 'select_type', 'enter_amount', 'confirm', 'processing', 'complete'].indexOf(currentStep) >= index
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="min-h-96 flex flex-col justify-center">
            {currentStep === 'select_customer' && (
              <div className="text-center space-y-8">
                <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl p-6 border-4 border-white shadow-lg">
                  <div className="text-6xl mb-4 animate-bounce">👋</div>
                  <div className="text-3xl font-black text-purple-800 mb-4">
                    "안녕하세요! 성함이 어떻게 되세요?"
                  </div>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="고객 이름을 입력하세요"
                    className="w-full px-6 py-4 text-2xl text-center border-4 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none shadow-lg font-bold"
                    onKeyPress={(e) => e.key === 'Enter' && handleSelectStudent()}
                  />
                  <button
                    onClick={handleSelectStudent}
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl text-xl font-black hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105"
                  >
                    ✨ 고객 확인 ✨
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'select_type' && (
              <div className="text-center space-y-8">
                <div className="bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200 rounded-2xl p-6 border-4 border-white shadow-lg">
                  <div className="text-6xl mb-4 animate-bounce">💳</div>
                  <div className="text-3xl font-black text-purple-800 mb-2">
                    안녕하세요, <span className="text-yellow-600">{selectedStudent}</span> 고객님!
                  </div>
                  <div className="text-2xl font-bold text-purple-700">
                    어떤 업무를 도와드릴까요? 🤔
                  </div>
                </div>
                <div className="flex justify-center space-x-8">
                  <button
                    onClick={() => handleSelectType('deposit')}
                    className="bg-gradient-to-br from-green-400 to-green-600 text-white py-8 px-12 rounded-3xl text-3xl font-black hover:from-green-500 hover:to-green-700 transition-all shadow-2xl transform hover:scale-110 border-4 border-green-700"
                  >
                    💵 입금
                  </button>
                  <button
                    onClick={() => handleSelectType('withdraw')}
                    className="bg-gradient-to-br from-red-400 to-red-600 text-white py-8 px-12 rounded-3xl text-3xl font-black hover:from-red-500 hover:to-red-700 transition-all shadow-2xl transform hover:scale-110 border-4 border-red-700"
                  >
                    💸 출금
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'enter_amount' && (
              <div className="text-center space-y-8">
                <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 rounded-2xl p-6 border-4 border-white shadow-lg">
                  <div className="text-6xl mb-4 animate-pulse">💰</div>
                  <div className="text-2xl font-black text-purple-800 mb-2">
                    {transactionType === 'deposit' ? '입금' : '출금'} 금액을 입력해주세요
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    (현재 잔액: {currentStudent?.balance.toLocaleString()}원)
                  </div>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="금액을 입력하세요"
                    className="w-full px-6 py-4 text-4xl text-center border-4 border-yellow-300 rounded-2xl focus:border-yellow-500 focus:outline-none shadow-lg font-black"
                    onKeyPress={(e) => e.key === 'Enter' && handleEnterAmount()}
                  />
                  <div className="text-right text-xl text-purple-700 font-bold mt-2">원</div>
                  <button
                    onClick={handleEnterAmount}
                    className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl text-xl font-black hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg transform hover:scale-105"
                  >
                    💫 금액 확인 💫
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'confirm' && (
              <div className="text-center space-y-8">
                <div className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-2xl border-4 border-purple-300">
                  <div className="space-y-4 text-lg font-bold">
                    <div className="flex justify-between">
                      <span>고객명:</span> 
                      <span className="text-purple-600">{selectedStudent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>거래 종류:</span> 
                      <span className={transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                        {transactionType === 'deposit' ? '입금' : '출금'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>금액:</span> 
                      <span className="text-yellow-600">{parseInt(amount).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>현재 잔액:</span> 
                      <span>{currentStudent?.balance.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between border-t-2 pt-2">
                      <span>거래 후 잔액:</span> 
                      <span className="text-2xl font-black text-green-600">
                        {((currentStudent?.balance || 0) + (transactionType === 'deposit' ? parseInt(amount) : -parseInt(amount))).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => setCurrentStep('enter_amount')}
                    className="bg-gradient-to-r from-gray-500 to-gray-700 text-white py-3 px-8 rounded-2xl text-lg font-black hover:from-gray-600 hover:to-gray-800 transition-all shadow-lg"
                  >
                    ↩️ 수정
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-2xl text-lg font-black hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105"
                  >
                    🚀 거래 처리 🚀
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'processing' && (
              <div className="text-center space-y-8">
                <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl p-8 border-4 border-white shadow-lg">
                  <div className="text-6xl mb-4 animate-spin">⏳</div>
                  <div className="text-3xl font-black text-purple-800">거래를 처리하고 있습니다...</div>
                  <div className="flex justify-center mt-6">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600"></div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'complete' && (
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200 rounded-2xl p-4 border-4 border-white shadow-lg animate-pulse">
                  <div className="text-6xl mb-2 animate-bounce">🎉</div>
                  <div className="text-3xl font-black text-green-600">거래가 완료되었습니다!</div>
                </div>
                <div className="bg-white rounded-2xl p-4 max-w-md mx-auto shadow-2xl border-4 border-green-300">
                  <div className="space-y-2 text-lg font-bold">
                    <div className="text-xl font-black text-purple-800">{selectedStudent} 고객님</div>
                    <div className={`text-lg ${transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transactionType === 'deposit' ? '입금' : '출금'}: {parseInt(amount).toLocaleString()}원
                    </div>
                    <div className="text-2xl font-black text-green-600 bg-green-100 rounded-xl p-2">
                      현재 잔액: {students.find(s => s.name === selectedStudent)?.balance.toLocaleString()}원
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-2xl text-xl font-black hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105"
                >
                  🌟 다음 고객 응대 🌟
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 