import create from "zustand";

interface StateType {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

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
  return <button onClick={increasePopulation}>one up</button>;
}

export default function ZustandGetStarted() {
  return (
    <div className="container">
      <h1>Zustand Get Started</h1>
      <BearCounter />
      <BearControls />
    </div>
  );
}
