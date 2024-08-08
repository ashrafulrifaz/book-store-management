import { Link } from 'react-router-dom';

const CustomerCard = ({customer}) => {
    const {_id, customerName, customerNumber, date} = customer || {}    

    return (
        <Link to={`/customers/${customerName}`}>
            <div className='book_card !mt-0'>
                <h2>{customerName}</h2>
                <h3><span className='font-bold'>Number: </span>{customerNumber}</h3>
                <h3><span className='font-bold'>Order Date: </span>{date?.slice(0, 10)}</h3>
            </div>
        </Link>
    );
};

export default CustomerCard;