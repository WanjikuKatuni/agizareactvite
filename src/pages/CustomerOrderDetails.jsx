import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Order from "../components/Order";
import "../styles/Customerorder.css"

function CustomerOrderDetails() {
  const [orders, setOrders] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [customer, setCustomer] = useState({});

  const { customerId } = useParams();
  // console.log(customerId)

  // navigate back to homepage
  const navigate = useNavigate()

  const clientList = () => {
    navigate(`/`)
  }

  // get all ordersof the customer as soon as the page loads/mounts
  useEffect(() => {
    if(customerId) {
      getCustomer()
      getOrders();
    }
  }, [customerId]);


  // get customer details
  const getCustomer = () => {
    api.get(`/api/customers/details/${customerId}/`).then((res) => {
      setCustomer(res.data);
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
  };

  // get all orders for the client
  const getOrders = () => {
    api
      .get(`/api/customers/details/${customerId}/orders/`)
      .then((res) => res.data)
      .then((data) => {
        setOrders(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err)
        console.error(err)
      });
  };

  // delete order
  const deleteOrder = (orderId) => {
    api
      .delete(`/api/orders/details/${orderId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Order deleted");
          getOrders();
        } else alert("Failed to delete order");
      })
      .catch((error) => alert(error));
  };

  // create an order
  const createOrder = (e) => {
    e.preventDefault();

    // console.log(customerId)
    // console.log(itemName)
    // console.log(itemAmount)
    // console.log(customer)

    api
      .post(`/api/customers/details/${customerId}/orders/`, {
        itemName,
        itemAmount,
        customer: customerId,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Order added");
          getOrders();
        } else alert("Failed to add order");
      })
      .catch((err) => alert(err));
  };

  return (
    <>
    <div className="container-fluid overflow-hidden wrapper">
      <div className="row gx-5">
        {/* form */}
        <div className="col-md-3">
          <h2>Add Order</h2>
            <form onSubmit={createOrder} className='form-container'>
              <label htmlFor="itemName">Item Name:</label>
              <input
                className="form-input"
                type="text"
                id="itemName"
                name="itemName"
                required
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
              />
              <br />

              <label htmlFor="itemAmount">Item Amount:</label>
              <input
                className="form-input"
                type="number"
                id="itemAmount"
                name="itemAmount"
                required
                onChange={(e) => setItemAmount(e.target.value)}
                value={itemAmount}
              />

              <br />
              <input className="form-button" type="submit" value="Submit"></input>
            </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-8">
          {/* list of client orders */}
         
          
          <h1 className="header">Client Orders  <span className="customer-name">{customer.customerName}</span></h1>
          <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ItemName</th>
              <th scope="col">ItemAmount</th>
              <th scope="col">Date/Time</th>
              <th scope="col">Created_by</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Order order={order} onDelete={deleteOrder} customerPhoneNumber={customer.phonenumber} key={order.id} />
            ))}
          </tbody>
        </table>
        {/* <button className='confirm order-button'>
            Confirm Order
          </button> */}
        <button
         className="back-button" onClick={clientList}>
            Back | Client List
    </button>
        </div>

      </div>

      

      {/* list of orders */}
      <div>

      </div>
      </div>
    </>
  );
}

export default CustomerOrderDetails;
