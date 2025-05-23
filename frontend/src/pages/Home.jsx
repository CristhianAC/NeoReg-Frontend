import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Table from "../components/Table";

function Home() {
  const toast = useRef(null);
  const { state } = useLocation();
  const shown = useRef(false);

  useEffect(() => {
    if (state?.toast && !shown.current) {
      toast.current.show(state.toast);
      shown.current = true;
    }
  }, [state]);

  return (
    <>
      <Toast ref={toast} />
      <div>
      <h1>Home</h1>
      <Table />
    </div>
    </>
  );
}
export default Home;