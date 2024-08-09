import filterIcon from '../../assets/icons/filter.png'
import miniArrowIcon from '../../assets/icons/angle-small-right.png'
import searchIcon from '../../assets/icons/search.png'
import { useState } from 'react';
import BookCard from '../../Components/BookCard/BookCard';
import useBooks from '../../Hooks/useBooks';

const Home = () => {
    const [allBooks, refetch] = useBooks()
    const [bookName, setBookName] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('')

    const filterItems = [
        {"name": "recent"},
        {"name": "selling"},
        {"name": "price"},
    ]
    

    const searchedBook = allBooks?.filter(book => book?.name.toLowerCase().includes(bookName.toLowerCase()))
    const filteredBook = currentFilter === 'price' ? allBooks?.sort((a, b) => b.price - a.price) : allBooks
    

    return (
        <div className="container mt-2.5 md:mt-5 md:!p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-7 gap-y-5">
                <div className='flex flex-wrap gap-2 items-start'>
                    <div className={`${showFilter ? '!border-primary' : ''} action_btn hover:border-primary`} onClick={() => setShowFilter(!showFilter)}>
                        <img src={filterIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px] m-1.5 lg:m-2' alt="" />
                    </div>
                    <div className={`${showFilter ? 'opacity-100' : 'opacity-0'} flex gap-2 items-center transition-all duration-500`}>
                        <div>
                            <img src={miniArrowIcon} className={`w-3 md:w-5 h-3 md:h-5 transition-all duration-500 ${showFilter ? 'rotate-0' : 'rotate-180'}`} alt="" />
                        </div>
                        {
                            filterItems?.map((item, idx) => (
                                <div key={idx} className={`action_btn ${currentFilter && currentFilter == item?.name ? 'bg-primary !border-primary text-white' : 'hover:border-primary'}`} onClick={() => setCurrentFilter(item?.name)}>
                                    <h4 className='capitalize text-sm lg:text-base font-primary font-semibold my-1 lg:my-2 mx-1.5 lg:mx-3'>{item.name}</h4>
                                </div>
                            ))
                        }  
                    </div>                  
                </div>
                <div className='w-full md:hidden'>
                    <div className={`search_container`}>
                        <input type="text" placeholder='Search your book' onChange={e => setBookName(e.target.value)} />
                        <div className={`search-div`}>
                            <img src={searchIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px]' alt="" />
                        </div>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <div className={`search_container`}>
                        <input type="text" placeholder='Search your book' onChange={e => setBookName(e.target.value)} />
                        <div className={`search-div`}>
                            <img src={searchIcon} className='w-4 lg:!w-[22px] h-4 lg:!h-[22px]' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative'>
                <div className={`${bookName ? 'hidden' : 'block'}`}>
                    {
                        filteredBook ? 
                        filteredBook?.map((book, idx) => (
                            <BookCard key={idx} book={book} refetch={refetch} />
                        ))
                        :
                        <div className="flex justify-center">
                            <div className='loader'></div>
                        </div>
                    }
                </div>
                <div className={`${bookName ? 'block' : 'hidden'}`}>
                    {
                        searchedBook?.length > 0 ?
                        searchedBook?.map((book, idx) => (
                            <BookCard key={idx} book={book} refetch={refetch}></BookCard>
                        ))
                        : <div className="text-center py-10 font-primary font-semibold">No Book Found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;