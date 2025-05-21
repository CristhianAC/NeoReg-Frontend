import React, { use } from "react";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

function LogDropdown({ setLogEndpoint, setParams, setShowTables }) {
  const [container, setContainer] = useState("null");
  const containerOptions = ["rag", "users", "workers"];

  const [type, setType] = useState(null);
  const typeOptions = ["request", "response"];

  const [method, setMethod] = useState("ALL");
  const methodOptions = ["POST", "GET", "PUT", "DELETE", "ALL"];

  const [limit, setLimit] = useState(100);
  const [inputValue, setInputValue] = useState(100);

  function updateParams() {
    if ((method == "ALL") | (type == "response")) {
      setParams({ limit: limit, type_filter: type });
    } else {
      setParams({ limit: limit, type_filter: type, method_filter: method });
    }
  }

  return (
    <div>
      <h3>Select Filters</h3>
      <Dropdown
        value={container}
        onChange={(e) => setContainer(e.value)}
        options={containerOptions}
        placeholder="select container"
      />
      <Dropdown
        value={type}
        onChange={(e) => setType(e.value)}
        options={typeOptions}
        placeholder="select type"
      />
      {type === "request" ? (
        <>
          <Dropdown
            value={method}
            onChange={(e) => setMethod(e.value)}
            options={methodOptions}
            placeholder="select Method"
          />
        </>
      ) : (
        <></>
      )}

      <InputNumber
        placeholder="Limit"
        useGrouping={false}
        onChange={(e) => setLimit(e.value)}
      />
      <p>{limit ? ` limit: ${limit}` : 100}</p>

      <Button
        label="Search Logs"
        onClick={() => {
          // set endpoint if type is given
          if (type) {
            setLogEndpoint(container);
            updateParams();
            setShowTables(true);
          } else {
            window.alert("You need to set type");
          }
        }}
      />
    </div>
  );
}

export default LogDropdown;
