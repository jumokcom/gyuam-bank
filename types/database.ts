// 초등학생용 가상 은행 타입 정의

export interface Student {
  id: number
  name: string
  balance: number
}

export interface Transaction {
  id: number
  student_id: number
  type: 'deposit' | 'withdrawal'
  amount: number
  description: string
  created_at: string
} 