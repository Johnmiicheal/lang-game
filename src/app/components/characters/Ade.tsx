import React from 'react'

export default function Ade({ isAttacking = false }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <g id="ade">
        <circle cx="100" cy="60" r="40" fill="#FFD700" />
        <rect x="60" y="100" width="80" height="80" fill="#1E90FF" />
        <line x1="60" y1="120" x2="40" y2={isAttacking ? "160" : "140"} stroke="black" strokeWidth="10">
          <animate
            attributeName="y2"
            values={isAttacking ? "140;160;140" : "140"}
            dur="0.5s"
            repeatCount={isAttacking ? "1" : "indefinite"}
          />
        </line>
        <line x1="140" y1="120" x2="160" y2={isAttacking ? "160" : "140"} stroke="black" strokeWidth="10">
          <animate
            attributeName="y2"
            values={isAttacking ? "140;160;140" : "140"}
            dur="0.5s"
            repeatCount={isAttacking ? "1" : "indefinite"}
          />
        </line>
      </g>
    </svg>
  )
}

