import "./App.css";
import Layout from "../src/pages/Layout";
import "monday-ui-react-core/tokens";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import TestToast from "./pages/test-toast";

function App() {
  return (
    <div className="App">
      {/*Layout has all the components */}
      <Layout />
      {/* <TestToast /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
