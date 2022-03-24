import React, { useEffect, useState, useCallback } from "react";
import { getTheme, setTheme } from "../toggletheme/ToggleTheme";
import MenuLateral from "../menulateral/MenuLateral";
//style
import "./displaylayout.css";
import { BsMenuButtonWide } from "react-icons/bs";
//Layout
import { Tabs, Menu, Layout, Drawer } from "antd";
import { Components } from "../Components";
import TabContent from "../tabcontent/TabContent";
//Layout consts
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

//datos temporales API Fetch
const defaultPanes = require("../../panes.json");
const enabledApps = require("../../enabledApps.json");

export default function DisplayLayout() {
  const [state, setState] = useState({
    activeKey: defaultPanes[0].key,
    panes: defaultPanes,
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => setTheme(getTheme()), []);

  const onChange = (activeKey) => {
    const { panes } = state;
    setState({ activeKey: activeKey, panes });
  };

  const pushToPanes = ({ title, content, options, closable }) => {
    let { panes } = state;
    const addKey = `key_${Date.now()}`;
    panes.push({
      title: title,
      content: content,
      options: options,
      key: addKey,
      closable: closable,
    });
    setTimeout(() => {
      setState({ activeKey: addKey, panes: panes });
    }, 5);
  };

  const add = (app) => {
    try {
      pushToPanes(app);
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      remove(targetKey);
    } else if (action === "add") {
      add();
    }
  };

  const remove = (targetKey) => {
    let { activeKey } = state;
    const { panes } = state;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = newPanes[lastIndex].key;
      } else {
        activeKey = newPanes[0].key;
      }
    }
    setState({ activeKey: activeKey, panes: newPanes });
  };

  const operations = (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        <BsMenuButtonWide />
      </a>
    </div>
  );

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: "30px",
          }}
        ></Header>
        <Content
          className="site-layout"
          style={{
            padding: "0",
            marginTop: 0,
            height: "calc(100vh - 60px)",
          }}
        >
          <Tabs
            tabBarExtraContent={operations}
            hideAdd
            onChange={onChange}
            activeKey={state.activeKey}
            type="editable-card"
            onEdit={onEdit}
          >
            {state.panes.map((pane, i) => (
              <TabPane
                tab={
                  <span>
                    {Components[pane.icon]}
                    {pane.title}
                    {Components[pane.options]}
                  </span>
                }
                key={pane.key}
                closable={pane.closable}
              >
                <TabContent pane={pane} key={i} />
              </TabPane>
            ))}
          </Tabs>
        </Content>
        <Footer>
          <span>Footer</span>
        </Footer>
      </Layout>
      <Drawer
        title="Options"
        placement="right"
        width="30vw"
        onClose={onClose}
        visible={visible}
      >
        <MenuLateral
          add={add}
          enabledApps={enabledApps}
          setVisible={setVisible}
        />
      </Drawer>
    </Layout>
  );
}
