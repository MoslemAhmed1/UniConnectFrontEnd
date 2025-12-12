import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";
import { useAuth } from "@/providers/context/authContext";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router";

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    await api.get("/api/auth/logout");
    setAuth({
      token: null,
      user: null,
    });
  };

  const getProfilePath = () => {
    if (!auth.user) return "/";

    return auth.user.role === "professor/ta"
      ? "/instructor/profile"
      : "/student/profile";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage
              src={auth.user?.image_url}
              alt="Your profile avatar."
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={getProfilePath()}>
              My Profile <User className="ms-auto" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem asChild onClick={handleLogout}>
          <p>
            Log out <LogOut className="ms-auto" />
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
