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
import Advertise from "views/examples/advertise";
import SavedContacts from "views/examples/savedcontacts";
import Results from "views/examples/results";

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

  {
    path: "/advertise",
    name: "Advertize with us!",
    icon: "ni ni-tv-2 text-primary",
    component: <Advertise />,
    layout: "/admin",
  },

  {
    path: "/contactsdirectory",
    name: "Contacts Directory",
    icon: "ni ni-tv-2 text-primary",
    component: <SavedContacts />,
    layout: "/admin",
  },

  {
    path: "/results", 
    name: "Race Results",
    icon: "ni ni-tv-2 text-primary",
    component: <Results />,
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
