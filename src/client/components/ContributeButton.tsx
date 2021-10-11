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
      content: <ContributeModal referrer={referrer} />
    })
  }

  return <button onClick={on_click}>Coming Soon</button>
}

type ContributeModalProps = {
  referrer: string | null
}

function ContributeModal({ referrer }: ContributeModalProps) {
  const [amount, set_amount] = useState<number | null>(null)

  const on_change = (value: number) => {
    const p = value

    set_amount(p)
  }

  return (
    <>
      <h2 class='center'>Contribute</h2>
      <div>
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
              value={ amount }
              onAccept={ on_change } />
          </div>
          <button>Donate</button>
        </form>
        <br />
        <a
          class='donate-with-crypto'
          data-custom={`NoblePrize|${referrer}`}
          href='https://commerce.coinbase.com/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7'
        >
          Coinbase Commerce
        </a>
        <script src='https://commerce.coinbase.com/v1/checkout.js?version=201807'></script>
      </div>
    </>
  )
}

