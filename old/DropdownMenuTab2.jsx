import { Menu, Dropdown } from "antd";
import { RiFullscreenFill, RiMore2Fill } from "react-icons/ri";
import { MdOutlineOpenInNew } from "react-icons/md";
import { VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import { getTheme } from "../toggletheme/ToggleTheme";
import { useEffect, useState } from "react";

export default function DropdownMenuTab() {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect();

  const toggleFullScreen = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFullScreen(!fullScreen);
      const divEl = document.getElementById(
        document
          .getElementsByClassName("ant-tabs-tab-active")[0]
          .children[0].getAttribute("aria-controls")
      );
      const bgColor = window
        .getComputedStyle(document.body, null)
        .getPropertyValue("background-color");
      console.log(bgColor);
      divEl.style = `background-color: ${bgColor}`;
      divEl.requestFullscreen();
    }, 1);
  };

  const menuTabDropdown = (
    <Menu>
      <Menu.Item key="0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <VscSplitVertical /> División vertical
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <VscSplitHorizontal /> División horizontal
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
          onClick={(e) => toggleFullScreen(e)}
        >
          <RiFullscreenFill /> Pantalla completa
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <MdOutlineOpenInNew /> Abrir en nueva ventana
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuTabDropdown}>
      <a
        key="0"
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <RiMore2Fill
          className="ant-tabs-tab-remove"
          style={{
            marginLeft: "0.8rem",
            marginRight: "-0.5rem",
            marginTop: "0.2rem",
          }}
        />
      </a>
    </Dropdown>
  );
}
