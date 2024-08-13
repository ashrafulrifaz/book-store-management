
const BookTable = ({item}) => {
    const {edition, condition, inStock, location} = item || {}

    const handleShow = () => {
        console.log(edition);
        
    }

    return (
        <tr className="border-t-2 border-secondary" onClick={handleShow}>
            <td className="px-2 py-1">{edition}</td>
            <td className="px-2 py-1">{condition}</td>
            <td className="px-2 py-1">{inStock}</td>
            <td className="px-2 py-1">{location}</td>
        </tr>
    );
};

export default BookTable;