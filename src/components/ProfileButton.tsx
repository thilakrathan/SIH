import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileButtonProps {
  userName?: string;
  userImage?: string;
  onClick?: () => void;
}

export const ProfileButton = ({ userName = "User", userImage, onClick }: ProfileButtonProps) => {
  const initials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="h-10 w-10 rounded-full p-0 hover:bg-accent"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={userImage} alt={userName} />
        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
          {userImage ? initials : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};