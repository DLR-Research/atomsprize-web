import React from 'react'
import { ModalStateSetter } from './PersistentModal'

type ContributeButtonProps = {
  set_modal_state: ModalStateSetter
}

export default function ContributeButton({ set_modal_state }: ContributeButtonProps) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const referrer = urlParams.get('referrer')

  const on_click = () => {
    set_modal_state({
      open: true,
      content: (
        <>
          <h2 className='center'>Contribute</h2>
          <div>
            <a className='donate-with-crypto'
              data-custom='NoblePrize|${referrer}'
              href='https://commerce.coinbase.com/checkout/0406db10-6b39-43fa-9662-3f973b2d4fc7'>
              Coinbase Commerce
            </a>
            <script src='https://commerce.coinbase.com/v1/checkout.js?version=201807'>
            </script>
          </div>
        </>
      )
    })
  }

  return <button disabled onClick={ on_click }>Coming Soon</button>
}


