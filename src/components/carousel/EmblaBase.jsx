import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function EmblaBase({ options = {}, plugins = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    const autoplay = emblaApi.plugins() && emblaApi.plugins().autoplay;
    if (autoplay) {
      autoplay.stop();
      autoplay.play();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    const autoplay = emblaApi.plugins() && emblaApi.plugins().autoplay;
    if (autoplay) {
      autoplay.stop();
      autoplay.play();
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    const autoplay = emblaApi.plugins() && emblaApi.plugins().autoplay;
    if (autoplay) {
      autoplay.stop();
      autoplay.play();
    }
  }, [emblaApi]);

  const canScrollPrev = useCallback(() => {
    return emblaApi ? emblaApi.canScrollPrev() : false;
  }, [emblaApi]);

  const canScrollNext = useCallback(() => {
    return emblaApi ? emblaApi.canScrollNext() : false;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    
    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
    canScrollPrev,
    canScrollNext,
  };
}