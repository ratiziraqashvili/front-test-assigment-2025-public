import "./App.css";
import Button from "../components/button";

function App() {
  return (
    <div className="bg-gray-200 h-screen w-full text-bold flex flex-col justify-center items-center gap-8">
      <div className="rounded-xl bg-white w-[80%] flex p-6 justify-between">
        <div className="font-semibold text-sky-600 text-2xl">
          Analytics Dashboard
        </div>
        <div>
          <Button text="Hourly" isSelected={false} />
        </div>
      </div>
      <div className="bg-white w-[80%]">2</div>
      <div className="bg-white w-[80%]">3</div>
    </div>
  );
}

export default App;
