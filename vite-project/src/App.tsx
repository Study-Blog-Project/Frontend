import { Routes, Route } from "react-router-dom";
import  LoginPage from "./pages/login/LoginPage";
import SignInPage from "./pages/signIn/SignInPage";
import MainPage from "./pages/main/MainPage";
import WritePage from "./pages/post/WritePage";
import TestPage from "./pages/TestPage";
import ReadPage from "./pages/post/ReadPage";
import MyPost from "./pages/myPage/MyPost";
import MyInfo from "./pages/myPage/MyInfo";
import { CookiesProvider } from "react-cookie";

function App() {


  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<TestPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signIn" element={<SignInPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/write" element={<WritePage />}></Route>
        <Route path="/read/:boardId" element={<ReadPage />} />
        <Route path="/myPost" element={<MyPost />}></Route>
        <Route path="/myInfo" element={<MyInfo />}></Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App
