import { Card } from "@/components/ui/card";

type Props = {
  firstname?: string;
  lastname?: string;
  email: string | undefined;
  address?: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
  };
  phoneNumber: string | undefined;
};

export default function AboutCard({
  firstname,
  lastname,
  email,
  address,
  phoneNumber,
}: Props) {
  return (
    <Card className=" p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold leading-8">
        <span className="text-black">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>
      <div className="text-gray-400">
        <div className="grid md:grid-cols-2 text-sm">
          {/* <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              User Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{username} </div>
          </div> */}
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              First Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{firstname} </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Last Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{lastname}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">Phone</div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{phoneNumber}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Address line 1
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">
              {address?.address_line1}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Address line 2
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">
              {address?.address_line2 ? address?.address_line2 : "N/A"}
            </div>
          </div>
          {/* <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Permanant Address
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{permanent_address}</div>
          </div> */}
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Email.
            </div>
            <div className="px-0 py-2 sm:px-4 sm:py-2 overflow-auto">
              <p className="text-blue-800">{email}</p>
            </div>
          </div>
          {/* <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Birthday
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{birthday}</div>
          </div> */}
        </div>
      </div>
      {/* <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
        Show Full Information
      </button> */}
    </Card>
  );
}
