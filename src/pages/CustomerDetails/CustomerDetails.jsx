import { Link, useNavigate, useParams } from "react-router-dom";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from '../../assets/icons/trash.png'
import TableRow from "./TableRow";
import usePreOrders from "../../Hooks/userPreOrders";
import confetti from "canvas-confetti";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";

const CustomerDetails = () => {
    const {customerName} = useParams()
    const [allPreOrders] = usePreOrders()    
    const currentCustomer = allPreOrders?.find(customer => customer?.customerName === customerName)   
    const navigate = useNavigate()     

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/pre-orders/${currentCustomer._id}`)
                .then((response) => {
                    if(response?.data?.deletedCount){            
                        toast.success('Book Deleted Successfully')
                        handleSuccess()
                        navigate('/customers')
                    }
                })
            }
          });    
    }

    const handleSuccess = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
     
        const frame = () => {
          if (Date.now() > end) return;
     
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });
     
          requestAnimationFrame(frame);
        };
     
        frame();
    };   

    return (
        <div className="container !p-6 customer_details">
            <div className="flex items-center justify-between">
                <h2 className="mb-1">{customerName}{"'"}<span className="lowercase">s</span> order info</h2>      
                <div className='flex items-center gap-4'>
                    <div className={`action_btn delete_btn`} onClick={handleDelete}>
                        <img src={deleteIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </div>
                    <Link to={`/edit-preorder/${currentCustomer?._id}`} className="action_btn edit_btn">
                        <img src={editIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </Link>
                </div>
            </div>      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5">
                <div className="flex items-end gap-4">
                    <h6 className="mt-0">Name:</h6>
                    <p className="capitalize">{customerName}</p>
                </div>
                <div className="flex items-end gap-4">
                    <h6 className="mt-0">Phone:</h6>
                    <p className="capitalize">{currentCustomer?.customerNumber}</p>
                </div>
                <div className="flex items-end gap-4">
                    <h6 className="mt-0">Address:</h6>
                    <p className="capitalize">{currentCustomer?.customerAddress}</p>
                </div>
            </div>            
            <h6 className="mt-2 text-lg">Book List</h6>
            <div className="table_container">
                <table>
                    <thead className="text-left">
                        <tr>
                            <th>No</th>
                            <th>Book Name</th>
                            <th>Edition</th>
                            <th>Condition</th>
                            <th>Quantity</th>
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
        </div>
    );
};

export default CustomerDetails;