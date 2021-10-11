import { useRef, useEffect } from 'preact/hooks'
import random_seed from 'random-seed'

import { Donor } from '../types'

const GOLD_PALETTE = ['#967100', '#bf9b30', '#efc501', '#f6d56d', '#f9e09f']
const SILVER_PALETTE = ['#a8a9ad', '#b5b7bb', '#cccccc', '#d8d8d8']
const BRONZE_PALETTE = ['#6C3907', '#804A01', '#A56118', '#CE8235']

function lerpColor(a: string, b: string, amount: number) {
  var ah = +a.replace('#', '0x'),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = +b.replace('#', '0x'),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab)

  return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
}

type BadgeRenderProps = {
  donor: Donor
  width?: number
  height?: number
}

export type BadgeInputs = {
  name: string
  total_donated: number
}

type RNG = {
  bool: () => boolean
  normalish: () => number
}

function create_random(seed: string) {
  const r = random_seed.create(seed)

  function bool() {
    return r.random() <= 0.5
  }

  function normalish() {
    const x = r.random()
    const y = 1 / (1 + Math.exp(-8 * x + 4))
    return Math.max(0, Math.min(y, 1))
  }

  return { bool, normalish }
}

function discrete_gradient(rng: RNG, p: string[]) {
  const buckets = p.length - 1
  if (buckets === 0) return () => p[0]
  const bucket_mass = 1 / buckets

  return () => {
    const x = rng.normalish()
    const lambda = x % bucket_mass
    const b = (x - lambda) / bucket_mass

    if (b === buckets) return p[b]

    return lerpColor(p[b], p[b + 1], lambda)
  }
}

function tile(
  rng: RNG,
  random_color: () => string,
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  n = 0,
  d = 2
) {
  if (n === 0) {
    context.strokeStyle = random_color()

    if (rng.bool()) {
      context.beginPath()
      context.moveTo(x, y)
      context.lineTo(x + w, y + h)
      context.stroke()
    } else {
      context.beginPath()
      context.moveTo(x + w, y)
      context.lineTo(x, y + h)
      context.stroke()
    }
  } else {
    const w2 = w / d
    const h2 = h / d

    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        tile(rng, random_color, context, x + i * w2, y + j * h2, w2, h2, n - 1, d)
      }
    }
  }
}

const render = (donor: Donor, context: CanvasRenderingContext2D) => {
  const palette =
    donor.total_donated < 100 ? BRONZE_PALETTE : donor.total_donated < 1000 ? SILVER_PALETTE : GOLD_PALETTE

  const rng = create_random(donor.user_id.toString())
  const random_color = discrete_gradient(rng, palette.slice(1))
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.beginPath()
  context.arc(context.canvas.width / 2, context.canvas.height / 2, context.canvas.height / 2, 0, Math.PI * 2, true)
  context.clip()
  context.lineWidth = context.canvas.width / 32
  context.lineCap = 'square'
  tile(rng, random_color, context, 0, 0, context.canvas.width, context.canvas.height, 4)
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
