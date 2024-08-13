import { useNavigate, useParams } from "react-router-dom";
import usePreOrders from "../../Hooks/userPreOrders";
import confetti from "canvas-confetti";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import PlusIcon from "../../assets/icons/plus.png";
import { useEffect, useState } from "react";
import EditOrderBook from "./EditOrderBook";

const EditPreOrder = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const {id} = useParams()
    const [allPreOrders] = usePreOrders()    
    const [books, setBooks] = useState([{ name: "", quantity: "1", edition: "common", condition: "new" }]);
    const currentCustomer = allPreOrders?.find(customer => customer?._id === id) 
    const {customerName, customerNumber, customerAddress, date, _id, orderedBooks} = currentCustomer || {}    

    useEffect(() => {
        setBooks(orderedBooks)
    }, [orderedBooks])
    
    const editionOptions = [
        { value: 'common', label: 'common' },
        { value: 'latest', label: 'latest' },
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        ...Array.from({ length: 27 }, (_, i) => ({ value: `${i + 3}th`, label: `${i + 4}th` })),
    ];

    const conditionOptions = [
        { value: 'new', label: 'new' },
        { value: 'old', label: 'old' }
    ]

    const handleBookList = () => {
        setBooks([...books, { name: "", quantity: 0, edition: "common", condition: "new" }]);
    }    

    const onSubmit = data => {        
        const updatePreOrder = {
            customerName: data.name ? data.name : customerName,
            customerNumber: data.number ? data.number : customerNumber,
            customerAddress: data.address ? data.address : customerAddress,
            date: date,
            orderedBooks: books
        }        
        console.log(updatePreOrder);
        
        
        axios.patch(`http://localhost:3000/preorder/${_id}`, updatePreOrder)
            .then(res => {
                if(res?.data){                             
                    toast.success('Pre-Order Updated Successfully')
                    handleSuccess()
                    navigate('/pre-orders')
                }                
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

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
        <div className="container !p-4 md:!p-6 add_pre_order">
            <h2>Edit {customerName}{"'"}s pre order Info</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3 md:mt-7">
                    <label>Customer Name</label>
                    <input type="text" required placeholder="Enter customer name here" {...register("name")} defaultValue={customerName} />
                </div>
                <div className="mt-3 md:mt-5">
                    <label>Customer Number</label>
                    <input type="number" required placeholder="Enter customer number here" {...register("number")} defaultValue={customerNumber} />
                </div>
                <div className="mt-3 md:mt-5">
                    <label>Customer Address</label>
                    <input type="text" required placeholder="Enter customer address here" {...register("address")} defaultValue={customerNumber} />
                </div>
                <div className="flex justify-between items-center mt-7">
                    <h3>Book List</h3>
                    <div className="action_btn" onClick={() => handleBookList()}>
                        <img src={PlusIcon} alt="" className="m-2" />
                    </div>
                </div>
                {
                    books?.map((book, index) => (
                        <EditOrderBook key={index} index={index} book={book} editionOptions={editionOptions} books={books} setBooks={setBooks} conditionOptions={conditionOptions} />
                    ))
                }
                <button className="w-full lg:w-1/2">Update Pre Order</button>
            </form>
        </div>
    );
};

export default EditPreOrder;