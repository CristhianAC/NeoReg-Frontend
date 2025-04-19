import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputNumber } from "primereact/inputnumber";
function Navbar() {
  const navigate = useNavigate();
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
  ];

  const searchBar = (
    <InputNumber
      placeholder="Search Worker by Id"
      useGrouping={false}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value?.trim() !== "") {
          console.log("Search:", e.target.value);
          navigate(`/worker/${e.target.value}`);
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
