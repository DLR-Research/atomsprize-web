import { JSX } from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'
import axios from 'axios'

import { Donor } from '../types'
import { ModalStateSetter } from './PersistentModal'
import Badge from './Badge'
import Facebook from '../icons/facebook.svg'
import CopyLink from '../icons/copylink.svg'
import GreenCheck from '../icons/greencheck.svg'

type LeaderboardProps = {
  set_modal_state: ModalStateSetter
}

export default function Leaderboard({ set_modal_state }: LeaderboardProps) {
  const [filtered_donors, set_filtered_donors] = useState<Donor[]>([])
  const [is_searching, set_is_searching] = useState(true)
  const [error, set_error] = useState(false)
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
    try {
      const res = await fetch_promise
      if (latest_promise.current === fetch_promise) {
        set_is_searching(false)
        set_error(false)
        set_filtered_donors(res.data)
      }
    } catch (e) {
      console.log('Error searching users:')
      console.log(e)
      set_is_searching(false)
      set_error(true)
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
      <div class={`gallery${is_searching ? ' searching' : ''}`}>
        {error ? <div>Error searching users</div> : badge_elements}
      </div>
    </>
  )
}

type LeaderboardModalProps = {
  donor: Donor
}

function LeaderboardModal({ donor }: LeaderboardModalProps) {
  const shareUrl = `https://${typeof window === 'undefined' ? 'prize.atoms.org' : window.location.hostname}/share/${
    donor.user_id
  }`
  return (
    <div class='leaderboard-modal'>
      <img class='modal-badge' src={`/badge/${donor.user_id}.png`} width={256} height={256} />
      <div class='name mt-1'>{donor.name}</div>
      <div class='contribution'>{`Contribution: $${donor.total_donated / 100}`}</div>
      <div class='copylink-section'>
        <input size={shareUrl.length} type='url' readOnly value={shareUrl}>
          {shareUrl}
        </input>
        <CopyButton url={shareUrl} />
      </div>
      <div>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target='_blank'>
          <img width={32} height={32} src='/twitter.svg' />
        </a>
        <a
          href={`https://www.facebook.com/dialog/share?app_id=969850220278930&display=popup&href=${shareUrl}`}
          target='_blank'
        >
          <img width={32} height={32} src={Facebook} />
        </a>
      </div>
    </div>
  )
}

function CopyButton({ url }: { url: string }) {
  const [clicked, set_clicked] = useState(false)
  const [click_timeout, set_click_timeout] = useState<ReturnType<typeof setTimeout>>(null as any)
  const handle_click = async () => {
    await navigator.clipboard.writeText(url)
    set_clicked(true)
    clearTimeout(click_timeout)
    set_click_timeout(setTimeout(() => set_clicked(false), 2000))
  }
  return (
    <button className={clicked ? 'clicked' : ''} onClick={handle_click}>
      <img width={24} height={24} src={clicked ? GreenCheck : CopyLink} />
    </button>
  )
}
