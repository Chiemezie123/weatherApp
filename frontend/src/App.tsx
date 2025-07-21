import { useState } from "react";
import SideBar from "./components/ui/sideBar";
import NavBar from "./components/ui/navBar";
import MainDisplay from "./components/ui/mainDisplay";
import { cn } from "./lib/utils";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <main className="flex h-screen">
      <SideBar collapse={collapsed} toggleHandler={toggleSidebar} />
      <div
        className={cn(
          "flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          collapsed ? "ml-0 sm:ml-[96px]" : "ml-0 sm:ml-[272px]"
        )}
      >
        <NavBar collapse={collapsed} openSidebar={toggleSidebar} />
        <MainDisplay collapse={collapsed} />
      </div>
    </main>
  );
}

export default App;
