import { observer } from "mobx-react-lite";
import useStore from "./hooks/useStore";

function App() {
  const { users, boards } = useStore();

  console.log(users.toJSON());

  console.log(boards.toJSON());

  return (
    <div>
      <p>Start</p>
    </div>
  );
}

export default observer(App);
