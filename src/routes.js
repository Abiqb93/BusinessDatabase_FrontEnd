import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import SearchResults from "views/examples/searchresults.js";
import ContactDetails from "views/examples/contactdetails.js";
import RequestUpdate from "views/examples/requestupdate.js";
import HorsesProfile from "views/examples/horseprofile.js";
import TrainerProfile from "views/examples/trainerprofile.js";
import OwnerProfile from "views/examples/ownerprofile.js";
import JockeyProfile from "views/examples/jockeyprofile.js";
import DamRadar from "views/examples/damradar.js";
import OwnerRadar from "views/examples/ownerradar.js";
import TrainerRadar from "views/examples/trainerradar.js";
import JockeyRadar from "views/examples/jockeyradar.js";
import HorseRadar from "views/examples/horseradar.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/searchresults",
    name: "Search Results",
    icon: "ni ni-tv-2 text-primary",
    component: <SearchResults />,
    layout: "/admin",
  },

  {
    path: "/contactdetails",
    name: "Contact Details",
    icon: "ni ni-tv-2 text-primary",
    component: <ContactDetails />,
    layout: "/admin",
  },

  {
    path: "/requestupdate",
    name: "Request Update",
    icon: "ni ni-tv-2 text-primary",
    component: <RequestUpdate />,
    layout: "/admin",
  },


  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },


  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];

export default routes;
