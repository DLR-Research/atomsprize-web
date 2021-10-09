import React from 'react'
import { ModalStateSetter } from './PersistentModal'

type ContributeButtonProps = {
  set_modal_state: ModalStateSetter
}

export default function ContributeButton({ set_modal_state }: ContributeButtonProps) {
  const query_string = window.location.search
  const url_params = new URLSearchParams(query_string)
  const referrer = url_params.get('referrer')

  const on_click = () => {
    set_modal_state({
      open: true,
      content: (
        <>
          <h2 className="center">Contribute</h2>
          <div>
            <form action="https://nobleprize.com/checkout" method="POST">
              <input type="number" min="0" step="0.01" id="amount" name="amount" placeholder="Enter Donation Amount..." />
              <button>Donate</button>
            </form>
            <a className="donate-with-crypto"
              data-custom={`NoblePrize|${referrer}`}
              href="https://commerce.coinbase.com/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7">
              Coinbase Commerce
            </a>
            <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
            </script>
          </div>
        </>
      )
    })
  }

  return <button disabled onClick={ on_click }>Coming Soon</button>
}

