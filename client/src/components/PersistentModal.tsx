import type { ComponentChildren, JSX } from 'preact'
import { useEffect, StateUpdater } from 'preact/hooks'
import Router, { route, RoutableProps } from 'preact-router'
import Match from 'preact-router/match'

import { scientists, project_descriptions } from '../data'
import ScientistProfile from './ScientistProfile'

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

interface ModalProps {
  open?: boolean
  style?: string
  children?: ComponentChildren
}

function Modal ({ open, style, children } : ModalProps) {
  const on_close = (e: MouseEvent) => {
    e.stopPropagation()
    route('/')
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
          {children}
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

interface ScientistModalProps {
  short_name?: string
}

function ScientistModal({ short_name }: ScientistModalProps) {
    const { tagline } = scientists.filter(s => s.short_name === short_name)[0]

    const scientist_elements: JSX.Element[] = []
    scientists.filter(s => s.tagline === tagline).forEach(s => {
      scientist_elements.push(ScientistProfile({ scientist: s }))
      if (s.break) {
        scientist_elements.push(<br />)
      }
    })

    return (
      <Modal open>
        <h1 className='center'>{tagline}</h1>
        <div className='center modal-gallery'>{scientist_elements}</div>
        <div className='project-description'>{project_descriptions[tagline]()}</div>
      </Modal>
    )
}


export default function PersistentModal() {
  return (
    <Router>
      <Match path='/scientists/:id'>
        {({ path }: RoutableProps) => <ScientistModal short_name={path?.split('/').slice(-1)[0]} />}
      </Match>
      <Match default>
        {() => <Modal />}
      </Match>
    </Router>
  )
}
