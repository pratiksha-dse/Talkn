import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import AuthProvider from './Context/AuthContext';

Modal.setAppElement("#root");

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));
