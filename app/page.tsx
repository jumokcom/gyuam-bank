'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-5xl animate-pulse opacity-20">🏦</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">💰</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse opacity-20">💎</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20">🎈</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20">⭐</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20">🌟</div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-4 border-white max-w-4xl mx-auto">
            <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-4">
              🏦 규암은행 🏦
            </h1>
            <p className="text-lg font-bold text-purple-600">함께 돈을 모으고 배워보아요! 💫</p>
          </div>
        </header>

        {/* 메뉴 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* 홈 카드 */}
          <div className="relative rounded-3xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 border-blue-500 cursor-pointer h-64 flex flex-col justify-center">
            <div className="absolute -top-3 -right-3 text-4xl animate-bounce">🏠</div>
            <div className="text-6xl mb-4 filter drop-shadow-lg">🏦</div>
            <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">홈</h3>
            <p className="text-white font-bold drop-shadow bg-black/20 rounded-xl py-2 px-3">
              규암은행에 오신 것을 환영해요!
            </p>
          </div>

          {/* 자산현황 카드 */}
          <Link href="/assets">
            <div className="relative rounded-3xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 bg-gradient-to-br from-green-200 via-green-300 to-green-400 border-green-500 cursor-pointer h-64 flex flex-col justify-center">
              <div className="absolute -top-3 -right-3 text-4xl animate-pulse">💰</div>
              <div className="text-6xl mb-4 filter drop-shadow-lg">💳</div>
              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">자산현황</h3>
              <p className="text-white font-bold drop-shadow bg-black/20 rounded-xl py-2 px-3">
                내 돈이 얼마나 있는지 확인해요!
              </p>
            </div>
          </Link>

          {/* 은행 창구 카드 */}
          <Link href="/transaction">
            <div className="relative rounded-3xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 border-orange-500 cursor-pointer h-64 flex flex-col justify-center">
              <div className="absolute -top-3 -right-3 text-4xl animate-bounce">💸</div>
              <div className="text-6xl mb-4 filter drop-shadow-lg">🏧</div>
              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">은행 창구</h3>
              <p className="text-white font-bold drop-shadow bg-black/20 rounded-xl py-2 px-3">
                돈을 입금하고 출금해요!
              </p>
            </div>
          </Link>

          {/* 자산 순위 카드 */}
          <Link href="/ranking">
            <div className="relative rounded-3xl p-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-500 cursor-pointer h-64 flex flex-col justify-center">
              <div className="absolute -top-3 -right-3 text-4xl animate-spin">⭐</div>
              <div className="absolute -top-3 -left-3 text-3xl animate-bounce">👑</div>
              <div className="text-6xl mb-4 filter drop-shadow-lg">🏆</div>
              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">자산 순위</h3>
              <p className="text-white font-bold drop-shadow bg-black/20 rounded-xl py-2 px-3">
                누가 제일 많이 모았을까요?
              </p>
              <div className="mt-3">
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-yellow-900 px-3 py-1 rounded-full text-sm font-black shadow-lg border-2 border-yellow-700">
                  🎉 순위 확인! 🎉
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 하단 정보 카드 */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white text-center">
          <div className="text-4xl mb-3">🌈✨</div>
          <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-2">
            즐거운 은행 체험!
          </h2>
          <p className="text-lg font-bold text-purple-700 mb-1">
            친구들과 함께 돈의 소중함을 배워봐요!
          </p>
          <p className="text-base font-bold text-purple-600">
            저축하고, 관리하고, 성장하는 우리! 💪💖
          </p>
          
          {/* 재미있는 아이콘들 */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="text-3xl animate-bounce">🎊</div>
            <div className="text-3xl animate-pulse">💎</div>
            <div className="text-3xl animate-bounce">🎈</div>
            <div className="text-3xl animate-pulse">⭐</div>
            <div className="text-3xl animate-bounce">🌟</div>
          </div>
        </div>

        {/* 개발자 정보 */}
        <div className="mt-6 text-center">
          <p className="text-white/80 font-bold text-lg drop-shadow-lg">
            Developed by 고재우
          </p>
        </div>
      </div>
    </div>
  )
}
