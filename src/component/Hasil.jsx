import React, { Component, props } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKerangjang";
import axios from "axios";
import numberFormat from "../utils/Number";
import { API_URL } from "../utils/Constant";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showmodal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menukeranjang) => {
    this.setState({
      showmodal: true,
      keranjangDetail: menukeranjang,
      jumlah: menukeranjang.jumlah,
      keterangan: menukeranjang.keterangan,
      totalHarga: menukeranjang.total_harga,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  handleClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getkeranjang();
        Swal.fire({
          // Corrected function name to Swal.fire
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan" + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getkeranjang();
        Swal.fire({
          // Corrected function name to Swal.fire
          title: "Hapus Pesanan!",
          text:
            "Sukses Hapus Pesanan" + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { sidebar, toggleSide, keranjangs } = this.props;

    return (
      <>
        <Col md={3} className={sidebar ? "sidebar open" : "sidebar"}>
          <h4 className="pt-1 burger text-end" style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faClose} onClick={() => toggleSide()} />
          </h4>

          <h4 className="pt-3 pt-md-0">
            <strong>Keranjang</strong>
          </h4>
          <hr />

          {keranjangs.length !== 0 && (
            <Card className="overflow-auto hasil">
              <ListGroup style={{ cursor: "pointer" }}>
                {keranjangs.map((menu) => {
                  return (
                    <ListGroup.Item
                      key={menu.id}
                      className="p-1"
                      onClick={() => this.handleShow(menu)}
                    >
                      <div>
                        <h5>
                          <strong>{menu.product.nama}</strong>
                        </h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div>
                          <p>{numberFormat(menu.product.harga)}</p>
                        </div>

                        <div>
                          <p className="d-flex align-items-center gap-1">
                            <Badge pill className="bg-danger">
                              {menu.jumlah}
                            </Badge>
                          </p>
                        </div>

                        <div>
                          <strong>
                            <p>{numberFormat(menu.total_harga)}</p>
                          </strong>
                        </div>
                      </div>
                    </ListGroup.Item>
                  );
                })}

                <ModalKeranjang
                  handleClose={this.handleClose}
                  {...this.state}
                  tambah={this.tambah}
                  kurang={this.kurang}
                  handleSubmit={this.handleSubmit}
                  changeHandler={this.changeHandler}
                  hapusPesanan={this.hapusPesanan}
                />
              </ListGroup>
            </Card>
          )}
          <TotalBayar keranjang={keranjangs} />
        </Col>
      </>
    );
  }
}
