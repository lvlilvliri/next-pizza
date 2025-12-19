"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AuthModal,
  CartButton,
  ProfileButton,
  SearchInput,
  Container,
} from "./index";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCartButton = true,
}) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success(
        "Order paid successfully! Information has been sent to your email.",
        { duration: 5000 }
      );
    }
  }, []);

  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left part */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкуснее не бывает
              </p>
            </div>
          </div>
        </Link>

        {/* Middle part */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right part */}
        <div className="flex items-center gap-4">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCartButton && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
