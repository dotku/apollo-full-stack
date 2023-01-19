import { Helmet } from "react-helmet";
import create from "zustand";
import { StateType } from "./types";

const TITLE = "Zustand Get Started";

const useStore = create<StateType>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: StateType) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
  const bears = useStore((state: StateType) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function BearControls() {
  const increasePopulation = useStore(
    (state: StateType) => state.increasePopulation
  );
  const removeAllBears = useStore((state: StateType) => state.removeAllBears);
  return (
    <>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>Remove</button>
    </>
  );
}

export default function ZustandGetStarted() {
  return (
    <div className="container">
      <Helmet>{TITLE}</Helmet>
      <h1>{TITLE}</h1>
      <BearCounter />
      <BearControls />
    </div>
  );
}
