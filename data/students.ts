import { Student } from '@/types/database'

// 18명의 초등학생 실제 데이터
export const initialStudents: Omit<Student, 'id'>[] = [
  { name: '김하람', balance: 1000 },
  { name: '노우주', balance: 1000 },
  { name: '배지유', balance: 1000 },
  { name: '윤사랑', balance: 1000 },
  { name: '윤우리', balance: 1000 },
  { name: '이채린', balance: 1000 },
  { name: '전소율', balance: 1000 },
  { name: '박하영', balance: 1000 },
  { name: '이엘', balance: 1000 },
  { name: '전현호', balance: 1000 },
  { name: '노우찬', balance: 1000 },
  { name: '문지후', balance: 1000 },
  { name: '방예빈', balance: 1000 },
  { name: '이수민', balance: 1000 },
  { name: '장도율', balance: 1000 },
  { name: '조건희', balance: 1000 },
  { name: '조해주', balance: 1000 },
  { name: '주예나', balance: 1000 }
]

// 로컬 스토리지용 키
export const STORAGE_KEYS = {
  STUDENTS: 'gyuam-bank-students',
  TRANSACTIONS: 'gyuam-bank-transactions'
} as const 