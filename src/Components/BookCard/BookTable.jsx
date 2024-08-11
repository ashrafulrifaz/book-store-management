
const BookTable = ({item}) => {
    const {edition, condition, inStock} = item || {}

    return (
        <tr className="border-t-2 border-secondary">
            <td className="px-2 py-1">{edition}</td>
            <td className="px-2 py-1">{condition}</td>
            <td className="px-2 py-1">{inStock}</td>
        </tr>
    );
};

export default BookTable;