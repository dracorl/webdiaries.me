import Menu from "./Menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"

const Drawer = ({isOpen, onOpenChange}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0 pt-2">
        <div className="h-full">
          <Menu open={isOpen} onOpenChange={onOpenChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Drawer
