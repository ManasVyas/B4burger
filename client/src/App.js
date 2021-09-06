import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ItemListView from "./components/item/ItemListView";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import NavBar1 from "./components/navbar/NavBar1";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import AddItem from "./components/admin/AddItem";
import UpdateItem from "./components/admin/UpdateItem";
import AddUser from "./components/admin/AddUser";
import UpdateUser from "./components/admin/UpdateUser";
import CartView from "./components/cart/CartView";
import KitchenView from "./components/kitchen/KitchenView";
import AdminRoute from "./protectedRoutes/AdminRoute";
import StaffRoute from "./protectedRoutes/StaffRoute";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar1 />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/items" component={ItemListView} />
            <StaffRoute exact path="/kitchen" component={KitchenView} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <AdminRoute exact path="/admin" component={Admin} />
            <AdminRoute exact path="/admin/addItem" component={AddItem} />
            <AdminRoute exact path="/admin/updateItem" component={UpdateItem} />
            <AdminRoute exact path="/admin/addUser" component={AddUser} />
            <AdminRoute exact path="/admin/updateUser" component={UpdateUser} />
            <ProtectedRoute exact path="/cart" component={CartView} />
            <Route
              path="*"
              component={() => (
                <h3 style={{ textAlign: "center" }}>404 NOT FOUND</h3>
              )}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
