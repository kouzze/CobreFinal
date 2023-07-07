import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface CopperData {
  date: string;
  value: number;
}

const CobreComponent = () => {
  const [initialValue, setInitialValue] = useState<number>(5.625);
  const [projectionData, setProjectionData] = useState<CopperData[]>([]);

  const calculateProjection = () => {
    const currentData: CopperData = { date: "Actual", value: initialValue };
    const projectedData: CopperData[] = [currentData];

    for (let i = 1; i <= 10; i++) {
      const currentDate = new Date();
      const projectedDate = new Date(currentDate.getFullYear() + i, currentDate.getMonth(), currentDate.getDate());
      const newDate = projectedDate.toISOString().split("T")[0];
      const projectedValue = (currentData.value * (1 + 0.01709) ** i).toFixed(2);
      const projectedItem: CopperData = { date: newDate, value: Number(projectedValue) };
      projectedData.push(projectedItem);
    }

    setProjectionData(projectedData);
  };

  return (
    <div>
      <h2>Gráfico de Extracción de Cobre</h2>
      <div>
        <label>Valor Inicial (Millones de toneladas):</label>
        <input type="number" value={initialValue} onChange={(event) => setInitialValue(Number(event.target.value))} />
      </div>
      <button onClick={calculateProjection}>Calcular Proyección</button>
      <h1>Resultado de cálculos:</h1>
      {projectionData.length > 0 ? (
        <div>
          <h3>Extracción proyectada en 10 años:</h3>
          <div style={{ width: "100%", height: 300 }}>
            <LineChart width={500} height={300} data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
          <h3>Valores proyectados cada 5 años:</h3>
          <ul>
            {projectionData.filter((_data, index) => (index + 1) % 5 === 0).map((data, index) => (
              <li key={index}>
                Año {new Date().getFullYear() + (index + 1) * 5}: {data.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CobreComponent;