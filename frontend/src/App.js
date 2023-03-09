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
import EditOrder from "./pages/editOrder"
import UserProfile from "./pages/UserProfile";
import Usereditprofile from "./pages/Usereditprofile"
import Washprofile from "./pages/Washprofile";
import Washeditprofile from "./pages/Washeditprofile"
// import Chart from "./pages/chart";
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
          <Route path="/user/order/edit" element={<EditOrder />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/editprofile" element={<Usereditprofile />} />
          <Route path="/washerman/profile" element={<Washprofile />} />
          <Route path="/washerman/editprofile" element={<Washeditprofile />} />
          {/* <Route path="/w" element={<Chart />} /> */}
          </Routes>
        </div>
      {/* </Router> */}
    </>
  );
}

export default App;
