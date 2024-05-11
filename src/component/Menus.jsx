import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import numberFormat from "../utils/Number";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col xs={12} md={6} lg={4}>
      <Card
        className="shadow"
        style={{ cursor: "pointer" }}
        onClick={() => masukKeranjang(menu)}
      >
        <Card.Img
          variant="top"
          src={
            "../../assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            <strong> {menu.nama}</strong>
          </Card.Title>
          <Card.Subtitle>{menu.category.nama}</Card.Subtitle>
          <Card.Text className="mt-4 fw-medium">
            {numberFormat(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
