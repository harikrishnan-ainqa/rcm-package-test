/**
 * @author Kumaravel Pazhani
 * @email kumaravel.pazhani@ainqa.com
 * @desc login componenet
 */

import React from "react";

import { store as ReduxStore } from "./redux";
import { Provider } from "react-redux";
import SignIn from "./SignIn"



function Login(props) {
    return (
        <Provider store={ReduxStore}>
            <SignIn {...props} />
        </Provider>
    );
}

export default Login;
