import useBooks from "../../Hooks/useBooks";

const TableRow = ({books, idx}) => {
    const {name, edition, condition, quantity} = books || {}
    const [allBooks] = useBooks()
    const currentBook = allBooks?.find(book => book.name === name)    

    return (
        <tr className="border-t-2 border-border">
            <td>{idx + 1}</td>
            <td>{name}</td>
            <td>{edition}</td>
            <td>{condition}</td>
            <td>{quantity}</td>
            <td>{currentBook?.price * quantity}</td>
        </tr>
    );
};

export default TableRow;