import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { Donor } from '../types'
import { ModalStateSetter } from './PersistentModal'
import Badge from './Badge'
import BadgeRender from './BadgeRender'

type LeaderboardProps = {
  donors: Donor[]
  set_modal_state: ModalStateSetter
}

export default function Leaderboard({ donors, set_modal_state }: LeaderboardProps) {
  const [filtered_donors, set_filtered_donors] = useState(donors)
  const [active_donor, set_active_donor] = useState<Donor | null>(null)

  const badge_elements = filtered_donors.map(d => (
    <Badge
      key={d.user_id}
      donor={d}
      active={d === active_donor}
      onClick={() => {
        set_active_donor(d)
        set_modal_state({
          open: true,
          content: <LeaderboardModal donor={d} />,
          onClose: () => set_active_donor(null)
        })
      }}
    />
  ))

  const [search_string, set_search_string] = useState('')

  const on_input = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const s = (e.target as HTMLInputElement).value
    set_search_string(s)

    const t = simplify(s)
    set_filtered_donors(donors.filter(d =>
      d.name && simplify(d.name).includes(t) ||
      d.email && simplify(d.email).includes(t) // TODO check all fields
    ))
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
  donor: Donor
}

function LeaderboardModal({ donor }: LeaderboardModalProps) {
  return (
    <div class='leaderboard-modal'>
      <BadgeRender donor={donor} width={256} height={256} />
      <div class='name mt-1'>{donor.name}</div>
    </div>
  )
}

function simplify(s: string) {
  return s.replace(/[^A-Za-z]/g, '').toLowerCase()
}
