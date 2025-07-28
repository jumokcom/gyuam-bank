'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RouletteItem {
  id: string
  name: string
  weight: number
  color: string
}

export default function RouletteSettingPage() {
  const [items, setItems] = useState<RouletteItem[]>([
    { id: '1', name: '🎯 항목 1', weight: 1, color: 'from-red-400 to-red-600' }
  ])

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // localStorage에서 설정 불러오기
  useEffect(() => {
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
  }, [])

  // 설정 적용하기
  const applySettings = () => {
    localStorage.setItem('rouletteItems', JSON.stringify(items))
    setHasUnsavedChanges(false)
    alert('✅ 설정이 적용되었습니다!')
  }

  const colors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-orange-400 to-orange-600',
    'from-teal-400 to-teal-600',
    'from-indigo-400 to-indigo-600',
    'from-rose-400 to-rose-600',
    'from-cyan-400 to-cyan-600',
    'from-emerald-400 to-emerald-600'
  ]

  const addItem = () => {
    const newId = Date.now().toString()
    const colorIndex = items.length % colors.length
    const newItem: RouletteItem = {
      id: newId,
      name: `🎯 새 항목 ${items.length + 1}`,
      weight: 1,
      color: colors[colorIndex]
    }
    setItems([...items, newItem])
    setHasUnsavedChanges(true)
  }

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      alert('최소 1개의 항목이 필요합니다!')
      return
    }
    setItems(items.filter(item => item.id !== id))
    setHasUnsavedChanges(true)
  }

  const updateItemName = (id: string, name: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, name } : item
    ))
    setHasUnsavedChanges(true)
  }

  const updateItemWeight = (id: string, weight: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, weight } : item
    ))
    setHasUnsavedChanges(true)
  }

  const getTotalWeight = () => {
    return items.reduce((sum, item) => sum + item.weight, 0)
  }

  const getItemPercentage = (weight: number) => {
    const total = getTotalWeight()
    return Math.round((weight / total) * 100)
  }

  const resetToDefault = () => {
    setItems([
      { id: '1', name: '🎯 항목 1', weight: 1, color: 'from-red-400 to-red-600' }
    ])
    setHasUnsavedChanges(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 p-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 text-5xl animate-pulse opacity-20">⚙️</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-20">🔧</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse opacity-20">🎛️</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20">📊</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20">⭐</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-bounce opacity-20">🌟</div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 */}
        <header className="text-center mb-8 relative">
          <Link href="/roulette">
            <button className="absolute top-4 left-4 bg-white/80 hover:bg-white text-purple-600 px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 hover:scale-105 text-sm">
              ← 룰렛으로
            </button>
          </Link>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-4 border-white">
            <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-4">
              ⚙️ 룰렛 설정 ⚙️
            </h1>
            <p className="text-lg font-bold text-purple-600">룰렛 항목을 자유롭게 편집해보세요! 🎯</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 설정 패널 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text">
                항목 설정 {hasUnsavedChanges && <span className="text-red-500">●</span>}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={addItem}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 hover:scale-105"
                >
                  ➕ 추가
                </button>
                <button
                  onClick={resetToDefault}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 hover:scale-105"
                >
                  🔄 초기화
                </button>
                <button
                  onClick={applySettings}
                  className={`px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 hover:scale-105 ${
                    hasUnsavedChanges 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white animate-pulse' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!hasUnsavedChanges}
                >
                  ✅ 적용하기
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-2 border-white shadow`}></div>
                    <span className="font-bold text-gray-700">항목 {index + 1}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
                      disabled={items.length <= 1}
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">이름</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItemName(item.id, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-bold"
                        placeholder="항목 이름을 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        크기 (가중치): {getItemPercentage(item.weight)}%
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={item.weight}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1
                            updateItemWeight(item.id, Math.max(1, value))
                          }}
                          className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-bold text-center"
                          placeholder="가중치 입력"
                        />
                        <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          {getItemPercentage(item.weight)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 미리보기 패널 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white">
            <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-6 text-center">
              미리보기
            </h2>
            
            {/* 미니 룰렛 */}
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-64">
                <svg
                  width="256"
                  height="256"
                  viewBox="0 0 256 256"
                  className="rounded-full border-4 border-white shadow-xl"
                >
                  {items.map((item, index) => {
                    const totalWeight = getTotalWeight()
                    const percentage = (item.weight / totalWeight) * 100
                    const startAngle = items.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.weight / totalWeight) * 360, 0)
                    const endAngle = startAngle + (percentage * 3.6)
                    
                    // SVG path for arc
                    const radius = 120
                    const centerX = 128
                    const centerY = 128
                    
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
                          fontSize={Math.max(10, Math.min(14, percentage / 4))}
                          fontWeight="bold"
                          className="drop-shadow-lg"
                          transform={`rotate(${percentage > 25 ? textAngle : 0} ${textX} ${textY})`}
                        >
                          {item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                
                {/* 중앙 점 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>

                {/* 포인터 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-600 z-10"></div>
              </div>
            </div>

            {/* 항목 목록 */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border border-white shadow`}></div>
                  <span className="flex-1 font-bold text-gray-700 text-sm truncate">{item.name}</span>
                  <span className="text-sm font-bold text-gray-600">{getItemPercentage(item.weight)}%</span>
                </div>
              ))}
            </div>

            {/* 통계 */}
            <div className="mt-4 pt-4 border-t-2 border-gray-200">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">총 항목 수: {items.length}개</p>
                <p className="text-sm font-bold text-gray-700">총 가중치: {getTotalWeight()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white text-center">
          <div className="text-4xl mb-3">💡</div>
          <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text mb-2">
            사용 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-bold text-purple-700">
            <div className="bg-purple-100 rounded-xl p-3">
              <div className="text-2xl mb-2">➕</div>
              <p>항목 추가 버튼을 눌러서<br/>새로운 항목을 만들어요</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-3">
              <div className="text-2xl mb-2">✏️</div>
              <p>이름을 클릭해서<br/>원하는 텍스트로 변경하세요</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-3">
              <div className="text-2xl mb-2">📊</div>
              <p>숫자로 가중치를 조절해<br/>확률을 바꿀 수 있어요</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-3">
              <div className="text-2xl mb-2">✅</div>
              <p>설정 완료 후 적용하기를<br/>눌러서 저장하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 