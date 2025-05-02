import React from "react";
import { Button } from "primereact/button";

function TableButtons({ setView }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
      <Button
        label="None"
        onClick={() => {
          setView("none");
        }}
      />
      <Button
        label="Requests"
        onClick={() => {
          setView("requests");
        }}
      />
      <Button
        label="Responses"
        onClick={() => {
          setView("response");
        }}
      />
      <Button
        style={{ background: "#49cc90", borderColor: "#49cc90" }}
        className="p-button-rounded"
        label="POST"
        onClick={() => {
          setView("response");
        }}
      />
      <Button
        style={{ background: "#fca130", borderColor: "#fca130" }}
        className="p-button-rounded"
        label="PUT"
        onClick={() => {
          setView("response");
        }}
      />
      <Button
        style={{ background: "#f93e3e", borderColor: "#f93e3e" }}
        className="p-button-rounded"
        label="DELETE"
        onClick={() => {
          setView("response");
        }}
      />
      <Button
        style={{ background: "#61affe", borderColor: "#61affe" }}
        className="p-button-rounded"
        label="GET"
        onClick={() => {
          setView("response");
        }}
      />
    </div>
  );
}

export default TableButtons;
