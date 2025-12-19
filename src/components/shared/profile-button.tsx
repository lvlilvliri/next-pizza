import React from "react";
import { useSession } from "next-auth/react";
import { CircleUser, User } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="outline" className="flex items-center gap-2">
            <CircleUser size={16} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
