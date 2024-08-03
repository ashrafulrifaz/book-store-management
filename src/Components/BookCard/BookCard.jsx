import { useState } from "react";
import crossIcon from '../../assets/icons/cross-small.png'
import trashIcon from '../../assets/icons/trash.png'
import editIcon from '../../assets/icons/edit.png'

const BookCard = ({book}) => {
    const {name, price, description} = book
    const [openModal, setOpenModal] = useState(false)
    console.log(openModal);
    

    return (
        <div>
            <div className='book_card' onClick={() => setOpenModal(true)}>
                <h2>{name}</h2>
                <h3>৳{price}</h3>
            </div>
            <div className={`modal_container ${openModal ? 'scale-100 opacity-100 ' : ' scale-0 opacity-0'}`}>
                <div className='modal'>
                    <div className="flex items-center justify-between">
                        <h1>Book Info</h1>
                        <div className="flex gap-3">
                            <div className="edit_btn action_btn">
                                <img src={editIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                            </div>
                            <div className="action_btn delete_btn">
                                <img src={trashIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                            </div>
                            <div className="action_btn" onClick={() => setOpenModal(false)}>
                                <img src={crossIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                            </div>
                        </div>
                    </div>
                    <h6>Book Name</h6>
                    <h2>{name}</h2>
                    <h6>Book Price</h6>
                    <h3 className="!mt-3">৳{price}</h3>
                    <h6>Description</h6>
                    <p className="!mt-3">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookCard;