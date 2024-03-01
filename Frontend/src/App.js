import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Layout from "../src/pages/Layout";
import "monday-ui-react-core/tokens";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      
        {/* <Routes>
          <Route exact="true" path="/" element={<Home />}></Route>
        </Routes> */}
        {/* <Home />
      </Layout> */}
      <Layout />
    </div>
  );
}

export default App;
