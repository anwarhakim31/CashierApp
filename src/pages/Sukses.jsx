import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../../assets/images/Succes.svg";
import logo from "../../assets/images/Succes.svg";

export default class Sukses extends Component {
  render() {
    return (
      <div className="mt-4 text-center ">
        <h2>Sukses Pesan</h2>
        <h2>Terima Kasih Sudah Memesan</h2>
        <Image src={logo} width="200" className="d-block m-auto" />
        <Image src={logo} width="200" className="d-block m-auto" />
        <Button className="theme " as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
