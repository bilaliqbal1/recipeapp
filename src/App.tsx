import "./App.css";
import Header from "./components/Header";
import MealList from "./components/MealList";
import "./index.css";

function App() {
  return (
    <div className="">
      <Header />
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
        <h1 className="text-2xl font-bold text-black lg:px-20 ">Week Orders</h1>
      </div>
      <div className="container mx-auto flex justify-between">
        <MealList />
      </div>
    </div>
  );
}

export default App;
