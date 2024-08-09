import filterIcon from '../../assets/icons/filter.png'
import miniArrowIcon from '../../assets/icons/angle-small-right.png'
import newIcon from '../../assets/icons/add-document.png'
import { Link } from 'react-router-dom';
import PreOrderCard from '../../Components/PreOrderCard/PreOderCard';
import useOrderedBook from '../../Hooks/useOrderedBook';
import { useState } from 'react';

const PreOrders = () => {
    const [combinedBooks] = useOrderedBook()
    const [showFilter, setShowFilter] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('recent')

    const filterItems = [
        {"name": "quantity"},
        {"name": "recent"}
    ]

    const filteredItem = currentFilter === 'quantity' ? combinedBooks?.sort((a, b) => b.quantity - a.quantity) : combinedBooks

    return (
        <div className="container mt-3 md:mt-5 p-4 md:!p-6 pre_order">
            <div className="flex flex-col md:flex-row items-start lg:items-center justify-between">
                <h2 className='mb-5'>Pre-Orders</h2>
                <div className='flex flex-row-reverse md:flex-row items-center gap-3'>
                    <div className='flex flex-row-reverse md:flex-row gap-2 items-center'>
                        <div className={`${showFilter ? 'opacity-100' : 'opacity-0'} flex flex-row-reverse md:flex-row gap-2 items-center transition-all duration-500`}>
                            {
                                filterItems?.map((item, idx) => (
                                    <div key={idx} className={`action_btn ${currentFilter && currentFilter == item?.name ? 'bg-primary !border-primary text-white' : 'hover:border-primary'}`} onClick={() => setCurrentFilter(item?.name)}>
                                        <h4 className='capitalize text-sm lg:text-base font-primary font-semibold my-1 lg:my-2 mx-1.5 lg:mx-3'>{item.name}</h4>
                                    </div>
                                ))
                            }  
                            <div>
                                <img src={miniArrowIcon} className={`w-3 md:w-5 h-3 md:h-5 transition-all duration-500 ${showFilter ? 'rotate-0 md:rotate-180' : 'rotate-180 md:rotate-0'}`} alt="" />
                            </div>
                        </div>     
                        <div className={`${showFilter ? '!border-primary' : ''} action_btn hover:border-primary`} onClick={() => setShowFilter(!showFilter)}>
                            <img src={filterIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                        </div>             
                    </div>
                    <Link to="/add-preorder" className="action_btn">
                        <img src={newIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-5'>
                {
                    combinedBooks ? 
                    filteredItem?.map((preOrder, idx) => (
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