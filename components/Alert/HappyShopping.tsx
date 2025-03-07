import { Smile } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
  message: string | undefined;
};

export function AlertHappy({ message }: Props) {
  return (
    <Alert className="fixed bottom-12 flex items-center gap-4">
      <Smile className="h-4 w-4" />
      <AlertDescription className="text-lg">{message}</AlertDescription>
    </Alert>
  );
}
