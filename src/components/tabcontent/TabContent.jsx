import { getTheme } from "../toggletheme/ToggleTheme";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { RiFullscreenFill } from "react-icons/ri";
import "./tabcontent.css";
import { useEffect } from "react";
import { Components } from "../Components";


export default function TabContent({ pane }) {

  const handle = useFullScreenHandle();
  return (
    <div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixedbutton"
        onClick={handle.enter}
      >
        <RiFullscreenFill />
      </a>
      <FullScreen handle={handle}>
        <div
          className={getTheme() === "dark" ? "fsWrapperDark" : "fsWrapperWhite"}
        >
          {Components[pane.content]}
        </div>
      </FullScreen>
    </div>
  );
}
