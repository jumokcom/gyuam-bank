'use client'

import Navigation from '@/components/Navigation'
import { useBank } from '@/hooks/useBank'

export default function AssetsPage() {
  const { students, totalAssets, loading } = useBank()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">💰</div>
            <p className="text-2xl text-white font-bold">자산 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (balance: number) => {
    if (balance >= 2000) return 'from-green-200 via-green-300 to-green-400 border-green-500'
    if (balance >= 1500) return 'from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-500'
    if (balance >= 1000) return 'from-orange-200 via-orange-300 to-orange-400 border-orange-500'
    return 'from-red-200 via-red-300 to-red-400 border-red-500'
  }

  const getStatusIcon = (balance: number) => {
    if (balance >= 2000) return '💎'
    if (balance >= 1500) return '⭐'
    if (balance >= 1000) return '💰'
    return '🔥'
  }

  const getStatusText = (balance: number) => {
    if (balance >= 2000) return '💎 부자!'
    if (balance >= 1500) return '⭐ 우수!'
    if (balance >= 1000) return '💰 보통!'
    return '🔥 화이팅!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-5xl animate-pulse opacity-20">💰</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">💎</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse opacity-20">⭐</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20">🎈</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20">🌟</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20">🎊</div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 */}
        <header className="text-center mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border-4 border-white max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-2">
              💰 자산 현황 💰
            </h1>
            <p className="text-lg font-bold text-purple-700">모든 친구들의 돈을 확인해보세요! 🤔💫</p>
          </div>
        </header>

        {/* 네비게이션 */}
        <Navigation />

        {/* 전체 자산 요약 */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-3xl p-6 shadow-2xl border-4 border-yellow-500 text-center animate-pulse">
            <div className="text-6xl mb-3 filter drop-shadow-lg">🏦</div>
            <h2 className="text-3xl font-black text-yellow-800 mb-2 drop-shadow-lg">규암은행 전체 자산</h2>
            <p className="text-4xl font-black text-yellow-900 drop-shadow-lg">
              {totalAssets.toLocaleString()}원
            </p>
            <div className="mt-3">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-yellow-900 px-4 py-2 rounded-full text-lg font-black shadow-lg border-2 border-yellow-700">
                💎 총 18명의 자산! 💎
              </span>
            </div>
          </div>
        </div>

        {/* 개별 자산 현황 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white">
          <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-6 text-center">
            🌟 개별 자산 현황 🌟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className={`relative rounded-2xl p-4 text-center shadow-xl transform hover:scale-105 transition-all duration-300 border-3 bg-gradient-to-br ${getStatusColor(student.balance)}`}
              >
                <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
                  {getStatusIcon(student.balance)}
                </div>
                
                <div className="text-4xl mb-3 filter drop-shadow-lg">👤</div>
                
                <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg bg-black/20 rounded-xl py-1 px-3">
                  {student.name}
                </h3>
                
                <div className="text-2xl font-black drop-shadow-lg text-gray-800 bg-white/80 rounded-xl py-2 px-3 mb-2">
                  {student.balance.toLocaleString()}원
                </div>
                
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-black shadow-lg border-2 ${
                    student.balance >= 2000 ? 'bg-gradient-to-r from-green-400 to-green-600 text-green-900 border-green-700' :
                    student.balance >= 1500 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-yellow-700' :
                    student.balance >= 1000 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900 border-orange-700' :
                    'bg-gradient-to-r from-red-400 to-red-600 text-red-900 border-red-700'
                  }`}>
                    {getStatusText(student.balance)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 정보 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl text-center border-4 border-white shadow-lg">
            <div className="text-4xl mb-2">🌈✨</div>
            <p className="text-lg font-black text-purple-800 mb-1">모든 친구들이 열심히 모으고 있어요!</p>
            <p className="text-base font-bold text-purple-700">계속해서 돈을 모아봐요! 💪💖</p>
            
            {/* 재미있는 아이콘들 */}
            <div className="flex justify-center gap-3 mt-4">
              <div className="text-3xl animate-bounce">🎊</div>
              <div className="text-3xl animate-pulse">💎</div>
              <div className="text-3xl animate-bounce">🎈</div>
              <div className="text-3xl animate-pulse">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 