import * as React from "react";

const link = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  code: string;
}

export function VerificationTemplate({ code }: Props) {
  return (
    <div>
      <p>Verification code: {code}</p>

      <p>
        <a href={`${link}/api/auth/verify?code=${code}`}>
          Or click this link to verify
        </a>
      </p>
    </div>
  );
}
