import React from 'react'
import { Scientist } from './types'
import ScientistProfile from './ScientistProfile'

type ScientistsProps = {
  scientists: Scientist[],
  open_project_modal: (tagline: string) => void
}

export default function Scientists ({ scientists, open_project_modal }: ScientistsProps) {
  const scientists_list = scientists.map(
    s =>
      <ScientistProfile
        key={ s.name }
        scientist={ s }
        interactive={ true }
        open_project_modal={ () => open_project_modal(s.tagline) } />
  )

  return (
    <div className='gallery'>{ scientists_list }</div>
  )
}

