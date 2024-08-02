import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooks = () => {
    const { data: books } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
          const res = await axios.get("/books.json");
          console.log(res.data);
          return res.data;
        },
    });
    
    return [books];
};

export default useBooks;