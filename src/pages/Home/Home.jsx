import filterIcon from '../../assets/icons/filter.png'
import miniArrowIcon from '../../assets/icons/angle-small-right.png'
import searchIcon from '../../assets/icons/search.png'
import crossIcon from '../../assets/icons/cross-small.png'
import { useState } from 'react';
import axios from 'axios';
import BookCard from '../../Components/BookCard/BookCard';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    const [activeSearch, setActiveSearch] = useState(false)

    const { data: books = [], isPending , refetch} = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
          const res = await axios.get("http://localhost:3000/all-books");
          return res.data;
        },
    });

    const handleSearch = () => {
        if(activeSearch){
            console.log('hello')            
        } else {            
            setActiveSearch(true)
        }
    }

    return (
        <div className="container mt-5 !p-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="action_btn">
                        <img src={filterIcon} className='!w-[22px] !h-[22px] m-2' alt="" />
                    </div>
                </div>
                <div>
                    <div className={`${activeSearch ? 'search_btn ' : 'action_btn'}`}>
                        <input type="text" placeholder='Search your book' className={`${activeSearch ? 'block' : 'hidden'}`} />
                        <div className={`search-div ${activeSearch ? 'bg-third' : 'bg-transparent'}`} onClick={() => handleSearch()}>
                            <img src={searchIcon} className='!w-[22px] !h-[22px]' alt="" />
                        </div>
                        <div className={`${activeSearch ? 'cancel-div' : 'hidden'}`} onClick={() => setActiveSearch(false)}>
                            <img src={crossIcon} className='!w-[22px] !h-[22px]' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {
                books?.map((book, idx) => (
                    <BookCard key={idx} book={book} refetch={refetch} />
                ))
            }
        </div>
    );
};

export default Home;