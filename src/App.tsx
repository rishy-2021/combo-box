import ComboBox from "./components/ComboBox";

function App() {
  return (
    <main className="flex flex-col items-center justify-start pt-20 min-h-screen bg-slate-800 space-y-10">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
      Combo Box Demo
      </h1>
      <ComboBox />
    </main>
  );
}

export default App;
