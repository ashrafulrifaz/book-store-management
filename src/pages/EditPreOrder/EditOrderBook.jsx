import { useState } from "react";
import useBooks from "../../Hooks/useBooks";

const EditOrderBook = ({index, book, books, setBooks, editionOptions, conditionOptions,}) => {    
    const [allBooks] = useBooks()
    const [bookName, setBookName] = useState('')
    console.log(book.quantity);
    
    
    const searchedBook = allBooks?.filter(book => book?.name.toLowerCase().includes(bookName.toLowerCase()))

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
    
    return (
        <div className="p-3 md:p-5 border-2 rounded-xl mt-5 bg-baground mb-3 md:mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                <div className="cols-span-1 md:col-span-2 relative">
                    <label>Book Name</label>
                    <input type="text" required placeholder="Enter book name here" onChange={(e) => setBookName(e.target.value)} value={book.name || bookName} />
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
                    <input type="number" required placeholder="Enter book name here" onChange={(e) => handleQuantity(e, index)} value={book.quantity} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-3 md:mt-5">
                <div>
                    <label>Edition</label>
                    <select onChange={(e) => handleEdition(e, index)} defaultValue={book?.edition} >
                        {
                            editionOptions?.map((edition, idx) => (
                                <option key={idx} value={`${edition?.value}`}>{edition?.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Condition</label>
                    <select onChange={(e) => handleCondition(e, index)} defaultValue={book?.condition}>
                        {
                            conditionOptions?.map((condition, idx) => (
                                <option key={idx} value={`${condition?.value}`}>{condition?.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EditOrderBook;