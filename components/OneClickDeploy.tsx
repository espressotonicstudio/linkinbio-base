import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const OneClickDeploy = () => {
  return (
    <a
      className="fixed bottom-4 right-4"
      href="https://vercel.com/new/clone?repository-url=https://github.com/espresstonicstudio/storefront"
      target="_blank"
      rel="noopener noreferrer"
    >
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button>Deploy your own</Button>
          </TooltipTrigger>
          <TooltipContent align="end">
            <p>
              This will clone the repository and create a new project on Vercel.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </a>
  );
};
