'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RouletteItem {
  id: string
  name: string
  weight: number
  color: string
}

export default function RoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [items, setItems] = useState<RouletteItem[]>([
    { id: '1', name: '🎯 항목 1', weight: 1, color: 'from-red-400 to-red-600' }
  ])

  // localStorage에서 설정된 항목들 불러오기
  useEffect(() => {
    const loadSettings = () => {
      const savedItems = localStorage.getItem('rouletteItems')
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems)
          if (parsedItems.length >= 1) {
            setItems(parsedItems)
          }
        } catch (error) {
          console.error('저장된 룰렛 설정을 불러오는데 실패했습니다:', error)
        }
      }
    }

    loadSettings()

    // 페이지가 포커스될 때마다 설정 새로고침
    const handleFocus = () => {
      loadSettings()
    }

    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // 가중치를 고려한 룰렛 스핀
  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedItem(null)
    
    // 가중치 기반으로 미리 결과 선택
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
    const random = Math.random() * totalWeight
    let currentWeight = 0
    let selectedItemResult = items[0]
    let selectedIndex = 0
    
    for (let i = 0; i < items.length; i++) {
      currentWeight += items[i].weight
      if (random <= currentWeight) {
        selectedItemResult = items[i]
        selectedIndex = i
        break
      }
    }
    
    // 선택된 항목의 각도 계산
    const itemWeight = selectedItemResult.weight
    const percentage = (itemWeight / totalWeight) * 100
    const startAngle = items.slice(0, selectedIndex).reduce((sum, prevItem) => sum + (prevItem.weight / totalWeight) * 360, 0)
    const targetAngle = startAngle + (percentage * 3.6) / 2 // 항목의 중앙
    
    // 5-8번 추가 회전 + 타겟 각도
    const spins = Math.floor(Math.random() * 4) + 5
    const finalRotation = rotation + spins * 360 + (360 - targetAngle)
    
    setRotation(finalRotation)

    setTimeout(() => {
      setSelectedItem(selectedItemResult.name)
      setIsSpinning(false)
    }, 4000) // 4초로 증가
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-5xl animate-pulse opacity-20">🎯</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">🎰</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse opacity-20">🎲</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20">🎮</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20">⭐</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20">🌟</div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col min-h-screen py-4">
        {/* 헤더 */}
        <header className="text-center mb-6 mt-4 relative">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-6 py-3 shadow-2xl border-4 border-white max-w-2xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-1">
              🎯 행운의 룰렛 🎯
            </h1>
            <p className="text-sm lg:text-base font-bold text-purple-600">돌려돌려 돌림판! 무엇이 나올까요? 🎪</p>
          </div>
          
          {/* 설정 버튼 */}
          <Link href="/roulette-setting">
            <button className="absolute top-3 right-3 lg:right-8 bg-white/80 hover:bg-white text-purple-600 px-3 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 hover:scale-105 text-sm">
              ⚙️ 설정
            </button>
          </Link>
        </header>

        {/* 메인 컨텐츠 영역 - 데스크톱 */}
        <div className="hidden lg:block relative flex-1 flex items-center justify-center">
          {/* 룰렛 (화면 중앙) */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* 룰렛 휠 */}
              <div 
                className={`relative w-[600px] h-[600px] xl:w-[700px] xl:h-[700px] ${isSpinning ? 'transition-transform duration-[4000ms] ease-out' : 'transition-transform duration-500 ease-out'}`}
                style={{ 
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  className="rounded-full border-8 border-white shadow-2xl"
                >
                  {items.map((item, index) => {
                    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
                    const percentage = (item.weight / totalWeight) * 100
                    const startAngle = items.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.weight / totalWeight) * 360, 0)
                    const endAngle = startAngle + (percentage * 3.6)
                    
                    // SVG path for arc
                    const radius = 190
                    const centerX = 200
                    const centerY = 200
                    
                    const startAngleRad = (startAngle - 90) * Math.PI / 180
                    const endAngleRad = (endAngle - 90) * Math.PI / 180
                    
                    const x1 = centerX + radius * Math.cos(startAngleRad)
                    const y1 = centerY + radius * Math.sin(startAngleRad)
                    const x2 = centerX + radius * Math.cos(endAngleRad)
                    const y2 = centerY + radius * Math.sin(endAngleRad)
                    
                    const largeArcFlag = percentage > 50 ? 1 : 0
                    
                    const pathData = [
                      `M ${centerX} ${centerY}`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ')

                    // 텍스트 위치 계산
                    const textAngle = startAngle + (percentage * 3.6) / 2
                    const textRadius = radius * 0.7
                    const textAngleRad = (textAngle - 90) * Math.PI / 180
                    const textX = centerX + textRadius * Math.cos(textAngleRad)
                    const textY = centerY + textRadius * Math.sin(textAngleRad)

                    // 색상 매핑
                    const colorMap: { [key: string]: string } = {
                      'from-red-400 to-red-600': '#f87171',
                      'from-blue-400 to-blue-600': '#60a5fa',
                      'from-green-400 to-green-600': '#4ade80',
                      'from-yellow-400 to-yellow-600': '#facc15',
                      'from-purple-400 to-purple-600': '#a855f7',
                      'from-pink-400 to-pink-600': '#f472b6',
                      'from-orange-400 to-orange-600': '#fb923c',
                      'from-teal-400 to-teal-600': '#2dd4bf',
                      'from-indigo-400 to-indigo-600': '#818cf8',
                      'from-rose-400 to-rose-600': '#fb7185',
                      'from-cyan-400 to-cyan-600': '#22d3ee',
                      'from-emerald-400 to-emerald-600': '#10b981'
                    }
                    
                    return (
                      <g key={item.id}>
                        <path
                          d={pathData}
                          fill={colorMap[item.color] || '#6b7280'}
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize={Math.max(18, Math.min(36, percentage / 1.5))}
                          fontWeight="bold"
                          className="drop-shadow-lg"
                          transform={`rotate(${percentage > 20 ? textAngle : 0} ${textX} ${textY})`}
                        >
                          {item.name.length > 18 ? item.name.substring(0, 18) + '...' : item.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* 중앙 버튼 */}
              <button
                onClick={spinRoulette}
                disabled={isSpinning}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 xl:w-40 xl:h-40 rounded-full text-4xl xl:text-5xl font-black shadow-lg transition-all duration-200 border-4 ${
                  isSpinning 
                    ? 'bg-gray-400 border-gray-500 cursor-not-allowed' 
                    : 'bg-white border-yellow-500 hover:scale-110 hover:bg-yellow-100 cursor-pointer'
                }`}
              >
                {isSpinning ? '🔄' : '🎯'}
              </button>

              {/* 포인터 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-10 border-r-10 border-t-20 border-transparent border-t-red-600 z-10"></div>
            </div>
          </div>

          {/* 오른쪽 영역 (절대 위치) */}
          <div className="absolute top-1/2 right-6 xl:right-8 w-72 xl:w-80 z-10" style={{ transform: 'translateY(-50%) translateX(80px)' }}>
            {/* 결과 표시 */}
            <div className="mb-6">
              {selectedItem ? (
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl px-6 py-6 shadow-2xl border-4 border-white animate-bounce">
                  <div className="text-5xl mb-3 text-center">🎉</div>
                  <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-3 text-center">
                    결과 발표!
                  </h2>
                  <p className="text-xl font-bold text-purple-700 text-center bg-purple-100 rounded-2xl py-3 px-4">
                    {selectedItem}
                  </p>
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl px-6 py-6 shadow-lg border-4 border-white/60">
                  <div className="text-4xl mb-3 text-center opacity-50">🎯</div>
                  <h2 className="text-lg font-bold text-gray-500 text-center mb-2">
                    결과 대기 중...
                  </h2>
                  <p className="text-sm text-gray-400 text-center">
                    룰렛을 돌려보세요!
                  </p>
                </div>
              )}
            </div>

            {/* 룰렛 돌리기 버튼 */}
            <div>
              <button 
                onClick={spinRoulette}
                disabled={isSpinning}
                className={`w-full px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-200 hover:scale-105 text-lg ${
                  isSpinning 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                }`}
              >
                {isSpinning ? '🔄 돌리는 중...' : '🎯 룰렛 돌리기'}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일용 중앙 배치 */}
        <div className="lg:hidden flex flex-col items-center mb-12">
          <div className="relative mb-8">
            {/* 룰렛 휠 */}
            <div 
              className={`relative w-[450px] h-[450px] ${isSpinning ? 'transition-transform duration-[4000ms] ease-out' : 'transition-transform duration-500 ease-out'}`}
              style={{ 
                transform: `rotate(${rotation}deg)`
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                className="rounded-full border-8 border-white shadow-2xl"
              >
                {items.map((item, index) => {
                  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
                  const percentage = (item.weight / totalWeight) * 100
                  const startAngle = items.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.weight / totalWeight) * 360, 0)
                  const endAngle = startAngle + (percentage * 3.6)
                  
                  // SVG path for arc
                  const radius = 190
                  const centerX = 200
                  const centerY = 200
                  
                  const startAngleRad = (startAngle - 90) * Math.PI / 180
                  const endAngleRad = (endAngle - 90) * Math.PI / 180
                  
                  const x1 = centerX + radius * Math.cos(startAngleRad)
                  const y1 = centerY + radius * Math.sin(startAngleRad)
                  const x2 = centerX + radius * Math.cos(endAngleRad)
                  const y2 = centerY + radius * Math.sin(endAngleRad)
                  
                  const largeArcFlag = percentage > 50 ? 1 : 0
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ')

                  // 텍스트 위치 계산
                  const textAngle = startAngle + (percentage * 3.6) / 2
                  const textRadius = radius * 0.7
                  const textAngleRad = (textAngle - 90) * Math.PI / 180
                  const textX = centerX + textRadius * Math.cos(textAngleRad)
                  const textY = centerY + textRadius * Math.sin(textAngleRad)

                  // 색상 매핑
                  const colorMap: { [key: string]: string } = {
                    'from-red-400 to-red-600': '#f87171',
                    'from-blue-400 to-blue-600': '#60a5fa',
                    'from-green-400 to-green-600': '#4ade80',
                    'from-yellow-400 to-yellow-600': '#facc15',
                    'from-purple-400 to-purple-600': '#a855f7',
                    'from-pink-400 to-pink-600': '#f472b6',
                    'from-orange-400 to-orange-600': '#fb923c',
                    'from-teal-400 to-teal-600': '#2dd4bf',
                    'from-indigo-400 to-indigo-600': '#818cf8',
                    'from-rose-400 to-rose-600': '#fb7185',
                    'from-cyan-400 to-cyan-600': '#22d3ee',
                    'from-emerald-400 to-emerald-600': '#10b981'
                  }
                  
                  return (
                    <g key={item.id}>
                      <path
                        d={pathData}
                        fill={colorMap[item.color] || '#6b7280'}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={Math.max(16, Math.min(28, percentage / 2.5))}
                        fontWeight="bold"
                        className="drop-shadow-lg"
                        transform={`rotate(${percentage > 20 ? textAngle : 0} ${textX} ${textY})`}
                      >
                        {item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* 중앙 버튼 */}
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full text-4xl font-black shadow-lg transition-all duration-200 border-4 ${
                isSpinning 
                  ? 'bg-gray-400 border-gray-500 cursor-not-allowed' 
                  : 'bg-white border-yellow-500 hover:scale-110 hover:bg-yellow-100 cursor-pointer'
              }`}
            >
              {isSpinning ? '🔄' : '🎯'}
            </button>

            {/* 포인터 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-red-600 z-10"></div>
          </div>
        </div>

        {/* 모바일용 하단 영역 */}
        <div className="lg:hidden space-y-8">
          {/* 결과 표시 */}
          <div>
            {selectedItem ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-8 shadow-2xl border-4 border-white animate-bounce">
                <div className="text-6xl mb-4 text-center">🎉</div>
                <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-4 text-center">
                  결과 발표!
                </h2>
                <p className="text-2xl font-bold text-purple-700 text-center bg-purple-100 rounded-2xl py-4 px-6">
                  {selectedItem}
                </p>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl px-8 py-8 shadow-lg border-4 border-white/60">
                <div className="text-4xl mb-4 text-center opacity-50">🎯</div>
                <h2 className="text-xl font-bold text-gray-500 text-center mb-2">
                  결과 대기 중...
                </h2>
                <p className="text-base text-gray-400 text-center">
                  룰렛을 돌려보세요!
                </p>
              </div>
            )}
          </div>

          {/* 룰렛 돌리기 버튼 */}
          <div className="text-center">
            <button 
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-200 hover:scale-105 text-lg ${
                isSpinning 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
              }`}
            >
              {isSpinning ? '🔄 돌리는 중...' : '🎯 룰렛 돌리기'}
            </button>
          </div>
        </div>


      </div>
    </div>
  )
} 