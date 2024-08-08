import filterIcon from '../../assets/icons/filter.png'
import miniArrowIcon from '../../assets/icons/angle-small-right.png'
import searchIcon from '../../assets/icons/search.png'
import { useContext, useState } from 'react';
import BookCard from '../../Components/BookCard/BookCard';
import useBooks from '../../Hooks/useBooks';
import { AuthContext } from '../../Provider/Provider';

const Home = () => {
    const {user} = useContext(AuthContext)
    const [allBooks, refetch] = useBooks()
    const [bookName, setBookName] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('')

    const filterItems = [
        {"name": "recent"},
        {"name": "best selling"},
        {"name": "price"},
    ]

    console.log(!!user);
    

    const searchedBook = allBooks?.filter(book => book?.name.toLowerCase().includes(bookName.toLowerCase()))
    const filteredBook = currentFilter === 'price' ? allBooks?.sort((a, b) => b.price - a.price) : allBooks
    

    return (
        <div className="container mt-5 !p-6">
            <div className="flex items-center justify-between mb-7">
                <div className='flex gap-2 items-center'>
                    <div className={`${showFilter ? '!border-primary' : ''} action_btn hover:border-primary`} onClick={() => setShowFilter(!showFilter)}>
                        <img src={filterIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                    </div>
                    <div className={`${showFilter ? 'opacity-100' : 'opacity-0'} flex gap-2 items-center transition-all duration-500`}>
                        <div>
                            <img src={miniArrowIcon} className={`w-5 h-5 transition-all duration-500 ${showFilter ? 'rotate-0' : 'rotate-180'}`} alt="" />
                        </div>
                        {
                            filterItems?.map((item, idx) => (
                                <div key={idx} className={`action_btn ${currentFilter && currentFilter == item?.name ? 'bg-primary !border-primary text-white' : 'hover:border-primary'}`} onClick={() => setCurrentFilter(item?.name)}>
                                    <h4 className='capitalize font-primary font-semibold my-2 mx-3'>{item.name}</h4>
                                </div>
                            ))
                        }  
                    </div>                  
                </div>
                <div>
                    <div className={`search_container`}>
                        <input type="text" placeholder='Search your book' onChange={e => setBookName(e.target.value)} />
                        <div className={`search-div`}>
                            <img src={searchIcon} className='!w-[22px] !h-[22px]' alt="" />
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