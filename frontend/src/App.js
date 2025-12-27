import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddEquipment from "./components/AddEquipment";
import EquipmentList from "./components/EquipmentList";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/equipment-list" element={<EquipmentList />} />
        <Route path="/add-equipment" element={<AddEquipment />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
