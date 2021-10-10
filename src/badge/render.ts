import P5 from 'p5'
import random_seed from 'random-seed'

export type BadgeInputs = {
  name: string
  total_donated: number
}

const GOLD_PALETTE = ['#967100', '#bf9b30', '#efc501', '#f6d56d', '#f9e09f']
const SILVER_PALETTE = ['#a8a9ad', '#b5b7bb', '#cccccc', '#d8d8d8']
const BRONZE_PALETTE = ['#6C3907', '#804A01', '#A56118', '#CE8235']

export default function create_renderer(inputs: BadgeInputs) {
  let circle_mask: P5.Graphics
  let canvas: P5.Graphics
  let random_color: () => P5.Color

  const palette = inputs.total_donated < 100 ? BRONZE_PALETTE
    : inputs.total_donated < 1000 ? SILVER_PALETTE
      : GOLD_PALETTE

  const rng = create_random(inputs.name)

  function setup(p5: P5, parent: Element) {
    p5.createCanvas(128, 128).parent(parent)
    circle_mask = p5.createGraphics(128, 128)
    canvas = p5.createGraphics(128, 128)
    random_color = discrete_gradient(p5, rng, palette.slice(1)) as (() => P5.Color)
    p5.noLoop()
    p5.noSmooth()
  }

  function draw(p5: P5) {
    canvas.background(p5.color(palette[0]))
    canvas.strokeWeight(4)
    canvas.strokeCap(p5.PROJECT)
    tile(0, 0, 128, 128, 4)
    circle_mask.fill(0)
    circle_mask.circle(64, 64, 100)

    p5.image(graphic_mask(p5, canvas, circle_mask), 0, 0)
  }

  function tile(x: number, y: number, w: number, h: number, n = 0, d = 2) {
    if (n === 0) {
      canvas.stroke(random_color())

      if (rng.bool()) {
        canvas.line(
          x,
          y,
          x + w,
          y + h
        )
      } else {
        canvas.line(
          x + w,
          y,
          x,
          y + h
        )
      }
    } else {
      const w2 = w / d
      const h2 = h / d

      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          tile(x + i * w2, y + j * h2, w2, h2, n - 1, d)
        }
      }
    }
  }

  return { setup, draw }
}

type RNG = {
  bool: () => boolean
  normalish: () => number
}

function create_random(seed: string) {
  const r = random_seed.create(seed)

  function bool() {
    return r.random() <= .5
  }

  function normalish() {
    const x = r.random()
    const y = 1 / (1 + Math.exp(-8 * x + 4))
    return Math.max(0, Math.min(y, 1))
  }

  return { bool, normalish }
}

function discrete_gradient(p5: P5, rng: RNG, p: string[]) {
  const buckets = p.length - 1
  const bucket_mass = 1 / buckets

  if (buckets === 0) return () => p[0]

  return () => {
    const x = rng.normalish()
    const lambda = x % bucket_mass
    const b = (x - lambda) / bucket_mass

    if (b === buckets) return p[b]

    return p5.lerpColor(p5.color(p[b]), p5.color(p[b + 1]), lambda)
  }
}

function graphic_mask(p5: P5, g: P5.Graphics, m: P5.Graphics) {
  const img = p5.createImage(g.width, g.height)
  img.copy(g, 0, 0, g.width, g.height, 0, 0, g.width, g.height)
  img.mask(m as unknown as P5.Image)
  return img
}

