import { tv } from "tailwind-variants";

export type Shapes = "circle" | "rounded" | "sharp";
export type Themes = "solid" | "outline" | "retro" | "glass";
export type Shadows = "none" | "soft" | "hard" | "none";

export type DefaultStyleProps = {
  fontColour?: string;
  backgroundColor?: string;
  shape?: Shapes;
  theme?: Themes;
  themeColor?: string;
};

export const getShapeStyles = (shape?: Shapes) => {
  if (!shape) return "";

  return tv({
    variants: {
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
        sharp: "rounded-none",
      } satisfies Record<Shapes, string>,
    },
  })({ shape });
};

export const getShadowStyles = (shadow?: Shadows, color?: string) => {
  if (!shadow) return "";

  return {
    [`drop-shadow(6px_6px_${color})`]: shadow === "hard",
  };
};

export const themeVariants = tv({
  base: "shadow-none",
  variants: {
    theme: {
      solid: "border-none",
      outline: `bg-transparent border`,
      retro: "hover:translate-x-0.5 hover:translate-y-0.5",
      glass: "border-none bg-white/10 backdrop-blur-md",
    } satisfies Record<Themes, string>,
  },
});

// We need this as inline styles because tw can't generate the dynamic rgb values at runtime
export const getDynamicThemeStyles = (
  theme?: Themes,
  color: string = "black"
) => {
  switch (theme) {
    case "outline":
      return {
        borderColor: `rgb(from ${color} r g b)`,
      };
    case "retro":
      return {
        filter: `drop-shadow(6px 6px ${color})`,
      };
    default:
      return {};
  }
};
