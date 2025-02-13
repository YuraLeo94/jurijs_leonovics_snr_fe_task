import { NAV_MENU, PATH } from "@/core/consts";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <Link
        href={PATH.HOME}
        className="mr-4 text-blue-500 hover:text-yellow-400"
      >
        {NAV_MENU.HOME}
      </Link>
      <Link
        href={PATH.LOGIN}
        className="mr-4 text-blue-500 hover:text-yellow-400"
      >
        {NAV_MENU.LOGIN}
      </Link>
      <Link
        href={PATH.BALANCE}
        className="mr-4 text-blue-500 hover:text-yellow-400"
      >
        {NAV_MENU.BALANCE}
      </Link>
    </nav>
  );
};

export default Navigation;
