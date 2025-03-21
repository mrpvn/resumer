import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Resume } from "@prisma/client";
import { formatDate } from "date-fns";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{resume?.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {wasUpdated ? "Updated" : "Created"} on{" "}
          {resume.updatedAt
            ? formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
