import { Scientist } from '../types'
import ScientistProfile from './ScientistProfile'

type ScientistsProps = {
  scientists: Scientist[]
}

export default function Scientists({ scientists }: ScientistsProps) {
  const scientists_list = scientists.map((s, i) => (
    <ScientistProfile
      key={i}
      scientist={s}
      interactive={true}
    />
  ))

  return <div className='gallery'>{scientists_list}</div>
}
