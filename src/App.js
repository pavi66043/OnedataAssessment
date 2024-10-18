import './App.css';
import Router from "./route/index";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
