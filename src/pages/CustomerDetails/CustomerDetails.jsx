import { Link, useParams } from "react-router-dom";
import editIcon from "../../assets/icons/edit.png";
import TableRow from "./TableRow";
import usePreOrders from "../../Hooks/userPreOrders";

const CustomerDetails = () => {
    const {customerName} = useParams()
    const [allPreOrders] = usePreOrders()    
    const currentCustomer = allPreOrders?.find(customer => customer?.customerName === customerName)    

    return (
        <div className="container !p-6 customer_details">
            <div className="flex items-center justify-between">
                <h2 className="mb-1">{customerName}{"'"}<span className="lowercase">s</span> order info</h2>      
                <div className='flex items-center gap-3'>
                    <Link to={`/edit-preorder/${currentCustomer?._id}`} className="action_btn">
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
                    <p className="capitalize">{currentCustomer?.customerNumber}</p>
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
                        currentCustomer?.orderedBooks?.map((books, idx) => (
                            <TableRow key={idx} books={books} idx={idx} />
                        ))
                    }                    
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDetails;