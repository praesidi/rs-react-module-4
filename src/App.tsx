import "./App.css";
import { useToggle } from "./hooks/useToggle";

function App() {
  const [value, toggle] = useToggle(["blue", "orange", "cyan", "teal"]);

  return <button onClick={() => toggle()}>{value}</button>;
}

export default App;
