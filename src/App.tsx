import "./App.css";
import Button from "../components/button";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState("Hourly");
  const buttonsOptions = ["Hourly", "Daily", "Weekly", "Monthly"];
  
  return (
    <div className="bg-gray-200 h-screen w-full text-bold flex flex-col justify-center items-center gap-8">
      <div className="rounded-xl bg-white w-[80%] flex p-6 justify-center md:justify-between items-center gap-3 md:gap-0 flex-col md:flex-row">
        <div className="font-semibold text-sky-600 text-2xl flex text-center">
          Analytics Dashboard
        </div>
        <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
          {buttonsOptions.map((name, key) => (
            <Button key={key} text={name} isSelected={selected === name} onClick={(() => setSelected(name))} />
          ))}
        </div>
      </div>
      <div className="bg-white w-[80%]">{selected}</div>
      <div className="bg-white w-[80%]">3</div>
    </div>
  );
}

export default App;
