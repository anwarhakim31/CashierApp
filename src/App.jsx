import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Hasil, ListCategory, NavbarComp, Menus } from "./component";
import { API_URL } from "./utils/Constant";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      yangdipilih: "Makanan",
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
  }

  changeCategory = (value) => {
    this.setState({
      yangdipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, yangdipilih } = this.state;
    return (
      <>
        <NavbarComp />
        <div className="mt-4">
          <div className="container-fluid">
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                yangdipilih={yangdipilih}
              />
              <Col>
                <h2 className="text-center">
                  <strong>Menu Utama</strong>
                </h2>
                <hr />
                <Row className="g-4">
                  {menus &&
                    menus.map((menu) => {
                      return <Menus key={menu.id} menu={menu} />;
                    })}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </div>
        </div>
      </>
    );
  }
}
