import React from 'react'
import { useNavigate } from 'react-router-dom'

function Customer({customer, onDelete}) {
    // Format date and time
    const formattedDate = new Date(customer.created_at).toLocaleDateString("en-US")
    const formattedTime = new Date(customer.created_at).toLocaleTimeString("en-US")

    const navigate = useNavigate()

    // navigate to customerorderlist/details of each customer
    const checkOrder = () => {
        navigate(`/customers/details/${customer.id}`)
    }


  return (
    <>
        <tr>
        <th scope='row'>{customer.id}</th>
        <td className='customer-name'>{customer.customerName}</td>
        <td className='customer-code'>{customer.customerCode}</td>
        <td className='customer-phonenumber'>{customer.phonenumber}</td>
        <td className='customer-date'>{formattedDate} <span className='customer-time'>{formattedTime}</span></td>
        {/* <td className='createdby'>userID:{customer.created_by}</td> */}
    
        <td><button
         className='table-button' onClick={checkOrder}>
            Check Orders
            </button>
        </td>
        <td>

        <button className='table-button' id="delete-btn" onClick={() => onDelete(customer.id)}>
            Delete
        </button>
        </td>
        </tr>
    </>
  )
}

export default Customer