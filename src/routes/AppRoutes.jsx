import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Emergencies from "../pages/Emergencies";
import Events from "../pages/Events";
import Businesses from "../pages/Businesses";
import BusinessDetails from "../pages/BusinessDetails";
import Notifications from "../pages/Notification";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Map from "../pages/Map";
import Users from "../pages/Users";

import ProtectedRoute from "../components/layout/ProtectedRoute";

// Lost & Found Pages
import LostFoundPage from "../pages/LostFound/LostFoundPage";
import LostFoundDetails from "../pages/LostFound/LostFoundDetails";
import CreateLostFound from "../pages/LostFound/CreateLostFound";
import EditLostFound from "../pages/LostFound/EditLostFound";
import BookmarkedLostFound from "../pages/LostFound/BookmarkedLostFound";
import MyLostFound from "../pages/LostFound/MyLostFound";



import BusinessOwnerRoute from "../components/layout/BusinessOwnerRoute";
import BusinessDashboard from "../pages/dashboard/BusinessDashboard";


import EmergencyDetails from "../pages/EmergencyDetails";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      /> */}

      <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>

<Route
  path="/chat/:conversationId"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>


     










      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergencies"
        element={
          <ProtectedRoute>
            <Emergencies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/businesses"
        element={
          <ProtectedRoute>
            <Businesses />
          </ProtectedRoute>
        }
      />

      <Route
    path="/business/dashboard"
    element={
        <ProtectedRoute>
            <BusinessOwnerRoute>
                <BusinessDashboard />
            </BusinessOwnerRoute>
        </ProtectedRoute>
    }
/>

      <Route
        path="/business/:id"
        element={
          <ProtectedRoute>
            <BusinessDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>
        }
      />

      {/* Lost & Found Routes */}

      <Route
        path="/lost-found"
        element={
          <ProtectedRoute>
            <LostFoundPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-found/create"
        element={
          <ProtectedRoute>
            <CreateLostFound />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-found/:id"
        element={
          <ProtectedRoute>
            <LostFoundDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-found/edit/:id"
        element={
          <ProtectedRoute>
            <EditLostFound />
          </ProtectedRoute>
        }
      />

      <Route
      path="/lost-found/my-items"
      element={
        <ProtectedRoute>
            <MyLostFound/>
        </ProtectedRoute>
      }
      />

      <Route
        path="/lost-found/bookmarks"
        element={
          <ProtectedRoute>
            <BookmarkedLostFound />
          </ProtectedRoute>
        }
      />






      <Route
    path="/emergency/:id"
    element={<EmergencyDetails />}
/>

    </Routes>







  );
}

export default AppRoutes;