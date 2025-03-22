import React from "react";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

type Props = {
  description: string;
};

const AlertComponent = ({ description }: Props) => {
  return (
    <Alert variant="default">
      <CircleAlert />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
