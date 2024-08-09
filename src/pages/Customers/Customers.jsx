import CustomerCard from "../../Components/CusstomerCard/CustomerCard";
import usePreOrders from "../../Hooks/userPreOrders";

const Customers = () => {
    const [allPreOrders] = usePreOrders()
    const RecentOrders = allPreOrders?.sort((a, b) => new Date(b.date) - new Date(a.date))
    

    return (
        <div className="container mt-5 !p-6 customers">
            <h2 className="mb-5">Customers</h2>            
            <div className='grid grid-cols-2 gap-5'>
                {
                    allPreOrders ? 
                    RecentOrders?.map((customer, idx) => (
                            <CustomerCard key={idx} customer={customer} />
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

export default Customers;