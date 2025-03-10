import {createContext, useContext, useState} from "react"
import {Dialog} from "@/components/ui/dialog"

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const openModal = ContentComponent => {
    setModalContent(() => ContentComponent)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}

      <Dialog
        open={isOpen}
        onOpenChange={open => {
          if (!open) closeModal()
        }}
      >
        {modalContent && modalContent()}
      </Dialog>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error("useModal must be used within a ModalProvider")
  return context
}
