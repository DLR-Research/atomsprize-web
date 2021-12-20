import { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

type FaqAccordionProps = {
  question: string
}

const FaqAccordion: FunctionalComponent<FaqAccordionProps> = ({ question, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <h3 className='faq-question' onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
      </h3>
      <div className='faq-answer' aria-expanded={open}>
        {children}
      </div>
    </>
  )
}

export default FaqAccordion
