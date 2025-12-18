import Logo from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <header className="p-3 flex justify-between items-center">
        <Logo
          showText
          asLink
          imageClassName="size-8"
          className="flex items-center gap-2 flex-row text-sm"
        />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <Button asChild variant="ghost">
                <a href="#features">Features</a>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <Button asChild variant="ghost">
                <a href="#pricing">Pricing</a>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </header>
      <section className="h-screen relative">
        {/* <Aurora
        colorStops={["#82aef4", "#89ab9d", "#72a4c1"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      /> */}
        <div className="absolute top-1/2 start-1/2 -translate-1/2 flex flex-col items-center gap-5">
          <div className="text-center space-y-2">
            <h1 className="font-bold text-3xl">
              One place for your academic life
            </h1>
            <p className="text-base text-pretty">
              Track courses, assignments, deadlines, and notes, without need for
              WhatsApp, Google Drive, and scattered tools.
            </p>
            <p className="text-sm text-gray-600">
              Free. Built by students. No data collection.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/signup">Get started for free</Link>
            </Button>
            <Button variant="secondary">See how it works</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
