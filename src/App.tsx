import "./App.css";
import { useToggle } from "./hooks/useToggleReduce";

function App() {
  const [value, toggle] = useToggle(["blue", "orange", "cyan", "teal", "red"]);

  return <button onClick={() => toggle()}>{value}</button>;
}

export default App;
