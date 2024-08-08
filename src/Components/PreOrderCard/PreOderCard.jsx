import { Link } from "react-router-dom";

const PreOrderCard = ({preOrder}) => {
    const {_id, name, price, description} = preOrder || {}    

    return (
        <Link to='/'>
            <div className='book_card'>
                <h2>{name}</h2>
                <h3>৳{price}</h3>
            </div>
        </Link>
    );
};

export default PreOrderCard;