import usePreOrders from "./userPreOrders";

const useOrderedBook = () => {
    const [allPreOrders, refetch] = usePreOrders() 
      
    const combinedBooks = allPreOrders.reduce((acc, order) => {
      order.orderedBooks.forEach(book => {
        const existingBook = acc.find(b => b.name === book.name);
        if (existingBook) {
          existingBook.quantity += parseInt(book.quantity);
        } else {
          acc.push({ name: book.name, edition: book.edition, condition: book.condition, quantity: parseInt(book.quantity) });
        }
      });
      return acc;
    }, []);

    return [combinedBooks, refetch];
};

export default useOrderedBook;