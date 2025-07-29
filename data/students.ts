import { Student } from '@/types/database'

// 3개 팀 계좌 데이터
export const initialStudents: Omit<Student, 'id'>[] = [
  { name: '서왕', balance: 1000 },
  { name: '이글스', balance: 1000 },
  { name: '야르', balance: 1000 }
]

// 로컬 스토리지용 키
export const STORAGE_KEYS = {
  STUDENTS: 'gyuam-bank-students',
  TRANSACTIONS: 'gyuam-bank-transactions'
} as const 