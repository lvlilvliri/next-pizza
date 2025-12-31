"use client";
import React from "react";
import { Api } from "../../../shared/services/api-client";
import { IStory } from "../../../shared/services/stories";
import { Container } from ".";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();
  const [storySize, setStorySize] = React.useState({ width: 520, height: 800 });

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const updateSize = () => {
      const maxWidth = 520;
      const maxHeight = 800;
      const width = Math.min(maxWidth, Math.max(280, window.innerWidth - 32));
      const height = Math.min(
        maxHeight,
        Math.max(320, window.innerHeight - 48)
      );

      setStorySize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [open]);

  return (
    <Container
      className={cn(
        "flex items-center justify-between gap-2 my-10 ",
        className
      )}
    >
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
          />
        ))}

      {stories.map((story) => (
        <img
          key={story.id}
          onClick={() => onClickStory(story)}
          className="rounded-md cursor-pointer"
          height={250}
          width={200}
          src={story.previewImageUrl}
        />
      ))}

      {open && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative"
            style={{ width: storySize.width, height: storySize.height }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute -right-8 -top-8 z-30 rounded-full p-1"
              onClick={() => setOpen(false)}
            >
              <X className="w-8 h-8 text-white/50" />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ||
                []
              }
              defaultInterval={3000}
              width={storySize.width}
              height={storySize.height}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
