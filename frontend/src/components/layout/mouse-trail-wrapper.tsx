'use client'
import dynamic from 'next/dynamic'

const MouseTrailEffect = dynamic(() => import('./mouse-trail'), { ssr: false })

export default function MouseTrailWrapper() {
  return <MouseTrailEffect />
}
