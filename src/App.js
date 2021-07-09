import { useDispatch, useSelector } from "react-redux";

function App() {

  const store = useSelector(state => state);
  const people = useSelector(state => state.people);
  const dispatch = useDispatch();

  return (
    <div>
      Redux saga
      <button onClick = {() => dispatch({type: 'LOAD_DATA', payload: people}) }>Click</button>
    </div>
  );
}

export default App;
