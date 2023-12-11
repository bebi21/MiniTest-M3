import "./App.css";
import All from "./components/All";
import Pending from "./components/Pending";
import Todolist from "./components/Todolist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Todolist></Todolist>
      {/* <Routes>
        <Route path="/" element={<Todolist></Todolist>}>
          <Route path="/" element={<All></All>} />
          <Route path="/pending" element={<Pending></Pending>} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
