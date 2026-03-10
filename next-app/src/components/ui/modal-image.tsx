import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ZoomIn } from "lucide-react"

export default function ModalImage(props: {imageSrc: string, imageAlt: string, imgClassesSmall: string, imgClassesButton?: string}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button
              type="button"
              className={`group relative float-left cursor-zoom-in rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${props.imgClassesButton ?? ""}`}
              aria-label={`Enlarge image: ${props.imageAlt}`}
            >
                <img className={props.imgClassesSmall} src={props.imageSrc} alt={props.imageAlt} />
                <span
                  className="pointer-events-none absolute bottom-3 right-5 flex items-center justify-center rounded-full bg-black/50 p-1.5 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0"
                  aria-hidden="true"
                >
                  <ZoomIn className="h-4 w-4 text-white" />
                </span>
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-sm bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <ZoomIn className="h-8 w-8 text-white drop-shadow-md" />
                </span>
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