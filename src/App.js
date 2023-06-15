import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFound";
import Notification from "./components/Notification";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
