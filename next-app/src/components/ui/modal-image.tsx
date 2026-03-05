import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ModalImage(props: {imageSrc: string, imageAlt: string, imgClassesSmall: string}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button className="float-left">
                <img className={props.imgClassesSmall} src={props.imageSrc} alt={props.imageAlt} />
            </button>
        </DialogTrigger>
        <DialogContent className="md:max-h-screen-md md:max-w-screen-md">
          <DialogHeader>
            <DialogTitle className="sr-only">{props.imageAlt}</DialogTitle>
              <img className="md:max-w-screen-sm md:max-h-screen-sm" src={props.imageSrc} alt={props.imageAlt} />
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}