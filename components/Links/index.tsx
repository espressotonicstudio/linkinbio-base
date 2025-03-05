/**
 * A link component directs users to a resource.
 * It can be used to link to a website, a social media profile, or a document.
 */
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardProps, MediumCardProps, SmallCardProps } from "./types";
import Image from "next/image";
import theme from "@/config/theme";
import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Thumbnail = ({
  image,
  alt,
  emoji,
  size = "sm",
}: {
  image?: string;
  alt: string;
  emoji?: string;
  size?: "sm" | "md";
}) => {
  const imageSize = {
    width:
      theme?.links?.[size]?.thumbnailImage?.width ??
      theme?.links?.thumbnailImage?.width ??
      40,
    height:
      theme?.links?.[size]?.thumbnailImage?.height ??
      theme?.links?.thumbnailImage?.height ??
      40,
  };

  if (image) {
    return (
      <div>
        <Image
          src={image}
          alt={alt}
          width={imageSize.width}
          height={imageSize.height}
          className={cn(
            "aspect-square",
            theme?.links?.thumbnailImage?.className,
            theme?.links?.[size]?.thumbnailImage?.className
          )}
        />
      </div>
    );
  }

  if (emoji) {
    return (
      <span
        className={cn(
          "size-10 text-3xl content-center aspect-square",
          theme?.links?.thumbnailEmoji?.className,
          theme?.links?.[size]?.thumbnailEmoji?.className
        )}
      >
        {emoji}
      </span>
    );
  }

  return null;
};

const SmallLinkCard = ({
  url,
  title,
  thumbnailImage,
  thumbnailEmoji,
  newTab = false,
  size = "sm",
}: SmallCardProps) => {
  return (
    <a
      href={url}
      target={newTab ? "_blank" : "_self"}
    >
      <Card
        className={cn(
          "p-2 min-h-14 rounded-full h-auto w-full relative text-center flex items-center gap-4 text-inherit",
          theme?.links?.background?.className,
          theme?.links?.[size]?.background?.className
        )}
      >
        <Thumbnail
          size={size}
          image={thumbnailImage}
          emoji={thumbnailEmoji}
          alt={title}
        />
        <div
          className={cn("w-full mr-auto", {
            "pr-10": thumbnailEmoji || thumbnailImage,
          })}
        >
          {title}
        </div>
      </Card>
    </a>
  );
};

const MediumLinkCardPreview = ({
  url,
  title,
  thumbnailImage,
  thumbnailEmoji,
  description,
  price,
  currency,
  newTab = false,
  buttonText = "Purchase",
  size = "md",
  onPreviewClick,
  buttonPosition = "inline",
}: MediumCardProps) => {
  const CTAButton = (
    <a
      className="mt-auto w-full"
      href={url}
      target={newTab ? "_blank" : "_self"}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Button
        variant="outline"
        className={cn(
          "w-full whitespace-normal h-auto",
          theme?.font.button.className,
          theme?.links?.button?.className,
          theme?.links?.[size]?.button?.className,
          theme?.links?.[size]?.preview?.button?.className
        )}
      >
        {buttonText}
      </Button>
    </a>
  );

  return (
    <Card
      role="button"
      className={cn(
        "p-3 w-full",
        theme?.links?.background?.className,
        theme?.links?.[size]?.background?.className,
        theme?.links?.[size]?.preview?.background?.className
      )}
      onClick={onPreviewClick}
    >
      <CardContent
        className={cn(
          "p-0 w-full relative flex flex-wrap items-start gap-4 text-inherit",
          theme?.links?.content?.className,
          theme?.links?.[size]?.content?.className,
          theme?.links?.[size]?.preview?.content?.className
        )}
      >
        <Thumbnail
          image={thumbnailImage}
          emoji={thumbnailEmoji}
          alt={title}
          size={size}
        />
        <div className="flex-1 flex flex-col gap-2">
          <p
            className={cn(
              theme?.links?.font?.header?.className,
              theme?.links?.[size]?.font?.header?.className,
              theme?.links?.[size]?.preview?.font?.header?.className
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "line-clamp-2 text-ellipsis",
              theme?.links?.font?.body?.className,
              theme?.links?.[size]?.font?.body?.className,
              theme?.links?.[size]?.preview?.font?.body?.className
            )}
          >
            {description}
          </p>
          {price && (
            <p
              className={cn(
                theme?.links?.font?.body?.className,
                theme?.links?.[size]?.preview?.font?.body?.className
              )}
            >
              {price} {currency}
            </p>
          )}
          {buttonPosition === "inline" && CTAButton}
        </div>
      </CardContent>
      {buttonPosition === "end" && CTAButton}
    </Card>
  );
};

