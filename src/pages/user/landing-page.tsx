import CurvedLoop from "@/components/CurvedLoop";
import Logo from "@/components/global/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Check } from "lucide-react";
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
            <NavigationMenuItem asChild>
              <Button asChild variant="ghost">
                <a href="#contributors">Contributors</a>
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
      <section
        className="h-screen relative flex flex-col items-center"
        id="contributors"
      >
        <h2 className="text-6xl font-bold">Contributors</h2>
        <CurvedLoop
          marqueeText="Marwan Mohammed ✦ Abdulrahman Jalal ✦ Moslem Ahmed ✦"
          speed={2}
          curveAmount={300}
          interactive={false}
          className="fill-black!"
        />
      </section>
      <section
        className="h-screen relative flex flex-col items-center"
        id="pricing"
      >
        <h2 className="text-6xl font-bold mb-3">Pricing</h2>
        <p className="text-lg mb-7">Just kidding, there's only one option 😉</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
          <Card>
            <CardContent className="space-y-4 flex flex-col items-center">
              <div className="flex flex-col gap-3 items-center">
                <Badge>Basic</Badge>
                <div>
                  <del className="text-6xl font-bold">$9.99</del>
                  <span className="text-sm">/mo</span>
                </div>
              </div>
              <ul>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Join and chat in all courses
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  View events across all enrolled courses
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Submit assignments solutions and view your grades and feedback
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Vote in polls and receive announcements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  View and download course materials
                </li>
              </ul>
              <Button asChild className="rounded-full">
                <Link to="/signup">Get started now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 flex flex-col items-center">
              <div className="flex flex-col gap-3 items-center">
                <Badge>Everything</Badge>
                <span className="text-6xl font-bold">$0</span>
                <span className="font-bold text-xl">forever</span>
              </div>
              <ul>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Join and chat in all courses
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  View events across all enrolled courses
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Submit assignments solutions and view your grades and feedback
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  Vote in polls and receive announcements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-primary" />
                  View and download course materials
                </li>
              </ul>
              <Button asChild className="rounded-full">
                <Link to="/signup">Get started now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
