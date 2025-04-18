"use client";

/**
 * A link component directs users to a resource.
 * It can be used to link to a website, a social media profile, or a document.
 */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardProps,
  MediumCardProps,
  SmallCardProps,
  ThemeConfig,
} from "./types";
import appTheme from "@/config/theme";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHandle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { displayLocalePrice } from "@/lib/currency";

const theme = appTheme as ThemeConfig;

const getImageSize = (size: "sm" | "md", appTheme: ThemeConfig) => {
  const imageSize = {
    width:
      appTheme?.links?.[size]?.thumbnailImage?.width ??
      appTheme?.links?.thumbnailImage?.width ??
      undefined,
    height:
      appTheme?.links?.[size]?.thumbnailImage?.height ??
      appTheme?.links?.thumbnailImage?.height ??
      undefined,
  };

  return imageSize;
};

const getPreviewImageSize = (size: "md", appTheme: ThemeConfig) => {
  const imageSize = {
    width:
      appTheme?.links?.[size]?.preview?.thumbnailImage?.width ??
      appTheme?.links?.thumbnailImage?.width ??
      undefined,
    height:
      appTheme?.links?.[size]?.preview?.thumbnailImage?.height ??
      appTheme?.links?.thumbnailImage?.height ??
      undefined,
  };

  return imageSize;
};

const Thumbnail = ({
  image,
  alt,
  emoji,
  size = "sm",
  isPreview = false,
  className,
}: {
  image?: string;
  alt: string;
  emoji?: string;
  size?: "sm" | "md";
  isPreview?: boolean;
  className?: string;
}) => {
  const imageSize =
    isPreview && size === "md"
      ? getPreviewImageSize(size, theme)
      : getImageSize(size, theme);

  const themeClassnames =
    isPreview && size === "md"
      ? theme?.links?.[size]?.preview?.thumbnailImage?.className
      : theme?.links?.[size]?.thumbnailImage?.className;

  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        width={imageSize.width}
        height={imageSize.height}
        sizes="100vw"
        className={cn(
          `${size}-card-thumbnailImage`,
          "aspect-square",
          theme?.links?.thumbnailImage?.className,
          themeClassnames,
          className
        )}
      />
    );
  }

  if (emoji) {
    return (
      <span
        className={cn(
          `${size}-card-thumbnailEmoji`,
          "size-10 text-3xl content-center aspect-square",
          theme?.links?.thumbnailEmoji?.className,
          theme?.links?.[size]?.thumbnailEmoji?.className,
          className
        )}
      >
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={"/images/linkinbio/linkinbio-logo.png"}
      alt={"Linkinbio-placeholder"}
      width={imageSize.width}
      height={imageSize.height}
      className={cn(
        `${size}-card-thumbnailImage`,
        "text-muted-foreground bg-card",
        theme.links.thumbnailImage.className,
        themeClassnames,
        className
      )}
    />
  );
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
          "sm-card-background",
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
        <div className={cn("w-full mr-auto")}>{title}</div>
      </Card>
    </a>
  );
};

const PolarCheckoutLink = ({
  checkoutLink,
  children,
  className,
}: {
  checkoutLink: string;
  children: React.ReactNode;
  className?: string;
}) => {
  useEffect(() => {
    if (window && "Polar" in window) {
      console.log("Initializing Polar Embed Checkout", checkoutLink);
      (
        window.Polar as {
          EmbedCheckout: {
            init: () => void;
          };
        }
      ).EmbedCheckout.init();
    }
  }, []);

  return (
    <a
      href={checkoutLink}
      data-polar-checkout
      className={cn(className)}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </a>
  );
};