const MediumLinkCard = ({
  url,
  title,
  thumbnailImage,
  thumbnailEmoji,
  description,
  newTab = false,
  buttonText = "Purchase",
  size = "md",
}: MediumCardProps) => {
  return (
    <Card
      className={cn(
        "p-3 w-full h-[70dvh] min-h-[350px]",
        theme?.links?.background?.className,
        theme?.links?.[size]?.background?.className
      )}
    >
      <CardContent
        className={cn(
          "px-0 h-full w-full relative flex flex-col items-start gap-4 text-inherit",
          theme?.links?.content?.className,
          theme?.links?.[size]?.content?.className
        )}
      >
        <Thumbnail
          image={thumbnailImage}
          emoji={thumbnailEmoji}
          alt={title}
          size={size}
        />
        <p
          className={cn(
            theme?.links?.font?.header?.className,
            theme?.links?.[size]?.font?.header?.className
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            theme?.links?.font?.body?.className,
            theme?.links?.[size]?.font?.body?.className
          )}
        >
          {description}
        </p>
        <a
          className="mt-auto w-full"
          href={url}
          target={newTab ? "_blank" : "_self"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            variant="outline"
            className={cn(
              "w-full whitespace-normal h-auto",
              theme?.font.button.className,
              theme?.links?.button?.className,
              theme?.links?.[size]?.button?.className
            )}
          >
            {buttonText}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

const MediumLinkCardWrapper = (props: MediumCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const drawerCntr = useRef<HTMLDivElement>(
    document.getElementById("preview-container") as HTMLDivElement
  );

  // This is a hack for the builder
  useEffect(() => {
    drawerCntr.current = document.getElementById(
      "preview-container"
    ) as HTMLDivElement;
  }, []);

  if (!drawerCntr.current) {
    return null;
  }

  return (
    <Drawer
      open={isPreviewOpen}
      onOpenChange={setIsPreviewOpen}
    >
      <DrawerTrigger asChild>
        <MediumLinkCardPreview
          onPreviewClick={() => setIsPreviewOpen(true)}
          buttonPosition={
            (theme?.links?.[props.size]?.buttonPosition as "inline" | "end") ??
            theme?.links?.buttonPosition
          }
          {...props}
        />
      </DrawerTrigger>
      <DrawerContent
        container={drawerCntr.current}
        className={cn(
          "absolute",
          theme?.links?.background?.className,
          theme?.links?.[props.size]?.background?.className
        )}
      >
        <VisuallyHidden>
          <DrawerTitle>{props.title}</DrawerTitle>
        </VisuallyHidden>
        <MediumLinkCard {...props} />
      </DrawerContent>
    </Drawer>
  );
};

// Type guards to narrow the props
function isSmallCardProps(props: CardProps): props is SmallCardProps {
  return props.size === "sm";
}

function isMediumCardProps(props: CardProps): props is MediumCardProps {
  return props.size === "md";
}

export const Link = (props: CardProps) => {
  if (isSmallCardProps(props)) {
    return <SmallLinkCard {...props} />;
  }

  if (isMediumCardProps(props)) {
    return <MediumLinkCardWrapper {...props} />;
  }

  return null;
};
