import React, { useCallback, useEffect } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { IStory } from "../../../../shared/services/stories";
import { toast } from "react-hot-toast";

type PropType = {
  slides: IStory[];
  options?: EmblaOptionsType;
};

const EmblaCarouselStories = (props: PropType) => {
  const { slides, options } = props;
  const autoplayRef = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayRef.current]);

  useEffect(() => {
    if (!emblaApi) return;

    return () => {
      autoplayRef.current.destroy();
    };
  }, [emblaApi]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((story, index) => (
            <div className="embla__slide" key={story.id}>
              <img
                key={story.id}
                onClick={() => toast.error("Stories are unavailable now")}
                className="rounded-md cursor-pointer object-cover w-full h-full"
                src={story.previewImageUrl}
                alt="Story"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselStories;
