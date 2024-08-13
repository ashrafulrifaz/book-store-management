import newIcon from '../../assets/icons/add-document.png'
import deleteIcon from '../../assets/icons/trash.png'
import { Link } from 'react-router-dom';
import useOrderedBook from '../../Hooks/useOrderedBook';
import PreOrderTable from './PreOrderTable';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const PreOrders = () => {
    const [combinedBooks, refetch] = useOrderedBook()

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
                axios.delete(`https://nstuonlinebookshop-server.vercel.app/pre-orders`)
                .then((response) => {
                    if(response?.data?.deletedCount){            
                        toast.success('Book Deleted Successfully')
                        handleSuccess()
                        refetch()
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
        <div className="container mt-3 md:mt-5 p-4 md:!p-6 pre_order">
            <div className="flex items-start justify-between">
                <h2 className='mb-5'>Pre-Orders</h2>
                <div className="flex items-center gap-4">
                    <div className={`action_btn delete_btn ${combinedBooks?.length > 0 ? 'block' : 'hidden'}`} onClick={handleDelete}>
                        <img src={deleteIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </div>
                    <Link to="/add-preorder" className="action_btn">
                        <img src={newIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </Link>
                </div>
            </div>
            {
                combinedBooks?.length > 0 ?
                <div className="table_container">
                    <table className="responsive-table w-full">
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
                                combinedBooks.map((book, idx) => (
                                <PreOrderTable key={idx} idx={idx} book={book} />
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div className='font-primary font-semibold text-xl md:text-2xl text-center py-10'>No Pre Order Available</div>
            }
        </div>
    );
};

export default PreOrders;