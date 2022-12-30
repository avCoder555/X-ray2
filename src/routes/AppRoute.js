import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Authentication/Login';
import Error404 from '../pages/Errors/Error404';
import UserInfo from '../components/UserInfo';
import UserList from '../components/UserList';
// import Users from '../components/Users';
import PrivateRoutes from './PrivateRoutes';
import Logout from '../pages/Authentication/Logout';
import Doctor from '../pages/Doctor/Doctor';
import Center from '../pages/Center/Center';
import Operator from '../pages/Operator/Operator';
import Xray from '../pages/XrayType/XrayType';
import ManagePages from '../pages/ManagePages/ManagePages';
import Slider from '../pages/Slider/Slider';
import SocialMediaLinks from '../pages/SocialMediaLinks/SocialMediaLinks';
import Gallery from '../pages/Gallery/Gallery';
import ContactUs from '../pages/ContactUs/ContactUs';
import XrayMachine from '../pages/XrayMachine/XrayMachine';
import Home from '../testiGo/pages/Home';
import About from '../testiGo/pages/About';
const AppRoute = () => {
    return (
        <Router>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                  {/* <Route path='/' element={<Users/>} />
                  <Route path='/products' element={<Products/>} /> */}
                  <Route path='users' element={<UserList />} />
                  <Route path='userinfo' element={<UserInfo />} />
                  <Route path='doctor' element={<Doctor />} />
                  <Route path='center' element={<Center />} />
                  <Route path='operator' element={<Operator />} />
                  <Route path='xray' element={<Xray />} />
                  <Route path='xray-machine' element={<XrayMachine />} />
                  <Route path='manage-pages' element={<ManagePages />} />
                  <Route path='slider' element={<Slider />} />
                  <Route path='social-media-links' element={<SocialMediaLinks />} />
                  <Route path='gallery' element={<Gallery />} />
                  <Route path='contact-us' element={<ContactUs />} />
                  <Route path='logout' element={<Logout />} />
              </Route>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>
              <Route path='/home' element={<Home/>} />
                {/* <Route path='/about' element={<About />} /> */}
              <Route path='/about' element={<About />} />             
              <Route path="*" element={<Error404 />} />

            </Routes>
        </Router>
      );
    }
  export default AppRoute;
