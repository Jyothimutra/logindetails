import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {Login} from "./components/login/Login";
import BarChart from "./components/BarChart/BarChart";
import "./App.scss"
export default function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/chart" element={<BarChart width={500} height={400} />}/>
        </Routes> 
      </div>
    </Router>
  );
}