import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ModalImage from "@/components/ui/modal-image";
import { Articles } from "@/content/NewsArticles";
import ExpandableText from "@/components/ExpandableText";



function DisplayNews(props: {imageName: string, imageAlt: string, children: React.ReactNode}) {
  return (
    <article className="py-4">
      <ModalImage 
        imageSrc={props.imageName} 
        imageAlt={props.imageAlt}
        imgClassesSmall="max-h-60 max-w-60"
        imgClassesButton="mr-4 mb-2"
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
              <DisplayNews imageName={"/images/"+article.imageName} imageAlt={article.imageAlt}>
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
                      })
                    }
                  </time>
                  {article.textBody.length > 1 ? (
                    <ExpandableText
                      className="max-w-full pr-2 lg:pr-8 pb-2"
                      preview={<p>{article.textBody[0]}</p>}
                    >
                      {article.textBody.slice(1).map((paragraph, pIdx) => (
                        <p key={pIdx} className="pt-4">{paragraph}</p>
                      ))}
                    </ExpandableText>
                  ) : (
                    <div className="max-w-full pr-2 lg:pr-8 pb-2">
                      <p>{article.textBody[0]}</p>
                    </div>
                  )}
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