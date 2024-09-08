import "./App.css";
import Navbar from "./components/shared/navbar/navbar";
import Dashboard from "./components/pages/dashboard/dashboard";

function App() {
  return (
    <div className="App h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow justify-center flex overflow-hidden">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
