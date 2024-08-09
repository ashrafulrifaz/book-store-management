import axios from "axios";
import confetti from "canvas-confetti";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddBook = () => {
    const { register, handleSubmit } = useForm();
    const confettiRef = useRef(null);
    const navigate = useNavigate();

    const onSubmit = data => {
        const newBook = {
            name: data.name,
            price: data.price,
            description: data.description
        }
        
        axios.post('http://localhost:3000/new-book', newBook)
            .then(res => {
                if(res?.data){          
                    toast.success('Book Added Successfully')
                    handleSuccess()      
                    navigate('/')
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
        <div className="py-4 md:py-6 add_book">
            <div className="container">
                <h2>Add a new book</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 md:mt-7">
                        <label>Book Name</label>
                        <input type="text" required placeholder="Enter book name here" {...register("name", { required: true })} />
                    </div>
                    <div className="mt-3 md:mt-5">
                        <label>Book Price</label>
                        <input type="number" required placeholder="Enter book price here" {...register("price", { required: true })} />
                    </div>
                    <div className="mt-3 md:mt-5 mb-1 md:mb-3">
                        <label>Description</label>
                        <textarea type="text" required placeholder="Enter book description here" {...register("description", { required: true })} />
                    </div>
                    <button className="w-full lg:w-1/2">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;