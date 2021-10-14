import { JSX } from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'
import axios from 'axios'

import { Donor } from '../types'
import { ModalStateSetter } from './PersistentModal'
import Badge from './Badge'

type LeaderboardProps = {
  set_modal_state: ModalStateSetter
}

export default function Leaderboard({ set_modal_state }: LeaderboardProps) {
  const [filtered_donors, set_filtered_donors] = useState<Donor[]>([])
  const [is_searching, set_is_searching] = useState(true)
  const [search_timeout, set_search_timeout] = useState<ReturnType<typeof setTimeout>>(null as any)
  const latest_promise = useRef<Promise<any>>()

  const badge_elements = filtered_donors.map(d => (
    <Badge
      key={d.user_id}
      donor={d}
      onClick={() => {
        set_modal_state({
          open: true,
          content: <LeaderboardModal donor={d} />
        })
      }}
    />
  ))

  const search = async (s: string) => {
    set_is_searching(true)
    const fetch_promise = axios.get('/stats', { params: { filter: s } })
    latest_promise.current = fetch_promise
    const res = await fetch_promise
    if (latest_promise.current === fetch_promise) {
      set_is_searching(false)
      set_filtered_donors(res.data)
    }
  }
  useEffect(() => {
    search('')
  }, [])

  const debouncedSearch = (s: string) => {
    clearTimeout(search_timeout)
    set_search_timeout(setTimeout(() => search(s), 250))
  }
  const on_input = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    debouncedSearch((e.target as HTMLInputElement).value)
  }

  return (
    <>
      <div class='center medal-form'>
        <input class='w-1' placeholder='Search by name, e-mail, ENS, or wallet address...' onInput={on_input} />
      </div>
      <div class={`gallery${is_searching ? ' searching' : ''}`}>{badge_elements}</div>
    </>
  )
}

type LeaderboardModalProps = {
  donor: Donor
}

function LeaderboardModal({ donor }: LeaderboardModalProps) {
  return (
    <div class='leaderboard-modal'>
      <img src={`/badge/${donor.user_id}.png`} width={256} height={256} />
      <div class='name mt-1'>{donor.name}</div>
    </div>
  )
}
