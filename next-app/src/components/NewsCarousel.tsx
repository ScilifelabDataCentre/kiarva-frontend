import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ModalImage from "@/components/ui/modal-image";
import { Articles } from "@/content/NewsArticles";



function DisplayNews(props: {imageName: string, children: React.ReactNode}) {
  return (
    <article className="pt-4 pb-4">
      <ModalImage 
        imgSrc={props.imageName} 
        imgClassesSmall="max-h-80 max-w-80 pr-4 pb-2" 
      />
      {props.children}
    </article>
  )
}

export default function NewsCarousel() {
  return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="md:mx-12 xl:mx-0"
      >
        <CarouselContent className="flex mt-6">
          {Articles.map((article, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 max-w-full">
              <DisplayNews imageName={"images/"+article.imageName}>
                <div>
                  <time
                    dateTime={(new Date(article.date)).toISOString()}
                    className="block italic mb-2"
                    >
                    {article.showDay ? 
                      (new Date(article.date)).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      :                  
                      (new Date(article.date)).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        // day: "numeric",
                      })
                    }
                  </time>
                  <p className="max-w-full pr-2 lg:pr-8 pb-2">
                    {article.textBody}
                  </p>
                </div>
              </DisplayNews>
            </CarouselItem>
          ))}
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}