import { useEffect, StateUpdater } from 'preact/hooks'

export type PersistentModalProps = {
  state: ModalState
  set_modal_state: ModalStateSetter
}

export type ModalState = {
  open: boolean
  content: preact.JSX.Element | string
  style?: string
}

export type ModalStateSetter = StateUpdater<ModalState>

export default function PersistentModal({ state: { open, content, style }, set_modal_state }: PersistentModalProps) {
  const on_close = (e: MouseEvent) => {
    set_modal_state({ open: false, content, style })
    e.stopPropagation()
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  }, [open])

  return (
    <div className={`modal-overlay ${open ? 'open' : ''} ${style || ''}`} onClick={on_close}>
      <div class='modal-container'>
        <div className='modal' onClick={e => e.stopPropagation()}>
          {content}
        </div>
        <a className='back-button' onClick={on_close}>
          <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </a>
      </div>
    </div>
  )
}
