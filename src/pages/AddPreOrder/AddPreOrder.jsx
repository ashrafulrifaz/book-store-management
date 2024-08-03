import { useForm } from "react-hook-form";
import PlusIcon from "../../assets/icons/plus.png";
import { useState } from "react";
import Select from 'react-select'

const AddPreOrder = () => {
    const { register, handleSubmit } = useForm();
    const [books, setBooks] = useState([{ name: "", quantity: "", edition: "", condition: "" }]);

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

    const onSubmit = data => {
        console.log(data);
    };

    const handleBookList = () => {
        setBooks([...books, { name: "", quantity: "", edition: "", condition: "" }]);
    }

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
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div>
                    {
                        books?.map((book, index) => (
                            <div key={index} className="p-5 border-2 rounded-xl mt-5 bg-baground mb-5">
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="col-span-2">
                                        <label>Book Name</label>
                                        <input type="text" required placeholder="Enter book name here" {...register("book_name", { required: true })} />
                                    </div>
                                    <div>
                                        <label>Quantity</label>
                                        <input type="number" required placeholder="Enter book name here" {...register("quantity", { required: true })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <label>Edition</label>
                                        <Select options={editionOptions} />
                                    </div>
                                    <div>
                                        <label>Condition</label>
                                        <Select options={conditionOptions} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <button className="w-1/2">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddPreOrder;