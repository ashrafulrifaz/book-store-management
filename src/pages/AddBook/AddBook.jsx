
const AddBook = () => {
    return (
        <div className="py-8 add_book">
            <div className="container">
                <h2>Add a new book</h2>
                <form>
                    <div className="mt-7">
                        <label>Book Name</label>
                        <input type="text" required placeholder="Enter book name here" />
                    </div>
                    <div className="mt-5">
                        <label>Book Price</label>
                        <input type="text" required placeholder="Enter book price here" />
                    </div>
                    <div className="mt-5 mb-3">
                        <label>Description</label>
                        <textarea type="text" required placeholder="Enter book price here" />
                    </div>
                    <button className="w-1/2">Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;