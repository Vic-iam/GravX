import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./routes/Home";
import Calculator from "./routes/Calculator";
import Nutrition from "./routes/Nutrition";
import Workouts from "./routes/Workouts";
import Dashboard from "./routes/Dashboard";
import Login from "./utils/Login";
import Register from "./utils/Register";
import Footer from "./components/layout/footer/Footer";
import Error from "./components/ui/Error/Error";
import ItemNutritionDetailtsContainer from "./components/nutrition/ContainerDetailNutrition/ContainerDetailNutrition";
import CategoryNutritionContainer from "./components/nutrition/NutritionCategory/NutritionCategory";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Nutrition" element={<Nutrition />} />
        <Route path="/Workouts" element={<Workouts />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Item/:id" element={<ItemNutritionDetailtsContainer />} />
        <Route
          path="/categoria/:type"
          element={<CategoryNutritionContainer />}
        />
        <Route path="/categoria/:td" element={<CategoryNutritionContainer />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
