import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { signOut, useSession } from "next-auth/client";
function Header() {
  const [session] = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center px-1 py-1 shadow-md bg-white h-15 w-13" >
      <Button
        color="gray"
        ripple="light"
        buttonType="outline"
        iconOnly={true}
        className="h-20 w-20 border-0"
        rounded={true}
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="4xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-xl">Docs</h1>
      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="3xl" color="darkgray" />
        <input
          type="text"
          placeholder="search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <Button
        color="gray"
        ripple="dark"
        buttonType="outline"
        iconOnly={true}
        className=" md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0"
        rounded={true}
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        onClick={signOut}
        loading="lazy"
        className=" cursor-pointer h-10 w-10 rounded-full ml-2 mr-4"
        src={session?.user?.image}
        alt=""
      />
    </header>
  );
}

export default Header;
