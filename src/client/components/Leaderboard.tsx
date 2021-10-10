import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { Badge } from '../types'
import { ModalStateSetter } from './PersistentModal'
import BadgeComponent from './Badge'

type LeaderboardProps = {
  badges: Badge[]
  set_modal_state: ModalStateSetter
}

export default function Leaderboard({ badges, set_modal_state }: LeaderboardProps) {
  const [filtered_badges, set_filtered_badges] = useState(badges)
  const [active_badge, set_active_badge] = useState<Badge | null>(null)

  const badge_elements = filtered_badges.map(b => (
    <BadgeComponent
      key={b.name}
      badge={b}
      active={b === active_badge}
      onClick={() => {
        set_active_badge(b)
        set_modal_state({
          open: true,
          content: <LeaderboardModal badge={b} />,
          onClose: () => set_active_badge(null)
        })
      }}
    />
  ))

  const [search_string, set_search_string] = useState('')

  const on_input = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const s = (e.target as HTMLInputElement).value
    set_search_string(s)

    const t = simplify(s)
    set_filtered_badges(badges.filter(b => simplify(b.name).includes(t)))
  }

  return (
    <>
      <div class='center medal-form'>
        <input
          placeholder='Search by e-mail, Twitter, ENS, or wallet address...'
          value={search_string}
          onInput={on_input}
        />
      </div>
      <div class='gallery'>{badge_elements}</div>
    </>
  )
}

type LeaderboardModalProps = {
  badge: Badge
}

function LeaderboardModal({ badge }: LeaderboardModalProps) {
  return (
    <div class='leaderboard-modal'>
      <img src={badge.img_url} loading='lazy' />
      <div class='name mt-1'>{badge.name}</div>
    </div>
  )
}

function simplify(s: string) {
  return s.replace(/[^A-Za-z]/g, '').toLowerCase()
}
