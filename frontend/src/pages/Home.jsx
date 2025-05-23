import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Table from "../components/Table";

function Home() {
  const toast = useRef(null);
  const { state, pathname } = useLocation();
  const shown = useRef(false);

  useEffect(() => {
    if (state?.toast && !shown.current) {
      toast.current.show(state.toast);
      shown.current = true;
      window.history.replaceState({}, document.title, window.location.pathname);
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