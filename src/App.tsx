import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Workshops />} />
          <Route
            path="/workshop/details/:workshopId"
            element={<WorkshopDetails />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
