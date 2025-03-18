import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./components";
import { UserContextProvider } from "./middleware/UserContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Borrowed from "./components/Borrowed";
import BookManage from "./pages/BookManage";

function App() {
  const cookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const token = cookie("token");
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          textTransform: "uppercase",
          fontSize: "15px",
          fontWeight: "600",
        }}
      />
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                ) : (
                  <Login />
                )
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrowed"
              element={
                <ProtectedRoute>
                  <Borrowed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute>
                  <BookManage />
                </ProtectedRoute>
              }
            />{" "}
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
