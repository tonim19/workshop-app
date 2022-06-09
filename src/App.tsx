import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Workshops from "./pages/Workshops";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Workshops />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
