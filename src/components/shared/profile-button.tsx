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
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={className}>
      {loading ? (
        <Button
          variant="default"
          className="flex items-center gap-2 min-w-[110px]"
          loading
          aria-label="Loading profile"
        />
      ) : !session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1 min-w-[110px]"
        >
          <User size={16} />
          Log In
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            variant="outline"
            className="flex items-center gap-2 min-w-[110px]"
          >
            <CircleUser size={16} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