const MediumLinkCardPreview = ({
  url,
  polarCheckoutLink,
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
  );

  const CTALink = polarCheckoutLink ? (
    <PolarCheckoutLink
      checkoutLink={polarCheckoutLink}
      className="mt-auto w-full"
    >
      {CTAButton}
    </PolarCheckoutLink>
  ) : url ? (
    <a
      className="mt-auto w-full"
      href={url}
      target={newTab ? "_blank" : "_self"}
    >
      {CTAButton}
    </a>
  ) : null;

  return (
    <Card
      role="button"
      className={cn(
        "md-card-preview-background",
        "p-3 w-full",
        theme?.links?.background?.className,
        theme?.links?.[size]?.background?.className,
        theme?.links?.[size]?.preview?.background?.className
      )}
      onClick={onPreviewClick}
    >
      <CardContent
        className={cn(
          "md-card-preview-content",
          "p-0 w-full relative grid grid-cols-[1fr_2fr] gap-4 text-inherit",
          theme?.links?.content?.className,
          theme?.links?.[size]?.content?.className,
          theme?.links?.[size]?.preview?.content?.className
        )}
      >
        <Thumbnail
          isPreview
          image={thumbnailImage}
          emoji={thumbnailEmoji}
          alt={title}
          size={size}
        />
        <div className="flex-1 flex flex-col gap-2">
          <p
            className={cn(
              "md-card-preview-header",
              theme?.links?.font?.header?.className,
              theme?.links?.[size]?.font?.header?.className,
              theme?.links?.[size]?.preview?.font?.header?.className
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "md-card-preview-body",
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
                "md-card-preview-body",
                theme?.links?.font?.body?.className,
                theme?.links?.[size]?.preview?.font?.body?.className
              )}
            >
              {displayLocalePrice(price, currency)}
            </p>
          )}
          {buttonPosition === "inline" && CTALink}
        </div>
      </CardContent>
      {buttonPosition === "end" && CTALink}
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
  price,
  currency,
  polarCheckoutLink,
}: MediumCardProps) => {
  const imageSize = getImageSize(size, theme);

  const CheckoutButton = (
    <Button
      variant="outline"
      className={cn(
        "md-card-button",
        "w-full whitespace-normal h-auto",
        theme?.font.button.className,
        theme?.links?.button?.className,
        theme?.links?.[size]?.button?.className
      )}
    >
      {buttonText}
    </Button>
  );

  return (
    <Card
      className={cn(
        "md-card-background",
        "w-full min-h-[350px] flex flex-col",
        theme?.links?.background?.className,
        theme?.links?.[size]?.background?.className
      )}
    >
      <Thumbnail
        size={size}
        image={thumbnailImage}
        emoji={thumbnailEmoji}
        alt={title}
        className="w-full h-[250px] object-cover"
      />
      <CardContent
        className={cn(
          "md-card-content",
          "px-0 mt-8 w-full relative flex-1 flex flex-col items-start text-inherit overflow-auto pb-0",
          theme?.links?.content?.className,
          theme?.links?.[size]?.content?.className
        )}
      >
        <div className="space-y-4">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {price && <p>{displayLocalePrice(price, currency)}</p>}
          <p
            className={cn(
              "md-card-body",
              "text-balance",
              theme?.links?.font?.body?.className,
              theme?.links?.[size]?.font?.body?.className
            )}
          >
            {description}
          </p>
        </div>
        <div
          aria-hidden
          className={cn(
            "bg-linear-to-b h-[300px] min-h-[300px] max-h-[300px] -mt-[250px] sticky w-full bottom-17 inset-0 z-10 from-transparent from-80% select-none pointer-events-none",
            `to-[${theme?.colors.primary}]`
          )}
        />
        <div
          className={cn(
            "sticky bottom-0 pb-8 w-full z-20",
            theme?.container?.className
          )}
        >
          {polarCheckoutLink && !url ? (
            <PolarCheckoutLink
              checkoutLink={polarCheckoutLink}
              className="contents"
            >
              {CheckoutButton}
            </PolarCheckoutLink>
          ) : (
            <a
              className="contents"
              href={url}
              target={newTab ? "_blank" : "_self"}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {CheckoutButton}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MediumLinkCardWrapper = (props: MediumCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <Drawer
      open={isPreviewOpen}
      onOpenChange={setIsPreviewOpen}
      modal={false}
      handleOnly
    >
      <DrawerTrigger asChild>
        <MediumLinkCardPreview
          onPreviewClick={() => setIsPreviewOpen(true)}
          buttonPosition={
            (theme?.links?.[props.size]?.preview?.buttonPosition as
              | "inline"
              | "end") ?? theme?.links?.buttonPosition
          }
          {...props}
        />
      </DrawerTrigger>
      <DrawerContent
        overlay={
          <div
            onClick={() => setIsPreviewOpen(false)}
            className={cn(
              "absolute inset-0 bg-black/70 z-10",
              isPreviewOpen ? "animate-in fade-in-0 duration-300" : "opacity-0"
            )}
          />
        }
        className={cn(
          "md-card-background",
          "max-h-[98svh]",
          theme?.container?.className,
          theme?.links?.background?.className,
          theme?.links?.[props.size]?.background?.className
        )}
      >
        <DrawerHandle className="mx-auto my-4" />
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
