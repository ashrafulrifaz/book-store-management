import { useForm } from "react-hook-form";

const AddBook = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="py-6 add_book">
            <div className="container">
                <h2>Add a new book</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-7">
                        <label>Book Name</label>
                        <input type="text" required placeholder="Enter book name here" {...register("name", { required: true })} />
                    </div>
                    <div className="mt-5">
                        <label>Book Price</label>
                        <input type="text" required placeholder="Enter book price here" {...register("price", { required: true })} />
                    </div>
                    <div className="mt-5 mb-3">
                        <label>Description</label>
                        <textarea type="text" required placeholder="Enter book description here" {...register("description", { required: true })} />
                    </div>
                    <button className="w-1/2">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;