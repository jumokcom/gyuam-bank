'use client'

import { useBank } from '@/hooks/useBank'

export default function RankingPage() {
  const { rankedStudents, loading } = useBank()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <p className="text-2xl text-white font-bold">순위를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-6 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-6xl animate-pulse opacity-20">⭐</div>
      <div className="absolute top-20 right-20 text-6xl animate-bounce opacity-20">🎉</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-pulse opacity-20">💎</div>
      <div className="absolute bottom-10 right-10 text-6xl animate-bounce opacity-20">🎈</div>
      <div className="absolute top-1/2 left-5 text-4xl animate-pulse opacity-20">🌟</div>
      <div className="absolute top-1/3 right-5 text-5xl animate-bounce opacity-20">🎊</div>
      
      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-4 border-white max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-3">
              🏆 규암은행 자산 순위 🏆
            </h1>
            <p className="text-xl font-bold text-purple-700">누가 가장 많은 돈을 모았을까요? 🤔💰</p>
          </div>
        </header>

        {/* 상위 3등 하이라이트 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {[rankedStudents[1], rankedStudents[0], rankedStudents[2]].filter(Boolean).map((student, _displayIndex) => {
              const actualRank = student.id === rankedStudents[0]?.id ? 0 : student.id === rankedStudents[1]?.id ? 1 : 2;
              return (
                <div
                  key={student.id}
                  className={`relative rounded-3xl p-8 text-center shadow-2xl border-4 transform transition-all duration-500 hover:scale-105 ${
                    actualRank === 0
                      ? 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-500 animate-pulse'
                      : actualRank === 1
                      ? 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-gray-500'
                      : 'bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 border-orange-500'
                  } ${actualRank === 0 ? 'lg:scale-110' : ''}`}
                  style={{ minHeight: '420px' }}
                >
                  {actualRank === 0 && (
                    <div className="absolute -top-6 -left-6 text-7xl animate-bounce">👑</div>
                  )}
                  {actualRank === 0 && (
                    <div className="absolute -top-3 -right-3 text-5xl animate-spin">⭐</div>
                  )}
                  
                  <div className={`${actualRank === 0 ? 'text-8xl' : 'text-7xl'} mb-6 filter drop-shadow-lg`}>
                    {actualRank === 0 ? '🥇' : actualRank === 1 ? '🥈' : '🥉'}
                  </div>
                  
                  <div className={`${actualRank === 0 ? 'text-3xl' : 'text-2xl'} font-black text-white mb-6 drop-shadow-lg bg-black/20 rounded-2xl py-3 px-6`}>
                    {student.name}
                  </div>
                  
                  <div className={`${actualRank === 0 ? 'text-3xl' : 'text-2xl'} font-black drop-shadow-lg mb-6 ${
                    actualRank === 0 ? 'text-yellow-800' :
                    actualRank === 1 ? 'text-gray-800' :
                    'text-orange-800'
                  } bg-white/80 rounded-2xl py-3 px-6`}>
                    {student.balance.toLocaleString()}원
                  </div>
                  
                  {actualRank === 0 && (
                    <div className="mt-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-6 py-3 rounded-full text-lg font-black shadow-lg border-2 border-yellow-700 animate-pulse">
                        🎉 최고 부자! 🎉
                      </span>
                    </div>
                  )}
                  
                  {actualRank === 1 && (
                    <div className="mt-4">
                      <span className="bg-gradient-to-r from-gray-400 to-gray-600 text-gray-900 px-4 py-2 rounded-full text-base font-bold shadow-lg">
                        🎊 멋진 2등! 🎊
                      </span>
                    </div>
                  )}
                  
                  {actualRank === 2 && (
                    <div className="mt-4">
                      <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900 px-4 py-2 rounded-full text-base font-bold shadow-lg">
                        🎈 훌륭한 3등! 🎈
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 