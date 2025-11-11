import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import Link from "next/link";
import { User, ShoppingCart, ArrowRight } from "lucide-react";
import { CartButton, SearchInput } from "./index";
interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCartButton = true }) => {
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
        { hasSearch && <div className="mx-10 flex-1">
          <SearchInput />
        </div>}

        {/* Right part */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          {hasCartButton && <div>
            <CartButton />
          </div>}
        </div>
      </Container>
    </header>
  );
};
