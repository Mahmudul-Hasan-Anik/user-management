import { Home,NewUser,Login,Registration } from "./pages/page";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Header from "./Components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     pauseOnHover
    />
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewUser/>} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
