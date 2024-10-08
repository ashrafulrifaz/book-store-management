const TableRow = ({books, idx}) => {
    const {name, edition, condition, quantity} = books || {}

    return (
        <tr className="border-t-2 border-secondary">
            <td>{idx + 1}</td>
            <td>{name}</td>
            <td>{edition}</td>
            <td>{condition}</td>
            <td>{quantity}</td>
        </tr>
    );
};

export default TableRow;