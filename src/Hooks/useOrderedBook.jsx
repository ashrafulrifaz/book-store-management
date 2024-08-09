import usePreOrders from "./userPreOrders";

const useOrderedBook = () => {
    const [allPreOrders] = usePreOrders() 
      
    const combinedBooks = allPreOrders.reduce((acc, order) => {
      order.orderedBooks.forEach(book => {
        const existingBook = acc.find(b => b.name === book.name);
        if (existingBook) {
          existingBook.quantity += parseInt(book.quantity);
        } else {
          acc.push({ name: book.name, quantity: parseInt(book.quantity) });
        }
      });
      return acc;
    }, []);

    return [combinedBooks];
};

export default useOrderedBook;