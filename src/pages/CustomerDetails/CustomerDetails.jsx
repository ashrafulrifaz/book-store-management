import { Link, useParams } from "react-router-dom";
import usePreOrders from "../../Hooks/userPreOrders";
import editIcon from "../../assets/icons/edit.png";
import { useEffect, useState } from "react";
import TableRow from "./TableRow";

const CustomerDetails = () => {
    const {customerName} = useParams()
    const [allPreOrders] = usePreOrders()    
    const currentCustomer = allPreOrders?.filter(customer => customer?.customerName === customerName)
    console.log(currentCustomer?.orderedBooks);
    
    

    return (
        <div className="container !p-6 customer_details">
            <div className="flex items-center justify-between">
                <h2 className="mb-1">{customerName}{"'"}<span className="lowercase">s</span> order info</h2>      
                <div className='flex items-center gap-3'>
                    <Link to="#" className="action_btn">
                        <img src={editIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                    </Link>
                </div>
            </div>      
            <div className="grid grid-cols-2 gap-5">
                <div className="flex items-end gap-4">
                    <h6 className="mt-0">Name</h6>
                    <p className="capitalize">{customerName}</p>
                </div>
                <div className="flex items-end gap-4">
                    <h6 className="mt-0">Phone</h6>
                    <p className="capitalize">{currentCustomer[0]?.customerNumber}</p>
                </div>
            </div>            
            <h6 className="mt-2 text-lg">Book List</h6>
            <table>
                <thead className="text-left">
                    <tr>
                        <th>No</th>
                        <th>Book Name</th>
                        <th>Edition</th>
                        <th>Condition</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentCustomer[0]?.orderedBooks?.map((books, idx) => (
                            <TableRow key={idx} books={books} idx={idx} />
                        ))
                    }                    
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDetails;