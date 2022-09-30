import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import "../App.css";
const Product = (props) => (
  <tr>
    <td>{props.product.ProductID}</td>
    <td>{props.product.Name}</td>
    <td>{props.product.ManufacturerID}</td>
    <td>{props.product.Date.ManufactureDate.substring(0, 10)}</td>
    <td>{props.product.Status}</td>
    <td>{props.product.Price}</td>
    <td>
    <div className="form-group createProduct" ><input type="submit" className="btn btn-danger bg-danger" value="send product" onClick={()=>{this.setState({show:true})}}></input></div>
    </td>
  </tr>
);

export class ProductsList extends Component {
  constructor(props) {
    super(props);


  

    this.state = {
      role: sessionStorage.getItem("role"),
      products: [], 
      show:false
    };
  }

  handleClose(){
    this.setState({show:false})
  }

  componentDidMount() {
    const headers = {
      "x-access-token": sessionStorage.getItem("jwtToken"),
    };

    axios
      .get("http://54.69.197.240:8090/product/manufacturer", {
        headers: headers,
      })
      .then((response) => {
        console.log("response.data --->", response.data.data);
        if (sessionStorage.getItem("usertype") === "manufacturer") {
          const products = response.data.data.filter(
            (product) =>
              product.Record.ManufacturerID === sessionStorage.getItem("userid")
          );
          console.log("products", products);
          this.setState({
            products: products,
          });
        } else if (sessionStorage.getItem("usertype") === "wholesaler") {
          const products = response.data.data.filter(
            (product) =>
              product.Record.WholesalerID === sessionStorage.getItem("userid")
          );
          console.log("products", products);
          this.setState({
            products: products,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  productsList() {
    return this.state.products.map((currentProduct) => {
      return (
        <Product
          product={currentProduct.Record}
          deleteProduct={this.deleteProduct}
          key={currentProduct.Key}
        />
      );
    });
  }

  render() {
    return (
      <>


      <div className="container">
        <div className="prodlist">Products List</div>
        <Link to="/createProduct">
        <div className="form-group createProduct" ><input type="submit" className="btn btn-primary" value="Create Product"></input></div>
        </Link>
        <table className="table table-responsive  table-hover">
          <thead className="thead-light">
            <tr>
              <th>ProductId</th>
              <th>ProductName</th>
              <th>ManufacturerId</th>
              <th>ManufacturerDate</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.productsList()}</tbody>
        </table>
      </div>
      </>
    );
  }
}

export default ProductsList;
