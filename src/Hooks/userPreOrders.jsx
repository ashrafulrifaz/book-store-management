import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePreOrders = () => {
    const { data: allPreOrders = [], isPending , refetch} = useQuery({
      queryKey: ["allPreOrders"],
      queryFn: async () => {
        const res = await axios.get("https://nstuonlinebookshop-server.vercel.app/pre-orders");
        return res.data;
      },
    });
    
    return [allPreOrders, refetch, isPending];
};

export default usePreOrders;