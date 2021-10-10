import { ModalStateSetter } from './PersistentModal'

type MedalSearchProps = {
  set_modal_state: ModalStateSetter
}

export default function MedalSearch({ set_modal_state }: MedalSearchProps) {
  const on_click = () => {
    set_modal_state({
      open: true,
      content: (
        <>
          <h2 className='center'>View medal</h2>
          Launching soon
        </>
      )
    })
  }

  const on_submit = (e: Event) => e.preventDefault()

  return (
    <form className='medal-form' onSubmit={on_submit}>
      <input placeholder='Search by e-mail, Twitter, ENS, or wallet address...' />
      <button onClick={on_click}>View medal</button>
    </form>
  )
}
