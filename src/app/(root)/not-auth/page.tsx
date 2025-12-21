import { InfoBlock } from "@/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access Denied"
        text="You must be logged in to access this page."
        imageUrl="/lock.png"
      />
    </div>
  );
}
