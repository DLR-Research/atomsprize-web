import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { Badge } from '../types'
import BadgeComponent from './Badge'

type LeaderboardProps = {
  badges: Badge[]
}

export default function Leaderboard({ badges }: LeaderboardProps) {
  const [filtered_badges, set_filtered_badges] = useState(badges)

  const badge_elements = filtered_badges.map(b => <BadgeComponent key={b.name} badge={b} />)

  const [search_string, set_search_string] = useState('')

  const on_input = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const s = (e.target as HTMLInputElement).value
    set_search_string(s)

    const t = simplify(s)
    set_filtered_badges(badges.filter(b => simplify(b.name).includes(t)))
  }

  return (
    <>
      <div className='center medal-form'>
        <input placeholder='Search by e-mail, Twitter, ENS, or wallet address...' value={search_string} onInput={on_input} />
      </div>
      <div className='gallery'>{badge_elements}</div>
    </>
  )
}

function simplify(s: string) {
  return s.replace(/[^A-Za-z]/g, '').toLowerCase()
}
