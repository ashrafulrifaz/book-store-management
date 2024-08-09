import axios from "axios";
import confetti from "canvas-confetti";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useBooks from "../../Hooks/useBooks";

const EditBook = () => {
    const { register, handleSubmit } = useForm();
    const [allBooks] = useBooks()
    const {id} = useParams()
    const currentBook = allBooks?.find(book => book._id === id)
    

    const onSubmit = data => {
        const updatedBook = {
            name: data.name,
            price: data.price,
            description: data.description
        }
        
        
        axios.patch(`http://localhost:3000/edit-book/${id}`, updatedBook)
            .then(res => {
                if(res?.data){          
                    toast.success('Book Updated Successfully')
                    handleSuccess()      
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
        <div className="edit_book container mt-5 ">
            <h2>Edit {currentBook?.name}{"'"}s Info</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-7">
                    <label>Book Name</label>
                    <input type="text" required placeholder="Enter book name here" {...register("name")} defaultValue={currentBook?.name} />
                </div>
                <div className="mt-5">
                    <label>Book Price</label>
                    <input type="number" required placeholder="Enter book price here" {...register("price")} defaultValue={currentBook?.price} />
                </div>
                <div className="mt-5 mb-3">
                    <label>Description</label>
                    <textarea type="text" required placeholder="Enter book description here" {...register("description")} defaultValue={currentBook?.description} />
                </div>
                <button className="w-1/2">Update Book Info</button>
            </form>
        </div>
    );
};

export default EditBook;