
const OrderTableRow = ({books, order, price}) => {
    const {quantity, condition, edition} = books || {}
    const {customerName} = order || {}
    

    return (
        <tr className="border-t-2 border-border">
            <td className="capitalize">{customerName}</td>
            <td>{edition}</td>
            <td>{condition}</td>
            <td>{quantity}</td>
            <td>{price * quantity}</td>
        </tr>
    );
};

export default OrderTableRow;