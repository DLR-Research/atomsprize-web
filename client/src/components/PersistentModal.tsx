import { useEffect, StateUpdater } from 'preact/hooks'

export type PersistentModalProps = {
  state: ModalState
  set_modal_state: ModalStateSetter
}

export type ModalState = {
  open: boolean
  content: preact.JSX.Element | string
  onClose?: () => void
}

export type ModalStateSetter = StateUpdater<ModalState>

export default function PersistentModal({ state: { open, content, onClose }, set_modal_state }: PersistentModalProps) {
  const on_close = (e: MouseEvent) => {
    set_modal_state({ open: false, content })
    e.stopPropagation()

    if (onClose != null) onClose()
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  }, [open])

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={on_close}>
      <div class='modal-container'>
        <div className='modal' onClick={e => e.stopPropagation()}>
          {content}
        </div>
        <a className='back-button' onClick={on_close}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
        </a>
      </div>
    </div>
  )
}
