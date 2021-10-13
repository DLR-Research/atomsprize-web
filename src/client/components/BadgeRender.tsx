import { useRef, useEffect } from 'preact/hooks'
import random_seed from 'random-seed'

import { Donor } from '../types'

const GOLD_PALETTE = [38, 45, 47, 54, 40, 65, 65, 100]
const SILVER_PALETTE =[247, 254, 256, 263, 0, 10, 10, 20]
const BRONZE_PALETTE = [29, 36, 36, 43, 0, 36, 36, 72]

type BadgeRenderProps = {
  donor: Donor
  width?: number
  height?: number
}

function create_random(seed: string) {
  const r = random_seed.create(seed)

  function range(low: number, high: number) {
    return r.random() * (high - low) + low
  }

  function gaussian() {
    var u = 0, v = 0;
    while(u === 0) u = r.random();
    while(v === 0) v = r.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }


  return { range, gaussian }
}

export const render = (donor: Donor, context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  const rx = context.canvas.width / 2
  const ry = context.canvas.height / 2

  const palette = donor.total_donated < 100 ? BRONZE_PALETTE : donor.total_donated < 1000 ? SILVER_PALETTE : GOLD_PALETTE
  const rng = create_random(donor.user_id.toString())
  const hue1 = rng.range(palette[0], palette[1])
  const hue2 = rng.range(palette[2], palette[3])
  const sat1 = rng.range(palette[4], palette[5])
  const sat2 = rng.range(palette[6], palette[7])
  const n_lines = rng.range(1000, 10000)
  let v1 = 0, v2 = 0, angle1 = 0, angle2 = 0
  context.lineWidth = context.canvas.width / 9000.

  for (let i = 0; i < n_lines; i++) {
    const hue = rng.range(hue1, hue2)
    const sat = rng.range(sat1, sat2)
    const val = rng.range(30, 100)
    const alpha = rng.range(.5, 1)
    v1 = v1 * 0.995 + rng.gaussian() * 0.0005
    v2 = v2 * 0.995 + rng.gaussian() * 0.0005
    angle1 += v1
    angle2 += v2
    context.strokeStyle = `hsla(${hue}, ${sat}%, ${val}%, ${alpha})`
    context.beginPath()
    context.moveTo(rx * (1 + Math.sin(angle1)), ry * (1 + Math.cos(angle1)))
    context.lineTo(rx * (1 + Math.sin(angle2)), ry * (1 + Math.cos(angle2)))
    context.stroke()
  }
}

export default function BadgeRender({ donor, width = 128, height = 128 }: BadgeRenderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')!
    render(donor, context)
  }, [donor])

  return <canvas ref={canvasRef} width={width} height={height} />
}
