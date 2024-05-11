import React, { Component } from "react";
import Image from "react-bootstrap/Image";
export default class NotFound extends Component {
  render() {
    return (
      <div className="text-center mt-4">
        <h1>Page Not Found</h1>

        <Image src="assets/images/notfound.svg" width="500" />
      </div>
    );
  }
}
