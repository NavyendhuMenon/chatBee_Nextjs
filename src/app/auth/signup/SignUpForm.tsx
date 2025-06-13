import { GiBee } from "react-icons/gi";
import { JSX } from "react";

export default function SignUp(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
                  <h1 className="text-[var(--color-primary)] text-3xl font-extrabold flex items-center gap-3">
                    Sign Up <GiBee className="text-4xl" />
                  </h1>
                </div>

        <h3 className="text-center text-[var(--color-secondary)]">
          Please sign up to ChatBee
        </h3>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-medium text-[var(--color-secondary)]"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-medium text-[var(--color-secondary)] mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-medium text-[var(--color-secondary)] mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="profile_pic"
              className="font-medium text-[var(--color-secondary)] mb-1"
            >
              {" "}
              Profile Picture :
              <div className="flex justify-center items-center h-16 bg-gray-100 border border-gray-300 hover:border-[var(--color-primary)] cursor-pointer rounded-lg transition duration-300 ease-in-out shadow-sm hover:shadow-md">
                <p className="text-sm max-w-[300px] text-[var(--color-secondary)] font-medium "></p>
                <button className="text-lg pl-2  "> Upload Photo...</button>
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 focus:outline-[var(--color-primary) hidden"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button className="w-full text-lg font-semibold text-white bg-[var(--color-primary)] py-2 rounded-md hover:bg-opacity-90 transition-all">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
