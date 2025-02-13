import { NAV_MENU } from "@/core/consts";

export default function Home() {
  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg shadow-md container mx-auto text-black">
      <h2 className="text-xl mb-4">Hey! It is Technical assignment</h2>
      <ul>
        <li>Click on "{NAV_MENU.LOGIN}" to view the task related to it.</li>
        <li>Click on "{NAV_MENU.BALANCE}" to view the task related to it.</li>
      </ul>
    </div>
  );
}
