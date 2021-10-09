import { useEffect, StateUpdater } from "preact/hooks"

export type PersistentModalProps = {
  state: ModalState
  set_modal_state: ModalStateSetter
}

export type ModalState = {
  open: boolean
  content: preact.JSX.Element | string
}

export type ModalStateSetter = StateUpdater<ModalState>

export default function PersistentModal({
  state: { open, content },
  set_modal_state
}: PersistentModalProps) {
  const on_close = (e: MouseEvent) => {
    set_modal_state({ open: false, content })
    e.stopPropagation()
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add("noscroll")
    } else {
      document.body.classList.remove("noscroll")
    }
  }, [open])

  return (
    <div className={`modal-container ${open ? "open" : ""}`} onClick={on_close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <a className="x-button" onClick={on_close}>
          ×
        </a>
        {content}
      </div>
    </div>
  )
}
