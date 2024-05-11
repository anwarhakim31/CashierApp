import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Hasil, ListCategory, NavbarComp, Menus } from "../component";
import { API_URL } from "../utils/Constant";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      yangdipilih: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.yangdipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.yangdipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState((prevState) => ({
      yangdipilih: value,
      menus: [],
    }));
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              Swal.fire({
                // Corrected function name to Swal.fire
                title: "Sukses!",
                text: keranjang.product.nama + " Masuk Keranjang ",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              Swal.fire({
                // Corrected function name to Swal.fire
                title: "Sukses!",
                text: keranjang.product.nama + " Masuk Keranjang ",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, yangdipilih, keranjang } = this.state;
    const { toggleSide, side } = this.props;

    return (
      <>
        <div className="mt-4">
          <div className="container-fluid">
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                yangdipilih={yangdipilih}
              />
              <Col>
                <h4 className="text-center">
                  <strong>Menu Utama</strong>
                </h4>
                <hr />
                <Row className="g-4">
                  {menus &&
                    menus.map((menu) => {
                      return (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          masukKeranjang={this.masukKeranjang}
                        />
                      );
                    })}
                </Row>
              </Col>
              <Hasil
                sidebar={side}
                toggleSide={toggleSide}
                keranjangs={keranjang}
              />
            </Row>
          </div>
        </div>
      </>
    );
  }
}
