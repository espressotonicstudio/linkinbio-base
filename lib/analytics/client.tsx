import { OpenPanelComponent } from "@openpanel/nextjs";

const isProd = process.env.NODE_ENV === "production";

export const Analytics = () => {
  return (
    <OpenPanelComponent
      clientId={process.env.OPEN_PANEL_CLIENT_ID!}
      trackScreenViews={isProd}
      trackOutgoingLinks={isProd}
    />
  );
};
