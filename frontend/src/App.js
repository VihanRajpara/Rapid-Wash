import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './pages/User'
import Washerman from "./pages/Washerman";
import Start from "./pages/Start";
import Cdashbord from "./pages/Cdashbord";
import Wdashbord from "./pages/Wdashbord";
import Uaorder from "./pages/Uaorder";
import OrderDetail from "./pages/OrderDetail";
import Dashboardadmin from "./pages/Dashboardadmin";
import Waorder from "./pages/Waorder";
import Wporder from "./pages/Wporder";
import Wdorder from "./pages/Wdorder";
import Udorder from "./pages/Udorder";
import Uporder from "./pages/Uporder";
import Pagenot from "./pages/Pagenot";

// import Dashboardadmin from "./pages/Dashboardadmin";
function App() {
  return (
    <>
      {/* <Router> */}
        <div>
         
          <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/" element={<Start />} />
          <Route path="/washerman" element={<Washerman />} />
          <Route path="/user/dashboard" element={<Cdashbord />} />
          <Route path="/washerman/dashboard" element={<Wdashbord />} />
          <Route path="/user/order/book" element={<OrderDetail />} />
          <Route path="/admin" element={<Dashboardadmin />} />
          <Route path="/washerman/order/approve" element={<Waorder />} />
          <Route path="/washerman/order/pending" element={<Wporder />} />
          <Route path="/washerman/order/done" element={<Wdorder />} />
          <Route path="/user/order/approve" element={<Uaorder />} />
          <Route path="/user/order/done" element={<Udorder />} />
          <Route path="/user/order/pending" element={<Uporder />} />
          <Route path="/*" element={<Pagenot />} />
          </Routes>
        </div>
      {/* </Router> */}
    </>
  );
}

export default App;
