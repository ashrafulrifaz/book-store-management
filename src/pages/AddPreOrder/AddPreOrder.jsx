import { useForm } from "react-hook-form";
import PlusIcon from "../../assets/icons/plus.png";
import { useState } from "react";
import useBooks from "../../Hooks/useBooks";
import axios from "axios";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const AddPreOrder = () => {
    const { register, handleSubmit } = useForm();
    const [allBooks] = useBooks()
    const [books, setBooks] = useState([{ name: "", quantity: "", edition: "common", condition: "new" }]);
    const [bookName, setBookName] = useState('')
    const today = new Date()
    
    const searchedBook = allBooks?.filter(book => book?.name.toLowerCase().includes(bookName.toLowerCase()))

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
        setBooks([...books, { name: "", quantity: "", edition: "", condition: "" }]);
    }

    const handleBookName = (e, index) => {
        const updatedBooks = [...books];
        updatedBooks[index] = { ...updatedBooks[index], name: e.target.textContent };
        setBooks(updatedBooks);
        setBookName('')
    };

    const handleQuantity = (e, index) => {
        const updatedBooks = [...books];
        updatedBooks[index] = { ...updatedBooks[index], quantity: e.target.value };
        setBooks(updatedBooks);
    };

    const handleEdition = (e, index) => {
        const updatedBooks = [...books];
        updatedBooks[index] = { ...updatedBooks[index], edition: e.target.value };
        setBooks(updatedBooks);
    };

    const handleCondition = (e, index) => {
        const updatedBooks = [...books];
        updatedBooks[index] = { ...updatedBooks[index], condition: e.target.value };
        setBooks(updatedBooks);
    };

    const onSubmit = data => {
        const newPreOrder = {
            customerName: data.name,
            customerNumber: data.number,
            date: today,
            orderedBooks: books
        }        
        
        axios.post('http://localhost:3000/new-preorder', newPreOrder)
            .then(res => {
                if(res?.data){          
                    toast.success('Pre-Order Added Successfully')
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
        <div className="py-6 add_pre_order">
            <div className="container">
                <h2>Add a new pre order</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-7">
                        <label>Customer Name</label>
                        <input type="text" required placeholder="Enter customer name here" {...register("name", { required: true })} />
                    </div>
                    <div className="mt-5">
                        <label>Customer Number</label>
                        <input type="number" required placeholder="Enter book price here" {...register("number", { required: true })} />
                    </div>
                    <div className="flex justify-between items-center mt-7">
                        <h3>Book List</h3>
                        <div className="action_btn" onClick={() => handleBookList()}>
                            <img src={PlusIcon} alt="" className="m-2" />
                        </div>
                    </div>
                    {
                        books?.map((book, index) => (
                            <div key={index} className="p-5 border-2 rounded-xl mt-5 bg-baground mb-5">
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="col-span-2 relative">
                                        <label>Book Name</label>
                                        <input type="text" required placeholder="Enter book name here" onChange={(e) => setBookName(e.target.value)} />
                                        <div className={`${bookName ? 'book' : 'hidden'} absolute top-24 bg-white left-0 w-full max-h-48 border-2 border-border rounded-xl p-2 overflow-y-auto`}>
                                            {
                                                searchedBook?.length > 0 ?
                                                searchedBook?.map((book, idx) => (
                                                    <div className="cursor-pointer p-2 border-b border-border" key={idx} onClick={e => handleBookName(e, index)}>{book?.name}</div>
                                                ))
                                                : <div className="text-center py-2 font-primary font-semibold">No Book Found</div>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <label>Quantity</label>
                                        <input type="number" required placeholder="Enter book name here" onChange={(e) => handleQuantity(e, index)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <label>Edition</label>
                                        <select onChange={(e) => handleEdition(e, index)}>
                                            {
                                                editionOptions?.map((edition, idx) => (
                                                    <option key={idx} value={`${edition?.value}`}>{edition?.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Edition</label>
                                        <select onChange={(e) => handleCondition(e, index)}>
                                            {
                                                conditionOptions?.map((condition, idx) => (
                                                    <option key={idx} value={`${condition?.value}`}>{condition?.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <button className="w-1/2">Add Pre Order</button>
                </form>
            </div>
        </div>
    );
};

export default AddPreOrder;