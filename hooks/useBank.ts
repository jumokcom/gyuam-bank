'use client'

import { useState, useEffect } from 'react'
import { initialStudents, STORAGE_KEYS } from '@/data/students'
import { Student, Transaction } from '@/types/database'

export function useBank() {
  const [students, setStudents] = useState<Student[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

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
    
    setLoading(false)
  }, [])

  // 학생 잔액 업데이트 (이름으로)
  const updateStudentBalance = (studentName: string, amount: number) => {
    const updatedStudents = students.map(student => {
      if (student.name === studentName) {
        return { ...student, balance: student.balance + amount }
      }
      return student
    })
    
    setStudents(updatedStudents)
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updatedStudents))
  }

  // 거래 추가 (새로운 형태 - 객체로)
  const addTransactionSimple = (transaction: {
    studentName: string
    type: 'deposit' | 'withdraw'
    amount: number
    timestamp: Date
  }) => {
    const student = students.find(s => s.name === transaction.studentName)
    if (!student) return { success: false, error: 'Student not found' }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      student_id: student.id,
      type: transaction.type === 'withdraw' ? 'withdrawal' : transaction.type,
      amount: transaction.amount,
      description: `${transaction.type === 'deposit' ? '입금' : '출금'}: ${transaction.amount.toLocaleString()}원`,
      created_at: transaction.timestamp.toISOString()
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions))

    return { success: true, error: null }
  }

  // 거래 처리 (기존 형태)
  const addTransaction = (studentId: number, type: 'deposit' | 'withdrawal', amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      student_id: studentId,
      type,
      amount,
      description,
      created_at: new Date().toISOString()
    }

    // 학생 잔액 업데이트
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        const newBalance = type === 'deposit' 
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

    // 로컬 스토리지 저장
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updatedStudents))
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions))

    return { success: true, error: null }
  }

  // 총 자산 계산
  const totalAssets = students.reduce((sum, student) => sum + student.balance, 0)

  // 순위 정렬된 학생 목록
  const rankedStudents = [...students].sort((a, b) => b.balance - a.balance)

  // 학생별 거래 내역 조회
  const getStudentTransactions = (studentId: number) => {
    return transactions
      .filter(t => t.student_id === studentId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  // 최근 거래 내역 (전체)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return {
    students,
    transactions,
    loading,
    totalAssets,
    rankedStudents,
    recentTransactions,
    addTransaction,
    addTransactionSimple,
    updateStudentBalance,
    getStudentTransactions
  }
} 