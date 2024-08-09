import { useParams } from "react-router-dom";
import OrderTableRow from "./OrderTableRow";
import useBooks from "../../Hooks/useBooks";
import usePreOrders from "../../Hooks/userPreOrders";

const PreOrderDetails = () => {
    const {name} = useParams()
    const [allBooks] = useBooks()
    const [allPreOrders] = usePreOrders()
    const currentBook = allBooks?.find(book => book?.name === name)    

    const filteredBooks = allPreOrders
    ?.filter(order =>
        order.orderedBooks.some(book => book.name === name)
    )
    .map(order => ({
        ...order,
        orderedBooks: order.orderedBooks.filter(book => book.name === name)
    }));
    
    console.log(filteredBooks);
    

    return (
        <div className="container !p-6 customer_details">
            <h2 className="mb-1">{name} order List</h2>      
            <div className="flex items-end gap-4">
                <h6 className="mt-0">Price</h6>
                <p className="capitalize">{currentBook?.price}</p>
            </div>          
            <h6 className="mt-2 text-lg">Order List</h6>
            <div className="table_container">
                <table>
                    <thead className="text-left">
                        <tr>
                            <th>Customer Name</th>
                            <th>Edition</th>
                            <th>Condition</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredBooks.map((order, index) => (
                                order.orderedBooks.map((book, idx) => (
                                <OrderTableRow key={`${index}-${idx}`} order={order} books={book} price={currentBook?.price} />
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PreOrderDetails;