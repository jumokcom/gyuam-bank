'use client'

import { useBank } from '@/hooks/useBank'

export default function RankingPage() {
  const { rankedStudents, totalAssets, loading } = useBank()

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-3 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse opacity-20">⭐</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">🎉</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-pulse opacity-20">💎</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-bounce opacity-20">🎈</div>
      <div className="absolute top-1/2 left-5 text-2xl animate-pulse opacity-20">🌟</div>
      <div className="absolute top-1/3 right-5 text-3xl animate-bounce opacity-20">🎊</div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 */}
        <header className="text-center mb-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border-4 border-white max-w-3xl mx-auto">
            <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-1">
              🏆 규암은행 자산 순위 🏆
            </h1>
            <p className="text-base font-bold text-purple-700">누가 가장 많은 돈을 모았을까요? 🤔💰</p>
          </div>
        </header>

        {/* 상위 3명 하이라이트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[rankedStudents[1], rankedStudents[0], rankedStudents[2]].filter(Boolean).map((student, displayIndex) => {
            const actualRank = student.id === rankedStudents[0]?.id ? 0 : student.id === rankedStudents[1]?.id ? 1 : 2;
            return (
              <div
                key={student.id}
                className={`relative rounded-2xl p-4 text-center shadow-xl border-3 ${
                  actualRank === 0
                    ? 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-500 animate-pulse'
                    : actualRank === 1
                    ? 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-gray-500'
                    : 'bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 border-orange-500'
                } ${actualRank === 0 ? 'md:scale-105' : ''}`}
              >
                {actualRank === 0 && (
                  <div className="absolute -top-3 -left-3 text-4xl animate-bounce">👑</div>
                )}
                {actualRank === 0 && (
                  <div className="absolute -top-1 -right-1 text-3xl animate-spin">⭐</div>
                )}
                
                <div className={`${actualRank === 0 ? 'text-6xl' : 'text-5xl'} mb-2 filter drop-shadow-lg`}>
                  {actualRank === 0 ? '🥇' : actualRank === 1 ? '🥈' : '🥉'}
                </div>
                
                <div className={`${actualRank === 0 ? 'text-xl' : 'text-lg'} font-black text-white mb-2 drop-shadow-lg bg-black/20 rounded-xl py-1 px-3`}>
                  {student.name}
                </div>
                
                <div className={`${actualRank === 0 ? 'text-xl' : 'text-lg'} font-black drop-shadow-lg ${
                  actualRank === 0 ? 'text-yellow-800' :
                  actualRank === 1 ? 'text-gray-800' :
                  'text-orange-800'
                } bg-white/80 rounded-xl py-1 px-3`}>
                  {student.balance.toLocaleString()}원
                </div>
                
                {actualRank === 0 && (
                  <div className="mt-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-3 py-1 rounded-full text-sm font-black shadow-lg border-2 border-yellow-700 animate-pulse">
                      🎉 최고 부자! 🎉
                    </span>
                  </div>
                )}
                
                {actualRank === 1 && (
                  <div className="mt-2">
                    <span className="bg-gradient-to-r from-gray-400 to-gray-600 text-gray-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      🎊 멋진 2등! 🎊
                    </span>
                  </div>
                )}
                
                {actualRank === 2 && (
                  <div className="mt-2">
                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      🎈 훌륭한 3등! 🎈
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 4등부터 10등까지 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border-3 border-white">
          <div className="space-y-2">
            {rankedStudents.slice(3, 10).map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200 transition-all duration-300 shadow-md border border-white"
              >
                <div className="flex items-center gap-3">
                  {/* 순위 */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-md border border-white">
                    <span className="text-lg font-black text-white drop-shadow">
                      {index + 4}
                    </span>
                  </div>
                  
                  {/* 이름 */}
                  <div className="bg-white/70 rounded-xl px-3 py-1 shadow-sm">
                    <p className="text-lg font-black text-purple-800">
                      {student.name}
                    </p>
                  </div>
                </div>

                {/* 자산 */}
                <div className="text-right">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl px-3 py-1 shadow-md">
                    <p className="text-lg font-black drop-shadow">
                      {student.balance.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 