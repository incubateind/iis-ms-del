import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import Map from "mapmyindia-react";

import Topbar from "./components/Topbar";
import Sidebar from "./components/navigation/Sidebar";
import Input from "./components/pages/Input";
import Body from "./components/Body";

import "./index.css";

const pages = [
  {
    name: "Alerts",
    iconClass: "fas fa-keyboard",
    path: "/input",
    component: Input
  }
];

const App = () => {
  const [sidebarIsShown, setSidebarIsShown] = useState(false);
  const [markups, setMarkups] = useState([
    {
        position: [31.496918, -108.208885],
        draggable: true,
        title: "Marker title",
        onClick: e => {
            console.log("clicked ");
        },
        onDragend: e => {
            console.log("dragged");
        }
    }
]);

  useEffect(() => {
    axios
      .get("/test")
      .then(resp => {
        const data = resp.data;
        const markups = data.map(markup => {
          let latlongArray = [];
          latlongArray.push(markup.latitude);
          latlongArray.push(markup.longitude);

          const title = markup.title;
          return {
            position: latlongArray,
            draggable: true,
            title: title,
            onClick: e => {
              console.log("clicked ");
            },
            onDragend: e => {
              console.log("dragged");
            }
          };
        });
        setMarkups(markups);
      })
      .catch(err => console.log(error));
  }, []);

  const toggleSideBar = () => {
    setSidebarIsShown(prev => !prev);
  };

  return (
    <div className="app">
      <Topbar toggleSidebar={toggleSideBar} />
      <div className="flex">
        <Sidebar sidebarIsShown={true} pages={pages} location={"/"} />
        <Body>
          <Map markers={markups} />
        </Body>
      </div>
    </div>
  );
};

export default App;
