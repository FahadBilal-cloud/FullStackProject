import React from "react";

const Account: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4 py-20">
      <div className="flex justify-between">
        <p>My Account</p>
        <h4 className="text-lg font-medium">Welcome <span className="text-red-500">Fahad!</span> </h4>
      </div>
      <div className="grid md:grid-cols-12 gap-6 mt-20">
        {/* Account */}
        <div className="space-y-4 md:col-span-3">
          <h2 className="font-medium text-lg">Manage My Account</h2>
          <div className="px-4 flex flex-col gap-1">
            <span className="text-gray-400 active:text-red-500">
              My Profile
            </span>
            <span className="text-gray-400 active:text-red-500">
              Address Book
            </span>
            <span className="text-gray-400 active:text-red-500">
              My Payment Options
            </span>
          </div>
          <h2 className="font-medium text-lg">My Orders</h2>
          <div className="px-4 flex flex-col gap-1">
            <span className="text-gray-400 active:text-red-500">
              My Returns
            </span>
            <span className="text-gray-400 active:text-red-500">
              My Cancellations
            </span>
          </div>
          <h2 className="font-medium text-lg">My Wishlist</h2>
        </div>

        {/* Edit Profile */}
        <div className="sm:px-20 px-10 sm:py-10 py-8 shadow-md rounded-md md:col-span-9">
          <h2 className="text-red-500 font-medium mb-6 text-2xl">
            Edit Your Profile
          </h2>
          <form action="" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="mb-1 text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={""}
                  className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                  placeholder="Fahad"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1 text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={""}
                  className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                  placeholder="Bilal"
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="mb-1 text-gray-400">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={""}
                  className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                  placeholder="fahad@fmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="mb-1 text-gray-400">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={""}
                  className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                  placeholder="Mumtazabad, Multan"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <label htmlFor="password" className="mb-1 text-gray-400">
                Password Changes
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={""}
                className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                placeholder="Current Password"
                required
              />
              <input
                type="text"
                id="city"
                name="city"
                value={""}
                className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                placeholder="New Password"
                required
              />
              <input
                type="text"
                id="phone"
                name="phone"
                value={""}
                className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="flex justify-end gap-6">
              <button className="sm:px-10 px-6 py-3 transition-all duration-300 hover:border-red-500 hover:border">
                Cancle
              </button>
              <button className="border sm:px-10 px-6 sm:py-5 py-3 rounded-md bg-red-500 hover:bg-red-600 text-white border-red-500 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
