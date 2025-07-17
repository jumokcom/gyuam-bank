'use client'

import { useState, useEffect } from 'react'
import { initialStudents, STORAGE_KEYS } from '@/data/students'
import TransactionModal from '@/components/TransactionModal'
import { Student, Transaction } from '@/types/database'

export default function Home() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showRanking, setShowRanking] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit')
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)

  // 초기 데이터 로드
  useEffect(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS)
    const parsedStudents = savedStudents ? JSON.parse(savedStudents) : null
    
    // 학생 수가 다르면 데이터 초기화 (15명 → 18명 대응)
    if (!parsedStudents || parsedStudents.length !== initialStudents.length) {
      // 초기 데이터 설정
      const studentsWithId = initialStudents.map((student, index) => ({
        ...student,
        id: index + 1
      }))
      setStudents(studentsWithId)
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(studentsWithId))
      // 거래 내역도 초기화
      localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS)
      setTransactions([])
    } else {
      setStudents(parsedStudents)
      
      // 기존 데이터가 있는 경우 거래 내역도 로드
      const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions))
      }
    }
  }, [])

  // 학생 선택
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    setShowRanking(false)
  }

  // 순위 표시
  const handleShowRanking = () => {
    setShowRanking(true)
    setSelectedStudent(null)
    setShowTransactionHistory(false)
  }

  // 거래 내역 표시
  const handleShowTransactionHistory = () => {
    setShowTransactionHistory(true)
    setShowRanking(false)
    setSelectedStudent(null)
  }

  // 입금/출금 모달 열기
  const handleOpenTransactionModal = (type: 'deposit' | 'withdrawal') => {
    setTransactionType(type)
    setShowTransactionModal(true)
  }

  // 거래 처리
  const handleTransaction = (amount: number, description: string) => {
    if (!selectedStudent) return

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      student_id: selectedStudent.id,
      type: transactionType,
      amount,
      description,
      created_at: new Date().toISOString()
    }

    // 학생 잔액 업데이트
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        const newBalance = transactionType === 'deposit' 
          ? student.balance + amount 
          : student.balance - amount
        return { ...student, balance: newBalance }
      }
      return student
    })

    // 상태 업데이트
    const updatedTransactions = [...transactions, newTransaction]
    setStudents(updatedStudents)
    setTransactions(updatedTransactions)
    
    // 선택된 학생 정보도 업데이트
    const updatedSelectedStudent = updatedStudents.find(s => s.id === selectedStudent.id)
    setSelectedStudent(updatedSelectedStudent || null)

    // 로컬 스토리지 저장
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updatedStudents))
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions))
  }

  // 총 자산 계산
  const totalAssets = students.reduce((sum, student) => sum + student.balance, 0)

  // 순위 정렬된 학생 목록
  const rankedStudents = [...students].sort((a, b) => b.balance - a.balance)

  // 선택된 학생의 거래 내역
  const selectedStudentTransactions = selectedStudent 
    ? transactions
        .filter(t => t.student_id === selectedStudent.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">🏦 규암은행</h1>
          <p className="text-lg text-blue-600">초등학생 가상 은행 체험</p>
        </header>

        {/* 총 자산 현황 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 자산 현황</h2>
          <div className="bg-blue-100 rounded-xl p-4">
            <p className="text-lg text-blue-800 font-semibold">
              전체 총 자산 (18명): <span className="text-2xl font-bold">{totalAssets.toLocaleString()}원</span>
            </p>
          </div>
        </div>

        {/* 학생 선택 또는 순위 보기 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleShowRanking}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              🏆 자산 순위 보기
            </button>
            <button
              onClick={handleShowTransactionHistory}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              📜 전체 거래 내역
            </button>
          </div>

          {/* 학생 선택 버튼들 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  selectedStudent?.id === student.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {student.name}
              </button>
            ))}
          </div>
        </div>

        {/* 선택된 학생 정보 */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              👤 {selectedStudent.name}님의 계좌
            </h3>
            <div className="bg-green-100 rounded-xl p-4 mb-4">
              <p className="text-lg text-green-800 font-semibold">
                현재 잔액: <span className="text-2xl font-bold">{selectedStudent.balance.toLocaleString()}원</span>
              </p>
            </div>
            
            {/* 입출금 버튼 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => handleOpenTransactionModal('deposit')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition-colors"
              >
                💰 입금하기
              </button>
              <button 
                onClick={() => handleOpenTransactionModal('withdrawal')}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition-colors"
              >
                💸 출금하기
              </button>
            </div>

            {/* 선택된 학생의 거래 내역 */}
            {selectedStudentTransactions.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-lg font-bold text-gray-800 mb-3">📋 최근 거래 내역</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedStudentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {transaction.type === 'deposit' ? '💰' : '💸'}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.created_at).toLocaleDateString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${
                        transaction.type === 'deposit' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 자산 순위 */}
        {showRanking && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 자산 순위</h3>
            <div className="space-y-3">
              {rankedStudents.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    index === 0
                      ? 'bg-yellow-100 border-2 border-yellow-300'
                      : index === 1
                      ? 'bg-gray-100 border-2 border-gray-300'
                      : index === 2
                      ? 'bg-orange-100 border-2 border-orange-300'
                      : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}위`}
                    </span>
                    <span className="text-lg font-semibold">{student.name}</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {student.balance.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 전체 거래 내역 */}
        {showTransactionHistory && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📜 전체 거래 내역</h3>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">아직 거래 내역이 없습니다</p>
                <p className="text-gray-400">학생을 선택하고 입금/출금을 해보세요!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((transaction) => {
                    const student = students.find(s => s.id === transaction.student_id)
                    return (
                      <div key={transaction.id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {transaction.type === 'deposit' ? '💰' : '💸'}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-800">
                                👤 {student?.name} - {transaction.description}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(transaction.created_at).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <span className={`font-bold text-xl ${
                            transaction.type === 'deposit' ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        )}

        {/* 입출금 모달 */}
        <TransactionModal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          student={selectedStudent}
          type={transactionType}
          onTransaction={handleTransaction}
        />
      </div>
    </div>
  )
}
