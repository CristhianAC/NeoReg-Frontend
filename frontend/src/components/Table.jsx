import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { getWorkers } from "../api/workersApi";
import { deleteUser } from "../api/usersApi";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function Table() {
  const [workers, setWorkers] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const toast = useRef(null);
  useEffect(() => {
    async function loadWorkers() {
      const res = await getWorkers();
      console.log("res", res);
      setWorkers(res);
    }
    loadWorkers();
  }, [refreshTrigger]);

  const accept = async (id) => {
    try {
      await deleteUser(id);
      setRefreshTrigger((prev) => prev + 1);
      toast.current.show({
        severity: "info",
        summary: "Confirmed",
        detail: `You have deleted the user #${id}`,
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete user",
        life: 3000,
      });
    }
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected deletion",
      life: 3000,
    });
  };
  const confirm1 = (id) => {
    confirmDialog({
      message: `Are you sure you want to delete this user #${id}?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: reject,
      rejectClassName: "p-button-danger",
      acceptClassName: "p-button-text",
      accept: () => accept(id),
      reject,
    });
  };

  const columns = workers.length > 0 ? Object.keys(workers[0]) : [];
  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable value={workers} tableStyle={{ minWidth: "50rem" }}>
        {columns.map((col) => (
          <Column
            key={col}
            field={col}
            header={col
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          />
        ))}
        <Column
          header="Actions"
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text"
                onClick={() => console.log("Editar")}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={() => confirm1(rowData.id)}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
}

export default Table;
