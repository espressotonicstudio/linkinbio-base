"use server";

import { DefaultStyleProps } from "@/config/styles";
/**
 * Displays the profile header with the user's name, email, and profile picture
 */

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import theme from "@/config/theme.json";

type ProfilePictureProps = {
  src: string;
  fallback?: string;
};

const ProfilePicture = ({ src, fallback }: ProfilePictureProps) => {
  return (
    <Avatar className={cn("size-24", theme?.profile?.avatar.className)}>
      <AvatarImage
        src={src}
        fetchPriority="high"
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export type ProfileProps = {
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
      />
      <p className={cn(theme?.font.header.className, "font-semibold")}>
        {name}
      </p>
      <p className="text-sm">{description}</p>
    </section>
  );
};
