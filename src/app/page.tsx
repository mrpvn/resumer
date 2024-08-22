import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      Resumer
      <Button>Click Me</Button>
      <ModeToggle/>
      <UserButton/>
    </div>
  );
}
