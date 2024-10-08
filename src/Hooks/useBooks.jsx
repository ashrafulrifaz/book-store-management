import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooks = () => {
    const { data: allBooks = [], isPending , refetch} = useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await axios.get("https://nstuonlinebookshop-server.vercel.app/all-books");
        return res.data;
      },
    });
    
    return [allBooks, refetch, isPending];
};

export default useBooks;