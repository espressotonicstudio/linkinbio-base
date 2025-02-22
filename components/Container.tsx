import { DefaultStyleProps } from "@/lib/styles";
import { cn } from "@/lib/utils";

type ContainerProps = {
  backgroundImage?: string;
  children: React.ReactNode;
} & DefaultStyleProps;

export const Container = async ({
  children,
  backgroundColor,
  backgroundImage,
  fontColour,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "min-h-screen px-4 py-8 sm:p-20 font-[family-name:var(--font-geist-sans)]",
        !!backgroundImage && "bg-cover bg-center"
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor: backgroundColor,
        color: fontColour,
      }}
    >
      <main className="max-w-md mx-auto space-y-8">{children}</main>
    </div>
  );
};
