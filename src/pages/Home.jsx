import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Customer from "../components/Customer";
import "../styles/Home.css"

// component that renders customer management functionality.
// allows user to add, view and delete customers.

function Home() {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // handle nacigation
  const navigate = useNavigate()
  const logout = () => {
    navigate('/logout')
  } 

  // validations
  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(07|01)\d{8}$/;
    return re.test(phoneNumber);
  };

  //   get customers as soon as page loads
  useEffect(() => {
    getCustomers();
  }, []);

  // get all customers posted
  const getCustomers = () => {
    api
      .get("/api/customers/")
      .then((res) => res.data)
      .then((data) => {
        setCustomers(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  //   delete customer
  const deleteCustomer = (customerId) => {
    api
      .delete(`/api/customers/details/${customerId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Customer deleted!");
          getCustomers();
        } else alert("Failed to delete customer");
      })
      .catch((error) => alert(error));
  };

  //   create customer
  const createCustomer = (e) => {
    e.preventDefault();


    if (!validatePhoneNumber(phonenumber)) {
      setError("Invalid phone number: Phone number must begin with '07' or '01'");
      return;
    }

    // apicall
    api
      .post("/api/customers/", { customerName, customerCode, phonenumber })
      .then((res) => {
        if (res.status === 201) {
          alert("Customer created!");
          getCustomers();
        } else alert("Failed to create customer");
      })
      .catch((err) => alert(err));
  };

  

  return (
    <>
      <div className="container-fluid overflow-hidden wrapper">
        <div className="row gx-5">
          {/* form */}
          <div className="col-md-3">
          <h2>Add Client</h2>
          <form onSubmit={createCustomer} className='form-container'>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          className="form-input"
          type="text"
          id="customerName"
          name="customerName"
          required
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
        />
        <br/>

        <label htmlFor="customerCode">Customer Code:</label>
        <input
          className="form-input"
          type="text"
          id="customerCode"
          name="customerCode"
          required
          onChange={(e) => setCustomerCode(e.target.value)}
          value={customerCode}
        />

        <br />
        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          className="form-input"
          type="text"
          id="phonenumber"
          name="phonenumber"
          required
          pattern="^(07|01)\d{8}$"
          placeholder="'07****' or '01****'"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phonenumber}
        />
        {error && <p className="error-message">{error}</p>}

        <br />
        <input className="form-button" type="submit" value="Submit"></input>
      </form>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-8">
        
        {/* list of customers */}
      <h1 className="header">Our Clients</h1>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">CustomerName</th>
              <th scope="col">CustomerCode</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">Date</th>
              {/* <th scope="col">Created_by</th> */}
              <th scope="col"></th>
              <th scope="col"></th>


            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <Customer
                customer={customer}
                onDelete={deleteCustomer}
                key={customer.id}
              />
            ))}
          </tbody>
        </table>
        <button
         className="back-button" onClick={logout}>
            Logout
    </button>
          </div>
        </div>
      </div>



    </>
  );
}

export default Home;
