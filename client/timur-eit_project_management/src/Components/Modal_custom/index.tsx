import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './style.css'

interface ModalProps {
    children: any,
    defaultOpen: boolean
}

interface ICoords {
  top: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
}

function getCoords(elem: HTMLElement): ICoords {
  const box: any = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset, // pageYOffset - кол-во пикселей на сколько проскролено окно
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
    width: box.width,
    height: box.height,
  };
}

const modalElem: HTMLElement | null = document.querySelector('#portal')
const element = document.createElement('div')

function Modal(props: ModalProps) {
  const { children, defaultOpen = false } = props  
  
  const [isOpen, setOpen] = useState(defaultOpen)
  const [coords, setCoords] = useState<ICoords>({top: 0, bottom: 0, left: 0, width: 0, height: 0})

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

  useEffect(() => {
    if (isOpen) {
      const modal: HTMLElement | null = document.querySelector('.modal')
      if (modal && Object.keys(coords).length === 0) {
        setCoords(() => getCoords(modal))
      }
    }
  }, [isOpen, coords])


  return (
    <div className='modal__container'>
      <button onClick={() => setOpen(!isOpen)}>Open</button>
      {isOpen && ReactDom.createPortal(
        <div className='wrap' onClick={() => setOpen(!isOpen)}>
           <div className='modal' style={coords.left ? { left: coords.left - coords.width / 2, top: coords.top - coords.height / 2 } : {}} onClick={(event) => {
              event.stopPropagation()              
              console.log(event.target)
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

