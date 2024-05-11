import React, { Component, useRef } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCheese,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} />;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;

  return;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, yangdipilih } = this.props;

    return (
      <Col md={2} className="">
        <h4>
          <strong className="fs-md-5">List Kategori</strong>
          <hr />
        </h4>

        <ListGroup className="">
          {categories.map((categorie) => {
            const cate = (
              <ListGroup.Item
                key={categorie.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeCategory(categorie.nama);
                }}
                className={yangdipilih === categorie.nama && "actived"}
              >
                <Icon nama={categorie.nama} /> {categorie.nama}
              </ListGroup.Item>
            );

            return cate;
          })}
        </ListGroup>
      </Col>
    );
  }
}
