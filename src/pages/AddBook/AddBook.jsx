import axios from "axios";
import confetti from "canvas-confetti";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PlusIcon from "../../assets/icons/plus.png";

const AddBook = () => {
    const { register, handleSubmit } = useForm();
    const [stock, setStock] = useState([{ edition: "common", condition: "new", inStock: 0, location: "" }]);
    const navigate = useNavigate();

    const handleStockList = () => {
        setStock([...stock, { edition: "common", condition: "new", inStock: 0, location: "" }]);
    };

    const editionOptions = [
        { value: 'common', label: 'common' },
        { value: 'latest', label: 'latest' },
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        ...Array.from({ length: 27 }, (_, i) => ({ value: `${i + 4}th`, label: `${i + 4}th` })),
    ];    

    const conditionOptions = [
        { value: 'new', label: 'new' },
        { value: 'old', label: 'old' }
    ];

    const handleStockChange = (field, value, idx) => {
        setStock((prevStock) => {
            const newStock = [...prevStock];
            newStock[idx] = { ...newStock[idx], [field]: value };
            return newStock;
        });
    };

    const onSubmit = data => {
        const newBook = {
            name: data.name,
            price: data.price,
            stock: stock,
            description: data.description
        };
        console.log(newBook);
        
        
        axios.post('http://localhost:3000/new-book', newBook)
            .then(res => {
                if(res?.data){          
                    toast.success('Book Added Successfully');
                    handleSuccess();      
                    navigate('/');
                }                
            })
            .catch((error) => {
                console.error(error.message);
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
                    <div className="flex justify-between items-center mt-5 mb-3">
                        <h3 className="font-primary font-semibold text-[17px] md:text-[19px] block">Book Stock List</h3>
                        <div className="action_btn" onClick={() => handleStockList()}>
                            <img src={PlusIcon} alt="" className="m-2" />
                        </div>
                    </div>
                    {
                        stock?.map((item, idx) => (
                            <div key={idx} className="p-4 border-2 rounded-xl bg-background mb-3 md:mb-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <div>
                                        <label>Edition</label>
                                        <select value={item.edition} onChange={(e) => handleStockChange("edition", e.target.value, idx)}>
                                            {
                                                editionOptions?.map((edition, optionIdx) => (
                                                    <option key={optionIdx} value={edition.value}>{edition.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Condition</label>
                                        <select value={item.condition} onChange={(e) => handleStockChange("condition", e.target.value, idx)}>
                                            {
                                                conditionOptions?.map((condition, optionIdx) => (
                                                    <option key={optionIdx} value={condition.value}>{condition.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Stock</label>
                                        <input type="number" className="!py-2.5" placeholder="Enter book stock here" onChange={(e) => handleStockChange("inStock", parseInt(e.target.value), idx)} />
                                    </div>
                                    <div>
                                        <label>Book Location</label>
                                        <input type="text" className="!py-2.5" placeholder="Enter book location here" onChange={(e) => handleStockChange("location", e.target.value, idx)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
