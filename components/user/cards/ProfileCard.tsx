import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Edit2 } from "lucide-react";

type Props = {
  id: string | undefined;
  firstname?: string;
  lastname?: string;
  picture?: string;
};

export default function ProfileCard({
  id,
  picture,
  firstname = "",
  lastname = "",
}: Props) {
  console.log(picture);
  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");

  const firstInitial = getInitials(firstname);
  const lastInitial = getInitials(lastname);

  return (
    <Card className="p-3 flex flex-col items-center">
      <Avatar className="w-20 h-20 mb-4">
        <AvatarImage src={picture} alt={`${firstname} ${lastname}`} />
        <AvatarFallback>
          {firstInitial} {lastInitial}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center justify-center">
        <h1 className="font-bold text-xl mr-2">
          {firstname} {lastname}
        </h1>
        {id && (
          <Link href={`/profile/${id}/edit`} aria-label="Edit Profile">
            <Edit2 className="text-gray-600 hover:text-black" />
          </Link>
        )}
      </div>

      <ul className="text-gray-500 py-2 px-3 mt-3 divide-y rounded shadow-sm w-full">
        <li className="flex items-center justify-between py-3">
          <span>Status</span>
          <span className="bg-black py-1 px-2 rounded text-white text-sm">
            Active
          </span>
        </li>
      </ul>
    </Card>
  );
}
