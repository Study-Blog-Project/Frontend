import { Routes, Route } from "react-router-dom";
import  LoginPage from "./pages/login/LoginPage";
import SignInPage from "./pages/signIn/SignInPage";
function App() {


  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/signIn" element={<SignInPage />}></Route>
    </Routes>
  );
}

export default App
