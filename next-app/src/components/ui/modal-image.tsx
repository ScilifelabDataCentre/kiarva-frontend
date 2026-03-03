import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ModalImage(props: {imgSrc: string, imgClassesSmall: string}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button className="float-left">
                <img className={props.imgClassesSmall} src={props.imgSrc} aria-hidden="true" />
            </button>
        </DialogTrigger>
        <DialogContent className="md:max-h-screen-md md:max-w-screen-md">
          <DialogHeader>
            <img className="md:max-w-screen-sm md:max-h-screen-sm" src={props.imgSrc} aria-hidden="true" />
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}