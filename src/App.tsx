import "./App.css";
import { Button } from "../components/button";
import { useState } from "react";
import { Charts } from "../components/charts";
import { Header } from "../components/header";
import { Card } from "../components/card";
import { Table } from "../components/table";
import { useCampaignData } from "../hooks/useCampaignData";

function App() {
  const [selected, setSelected] = useState("Hourly");
  const buttonsOptions = ["Hourly", "Daily", "Weekly", "Monthly"];

  const { data, loading, error } = useCampaignData();

  return (
    <div className="bg-gray-200 h-full w-full text-bold flex flex-col justify-center items-center gap-8 py-5">
      <div className="rounded-xl bg-white w-[80%] flex p-6 justify-center md:justify-between items-center gap-3 md:gap-0 flex-col md:flex-row">
        <div className="font-semibold text-sky-600 text-2xl flex text-center">
          Analytics Dashboard
        </div>
        <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
          {buttonsOptions.map((name, key) => (
            <Button
              key={key}
              text={name}
              isSelected={selected === name}
              onClick={() => setSelected(name)}
            />
          ))}
        </div>
      </div>
      <Card>
        <Header text="Timeline Chart" />
        <div className="flex justify-center">
          <Charts
            data={data}
            loading={loading}
            error={error}
            period={selected}
          />
        </div>
      </Card>
      <Card>
        <Header text="Data Table" />
        <div className="flex justify-center">
          <Table period={selected} data={data} />
        </div>
      </Card>
    </div>
  );
}

export default App;
