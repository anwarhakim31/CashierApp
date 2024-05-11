import React, { Component } from "react";

import { NavbarComp } from "./component";
import { Home, Sukses, NotFound } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: false, // Inisialisasi state side di sini
    };
  }

  // Fungsi untuk mengubah status side
  toggleSide = () => {
    this.setState((prevState) => ({
      side: !prevState.side,
    }));
  };

  render() {
    return (
      <Router>
        <NavbarComp toggleSide={this.toggleSide} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home toggleSide={this.toggleSide} side={this.state.side} />
              }
            />
            <Route path="/sukses" element={<Sukses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    );
  }
}
