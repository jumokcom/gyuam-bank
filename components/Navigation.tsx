'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '🏠 홈', emoji: '🏠' },
    { href: '/assets', label: '💰 자산현황', emoji: '💰' },
    { href: '/transaction', label: '🏦 은행창구', emoji: '🏦' },
    { href: '/ranking', label: '🏆 순위', emoji: '🏆' },
  ]

  return (
    <nav className="bg-white shadow-lg rounded-2xl p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl text-center transition-all duration-200
              ${pathname === item.href
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'
              }
            `}
          >
            <span className="text-3xl mb-2">{item.emoji}</span>
            <span className="font-bold text-sm md:text-base">
              {item.label.split(' ')[1]} {/* 이모지 제거하고 텍스트만 */}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
} 