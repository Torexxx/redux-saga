import { useSelector } from "react-redux";

function App() {

  const store = useSelector(store => store);
  console.log(store)

  return (
    <div>
      Redux saga
    </div>
  );
}

export default App;
