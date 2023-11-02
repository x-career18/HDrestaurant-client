import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Restaurants from "./pages/restaurants/Restaurants";
import Menu from "./pages/menu/Menu";
import Book from "./pages/book/Book";
import Message from "./pages/message/Message";
import { FormProvider } from "./context/bookingContext/FormContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/book" element={<Book />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
