import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputNumber } from "primereact/inputnumber";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/home"),
    },
    {
      label: "Chatbot",
      icon: "pi pi-microchip-ai",
      command: () => navigate("/chatbot"),
    },
    {
      label: "Logs",
      icon:
        location.pathname === "/logs" ? "pi pi-folder-open" : "pi pi-folder",
      command: () => navigate("/logs"),
    },
  ];

  const searchBar = (
    <InputNumber
      placeholder="Search Worker by Id"
      useGrouping={false}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value?.trim() !== "") {
          console.log("Search:", e.target.value);
          navigate(`/panel/${e.target.value}`);
        }
      }}
    />
  );

  return (
    <div>
      <Menubar model={items} start={searchBar} />
    </div>
  );
}

export default Navbar;
