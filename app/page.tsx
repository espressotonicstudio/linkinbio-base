import { Container } from "@/components/Container";
import { Link } from "@/components/Links";
import { Profile } from "@/components/Profile";
import { Social } from "@/components/Socials";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Espresso Tonic Studio",
    description:
      "We're a development studio and we teach you how to build your own apps on the web.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://espressotonicstudio.com",
      title: "Espresso Tonic Studio",
      description:
        "We're a development studio and we teach you how to build your own apps on the web.",
    },
  };
};

export default async function Home() {
  return (
    <Container
      fontColour="#f4f6fc"
      backgroundImage="/background2.png"
    >
      <Profile
        src="/avatar.png"
        name="@espressotonicstudio"
        description="We're a development studio and we teach you how to build your own apps on the web."
      />
      <section
        id="socials"
        className="flex gap-4 mx-auto justify-center"
      >
        <Social
          url="https://x.com/espressotonicstudio"
          brand="x"
          color="f4f6fc"
        />
        <Social
          url="https://youtube.com/@espressotonicstudio"
          brand="youtube"
          color="f4f6fc"
        />
        <Social
          url="https://youtube.com/@espressotonicstudio"
          brand="instagram"
          color="f4f6fc"
        />
        <Social
          url="https://tiktok.com/@espressotonicstudio"
          brand="tiktok"
          color="f4f6fc"
        />
      </section>
      <section
        id="links"
        className="flex flex-col gap-4"
      >
        <Link
          size="sm"
          fontColour="black"
          url="https://github.com/espressotonicstudio"
          title="Github"
        />
        <Link
          size="sm"
          fontColour="black"
          url="https://github.com/espressotonicstudio"
          title="Retro 🕺"
          theme="retro"
          shape="rounded"
          themeColor="blue"
        />
        <Link
          size="sm"
          fontColour="#f4f6fc"
          url="https://github.com/espressotonicstudio"
          title="FIRE Podcast 🎧 🔥"
          thumbnailEmoji="🎧"
          shape="sharp"
          theme="glass"
        />
        <Link
          size="sm"
          fontColour="#f4f6fc"
          url="https://buy.polar.sh/polar_cl_6fyV7yILyAAKa9tLkMDHBBL2AGSxq8KaRVkjb3K2G1O"
          title="Want to build your own app? Book a free consultation with Espresso Tonic Studio"
          thumbnailImage="/avatar.png"
          theme="outline"
        />
        <Link
          size="md"
          fontColour="black"
          url="https://buy.polar.sh/polar_cl_6fyV7yILyAAKa9tLkMDHBBL2AGSxq8KaRVkjb3K2G1O"
          title="Want to build your own app?"
          description="We're a lovely team of two! We teach you how to create your own apps on the web."
          thumbnailImage="/avatar.png"
          buttonText="Book a free consultation"
        />
        <a
          href="https://espressotonic.studio"
          className="text-center text-xs"
        >
          <i>© {new Date().getFullYear()} Espresso Tonic Studio</i>
        </a>
      </section>
    </Container>
  );
}
