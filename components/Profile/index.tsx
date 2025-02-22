"use server";

import { DefaultStyleProps, getShapeStyles, Shapes } from "@/lib/styles";
/**
 * Displays the profile header with the user's name, email, and profile picture
 */

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type ProfilePictureProps = {
  src: string;
  fallback?: string;
  shape?: Shapes;
};

const ProfilePicture = ({ src, fallback, shape }: ProfilePictureProps) => {
  return (
    <Avatar className="size-24">
      <AvatarImage
        src={src}
        fetchPriority="high"
        className={cn(getShapeStyles(shape))}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

type ProfileProps = {
  name: string;
  description: string;
} & ProfilePictureProps &
  DefaultStyleProps;

export const Profile = async ({
  src,
  fallback = "",
  name,
  description,
  fontColour,
  shape = "circle",
}: ProfileProps) => {
  return (
    <section
      className="flex flex-col items-center text-center gap-2 max-w-[280px] mx-auto"
      style={{
        color: fontColour,
      }}
    >
      <ProfilePicture
        src={src}
        fallback={fallback}
        shape={shape}
      />
      <p className="font-semibold">{name}</p>
      <p className="text-sm">{description}</p>
    </section>
  );
};
