import { useState } from 'preact/hooks'
import { ModalStateSetter } from './PersistentModal'
import { IMaskInput } from 'react-imask'

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
  const [amount, set_amount] = useState<number | null>(null)

  const on_change = (value: number) => {
    const p = value

    set_amount(p)
  }

  const handle_coinbase = () => {}

  const handle_uniswap = () => {
    set_modal_state({
      open: true,
      content: (
        <div className='uniswap'>
          <iframe
            src='https://app.uniswap.org/#/swap?outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&recipient=0x2Cc467b4c8c24C6E8A2E26B67734a9f1B4b91979'
            width='100%'
            height='100%'
            style='border: 0'
          />
        </div>
      )
    })
  }

  // TODO implement Coinbase modal
  referrer

  /*
    <a
      data-custom={`${referrer}`}
      href='https://commerce.coinbase.com/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7'
    >
      Coinbase Commerce
    </a>
    <script src='https://commerce.coinbase.com/v1/checkout.js?version=201807'></script>
  */

  return (
    <div class='contribute-modal'>
      <h1 class='center'>Contribute</h1>
      <br />
      <form class='contribute-form' action='/checkout' method='POST'>
        <div class='composite-input mr-h'>
          <span class='label'>USD</span>
          <IMaskInput
            id='amount'
            name='amount'
            mask={Number}
            unmask='typed'
            signed={false}
            thousandsSeparator=','
            radix='.'
            placeholder='50.00'
            value={amount}
            onAccept={on_change}
          />
        </div>
        <button>Donate</button>
      </form>
      <div class='donate-divider my-1'>
        <div class='donate-divider-line' />
        Or
        <div class='donate-divider-line' />
      </div>
      <div class='col'>
        <button class='mb-h' onClick={handle_coinbase}>
          Donate with Coinbase
        </button>
        <button onClick={handle_uniswap}>Donate with Uniswap</button>
      </div>
    </div>
  )
}