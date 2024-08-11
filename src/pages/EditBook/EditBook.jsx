import axios from "axios";
import confetti from "canvas-confetti";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useBooks from "../../Hooks/useBooks";
import { useEffect, useState } from "react";
import EditBookStock from "./EditBookStock";
import PlusIcon from "../../assets/icons/plus.png";

const EditBook = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [stock, setStock] = useState([{ edition: "common", condition: "new", inStock: 0}]);
    const [allBooks] = useBooks()
    const {id} = useParams()
    const currentBook = allBooks?.find(book => book._id === id)
    console.log(currentBook.stock);
    

    useEffect(() => {
        setStock(currentBook?.stock || [{ edition: "", condition: "", inStock: 0 }]);
    }, [currentBook]);     

    const handleStockList = () => {
        setStock([...stock, { edition: "common", condition: "new", inStock: 0 }]);
    }  

    const onSubmit = data => {
        const updatedBook = {
            name: data.name,
            price: data.price,
            stock: stock,
            description: data.description
        }

        console.log(updatedBook);                
        
        axios.patch(`http://localhost:3000/edit-book/${id}`, updatedBook)
            .then(res => {
                if(res?.data){          
                    toast.success('Book Updated Successfully')
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
        <div className="edit_book container mt-3 md:mt-5 ">
            <h2>Edit {currentBook?.name}{"'"}s Info</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 md:mt-7">
                    <label>Book Name</label>
                    <input type="text" required placeholder="Enter book name here" {...register("name")} defaultValue={currentBook?.name} />
                </div>
                <div className="mt-3 md:mt-5">
                    <label>Book Price</label>
                    <input type="number" required placeholder="Enter book price here" {...register("price")} defaultValue={currentBook?.price} />
                </div>
                <div className="flex justify-between items-center mt-5 mb-3">
                    <h3 className="font-primary font-semibold text-[17px] md:text-[19px] block">Book List</h3>
                    <div className="action_btn" onClick={() => handleStockList()}>
                        <img src={PlusIcon} alt="" className="m-2" />
                    </div>
                </div>
                {
                    stock?.map((item, idx) => (
                        <EditBookStock key={idx} stock={item} setStock={setStock} index={idx} />
                    ))
                }
                <div className="mt-3 md:mt-5 mb-0 md:mb-3">
                    <label>Description</label>
                    <textarea type="text" required placeholder="Enter book description here" {...register("description")} defaultValue={currentBook?.description} />
                </div>
                <button className="w-full lg:w-1/2">Update Book Info</button>
            </form>
        </div>
    );
};

export default EditBook;