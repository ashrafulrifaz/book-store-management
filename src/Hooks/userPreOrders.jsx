import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePreOrders = () => {
    const { data: preOrders = [], isPending , refetch} = useQuery({
      queryKey: ["allPreOrders"],
      queryFn: async () => {
        const res = await axios.get("http://localhost:3000/pre-orders");
        return res.data
      },
    });
    
    const allPreOrders = preOrders?.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    return [allPreOrders, refetch, isPending];
};

export default usePreOrders;