import filterIcon from '../../assets/icons/filter.png'
import newIcon from '../../assets/icons/add-document.png'
import { Link } from 'react-router-dom';
import usePreOrders from '../../Hooks/userPreOrders';
import PreOrderCard from '../../Components/PreOrderCard/PreOderCard';

const PreOrders = () => {
    const [allPreOrders] = usePreOrders()

    return (
        <div className="container mt-5 !p-6 pre_order">
            <div className="flex items-center justify-between">
                <h2 className='mb-5'>Pre-Orders</h2>
                <div className='flex items-center gap-3'>
                    <div className="action_btn">
                        <img src={filterIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                    </div>
                    <Link to="/add-preorder" className="action_btn">
                        <img src={newIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {
                    allPreOrders ? 
                    allPreOrders?.map((preOrder, idx) => (
                        <PreOrderCard key={idx} preOrder={preOrder} />
                    ))
                    :
                    <div className="flex justify-center">
                        <div className='loader'></div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PreOrders;