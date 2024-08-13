import { useState } from "react";
import crossIcon from '../../assets/icons/cross-small.png'
import trashIcon from '../../assets/icons/trash.png'
import editIcon from '../../assets/icons/edit.png'
import axios from "axios";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import BookTable from "./BookTable";

const BookCard = ({book, refetch}) => {
    const {_id, name, price, description, stock} = book
    const [openModal, setOpenModal] = useState(false)
    const totalStock = stock?.reduce((total, item) => total + item.inStock, 0);    

    const DeleteBook = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://nstuonlinebookshop-server.vercel.app/remove-book/${_id}`)
                .then((response) => {
                    if(response?.data?.deletedCount){            
                        toast.success('Book Deleted Successfully')
                        handleSuccess()
                        setOpenModal(false)
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
        <div>
            <div className='book_card' onClick={() => setOpenModal(true)}>
                <h2>{name}</h2>
                <h3>Price: ৳{price}</h3>
                <h3>Total Stock: {totalStock}</h3>
            </div>
            <div className={`modal_container ${openModal ? 'scale-100 opacity-100 ' : ' scale-0 opacity-0'}`}>
                <div className='modal'>
                    <div className="flex items-center justify-between">
                        <h1>Book Info</h1>
                        <div className="flex gap-3">
                            <Link to={`/edit-book/${_id}`} className="edit_btn action_btn">
                                <img src={editIcon} className='w-4 md:!w-[22px] h-4 md:!h-[22px] m-1.5 md:m-2' alt="" />
                            </Link>
                            <div className="action_btn delete_btn" onClick={() => DeleteBook()}>
                                <img src={trashIcon} className='w-4 md:!w-[22px] h-4 md:!h-[22px] m-1.5 md:m-2' alt="" />
                            </div>
                            <div className="action_btn" onClick={() => setOpenModal(false)}>
                                <img src={crossIcon} className='w-4 md:!w-[22px] h-4 md:!h-[22px] m-1.5 md:m-2' alt="" />
                            </div>
                        </div>
                    </div>
                    <h6>Book Name</h6>
                    <h2>{name}</h2>
                    <h6>Book Price</h6>
                    <h3 className="!mt-3">৳{price}</h3>
                    <h6>Description</h6>
                    <p className="!mt-3">{description}</p>
                    <h6>Stock Info</h6>
                    {
                        stock[0]?.inStock > 0 ?
                        <div className="table_container">
                            <table className="w-full">
                                <thead className="text-left">
                                    <tr>
                                        <th className="px-2 py-1">Edition</th>
                                        <th className="px-2 py-1">Condition</th>
                                        <th className="px-2 py-1">Quantity</th>
                                        <th className="px-2 py-1">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stock?.map((item, idx) => (
                                            <BookTable key={idx} item={item} />
                                        ))
                                    }                    
                                </tbody>
                            </table>
                        </div>
                        : 
                        <p className="!mt-3">0 in stock</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default BookCard;