import React from 'react'


function Order({order, onDelete, customerPhoneNumber}) {

  

  // show time and date
  const formattedDate = new Date(order.created_at).toLocaleDateString("en-US")
  const formattedTime = new Date(order.created_at).toLocaleTimeString("en-US")


  // const handleConfirmOrder = () => {
  //   // send a message to the customer's phone number
  //   sendMessage(customerPhoneNumber);
  // };

  // const sendMessage = (phoneNumber) => {
  //   console.log(`Sending message to ${phoneNumber}`);

  //   twilioClient.messages.create({
  //     body: 'Your order has been confirmed.',
  //     from: '+16362541448',
  //     to: phoneNumber
  //   }).then(message => console.log(message.sid))
  //   .catch(err => console.error(err));
  // };


  return (
    <>
    <tr>
        <td scope='row'>{order.id}</td>
        <td className='item-name'>{order.itemName}</td>
        <td className='item-amount'>{order.itemAmount}</td>
        <td className='order-date'>{formattedDate} <span className='order-time'>{formattedTime}</span></td>
        <td className='created-by'>user{order.created_by}</td>

        <td> {customerPhoneNumber}
        </td>
        <td>
          <button className='table-button'>
            Confirm Order
          </button>

        </td>
        <td>
        <button className='table-button' id="delete-btn" onClick={() => onDelete(order.id)}>
            Delete Client
        </button>
        </td>
    </tr>
    
    </>
  )
}

export default Order