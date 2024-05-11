import React, { Component } from "react";
import numberFormat from "../utils/Number";
import { Button, Col } from "react-bootstrap";
import { API_URL } from "../utils/Constant";
import axios from "axios";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      keranjang: this.props.keranjang,
    };

    axios.post(API_URL + "pesanans", pesanan);
  };

  render() {
    const { keranjang } = this.props;

    const totalBayar = keranjang.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="position-fixed bottom-0 p-1">
        <h4>Total Bayar : {numberFormat(totalBayar)}</h4>

        <Button
          className="w-100 theme"
          onClick={() => this.submitTotalBayar(totalBayar)}
        >
          Bayar
        </Button>
      </div>
    );
  }
}
