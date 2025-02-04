"use client";
import ProfileCard from "./ProfileCard";
import AboutCard from "./AboutCard";
import OrdersCard from "./OrdersCard";

type Props = {
  user: User | undefined;
  orders?: Order[] | undefined;
  errorOrder?: string | null;
};

export default function UserProfile({ user, orders, errorOrder }: Props) {
  return (
    <>
      <section>
        <div className="mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <ProfileCard
                id={user?._id}
                picture={user?.picture}
                email={user?.email}
                firstname={user?.first_name}
                lastname={user?.last_name}
              />
            </div>

            <div className="w-full md:w-9/12 mt-3 md:mt-0">
              <AboutCard
                // username={user?.first_name}
                firstname={user?.first_name}
                lastname={user?.last_name}
                email={user?.email}
                address={user?.address}
                phoneNumber={user?.phone_number}
              />

              <div className="my-4"></div>

              {orders?.length ? (
                <OrdersCard orders={orders} />
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  {errorOrder}
                </p>
              )}

              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
