
const PreOrderTable = ({idx, book}) => {
    const {name, edition, condition, quantity} = book || {}

    return (
        <tr className="border-t-2 border-secondary">
            <td className="capitalize">{idx + 1}</td>
            <td>{name}</td>
            <td>{edition}</td>
            <td>{condition}</td>
            <td>{quantity}</td>
        </tr>
    );
};

export default PreOrderTable;