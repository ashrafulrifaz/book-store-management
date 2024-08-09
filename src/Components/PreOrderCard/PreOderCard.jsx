import { Link } from "react-router-dom";

const PreOrderCard = ({preOrder}) => {
    const {name, quantity} = preOrder || {}    

    return (
        <Link to={`/pre-order/${name}`}>
            <div className='book_card !mt-0 h-full'>
                <h2 className="!text-lg md:!text-xl">{name}</h2>
                <h3 className="!font-semibold"><span className="font-bold">Quantity:</span> {quantity}</h3>
            </div>
        </Link>
    );
};

export default PreOrderCard;