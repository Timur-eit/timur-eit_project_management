import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './style.css'

interface ModalProps {
    children: any,
    defaultOpen: boolean
}

const modalElem: HTMLElement | null = document.querySelector('#portal')
const element = document.createElement('div')

function Modal(props: ModalProps) {
  const { children, defaultOpen = false } = props
  const [isOpen, setOpen] = useState<boolean>(defaultOpen)

  useEffect(() => {
    if (modalElem) {
      modalElem.appendChild(element)
      return () => {
        modalElem.removeChild(element)
      }
    }    
    // когда перешли на др страницу => willUnMount
    // т.е. modal исчезнет
    
    // return - willUnMount
  }, [])

  return (
    <div className='modal__container'>
      <button onClick={() => setOpen(!isOpen)}>Open</button>
      {isOpen && ReactDom.createPortal(
        <div className='wrap' onClick={() => setOpen(!isOpen)}>
           <div className='modal' onClick={(event) => {
              event.stopPropagation()
            }}>
            <button onClick={() => setOpen(!isOpen)}>X</button>
            {children}
          </div>
        </div>, element
      )}
    </div>
  )
}

export default Modal

