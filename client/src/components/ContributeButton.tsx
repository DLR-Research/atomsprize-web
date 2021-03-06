import { ModalStateSetter } from './PersistentModal'

type ContributeButtonProps = {
  set_modal_state: ModalStateSetter
}

export default function ContributeButton({ set_modal_state }: ContributeButtonProps) {
  const query_string = typeof window === 'undefined' ? '' : window.location.search
  const url_params = new URLSearchParams(query_string)
  const referrer = url_params.get('referrer')

  const on_click = () => {
    set_modal_state({
      open: true,
      content: <ContributeModal referrer={referrer} set_modal_state={set_modal_state} />
    })
  }

  return <button onClick={on_click}>Coming Soon</button>
}

type ContributeModalProps = {
  referrer: string | null
  set_modal_state: ModalStateSetter
}

function ContributeModal({ referrer, set_modal_state }: ContributeModalProps) {
  const open_iframe = (url: string, style?: string) =>
    set_modal_state({
      open: true,
      content: (
        <div class='iframe-container'>
          <iframe src={url} width='100%' height='100%' style='border: 0' allowTransparency frameBorder='no' />
        </div>
      ),
      style
    })

  const handle_coinbase = () => {
    let url = 'https://commerce.coinbase.com/embed/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7?version=201807'
    url += `&buttonId=bwc-${Math.floor(1e16 * Math.random()).toString(16)}`
    url += `&origin=${encodeURIComponent(window.location.href)}`
    url += referrer ? `&custom=${encodeURIComponent(referrer)}` : ''
    open_iframe(url, 'coinbase-commerce-modal')
  }

  const handle_hackbank = () => {
    open_iframe('https://bank.hackclub.com/donations/start/atoms-org', 'hackbank-modal')
  }

  return (
    <div class='contribute-modal'>
      <h1 class='center'>Contribute</h1>
      <br />
      <button class='mb-h' onClick={handle_hackbank}>
        Donate with Card
      </button>
      <div class='donate-divider my-1'>
        <div class='donate-divider-line' />
        Or
        <div class='donate-divider-line' />
      </div>
      <div class='col'>
        <button class='mb-h' onClick={handle_coinbase}>
          Donate with Coinbase
        </button>
      </div>
    </div>
  )
}
