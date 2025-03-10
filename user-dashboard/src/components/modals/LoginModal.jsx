import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import LoginForm from "../forms/LoginForm"
import {useModal} from "../../contexts/ModalContext"

const LoginModal = () => {
  const {closeModal} = useModal()
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <LoginForm onSubmitSuccess={() => closeModal()} />
    </DialogContent>
  )
}

export default LoginModal
