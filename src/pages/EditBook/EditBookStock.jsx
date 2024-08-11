
const EditBookStock = ({stock, setStock, index}) => {
    const {inStock} = stock || {}
    const editionOptions = [
        { value: 'common', label: 'common' },
        { value: 'latest', label: 'latest' },
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        ...Array.from({ length: 27 }, (_, i) => ({ value: `${i + 3}th`, label: `${i + 4}th` })),
    ];    

    const conditionOptions = [
        { value: 'new', label: 'new' },
        { value: 'old', label: 'old' }
    ]

    const handleStockNum = (e) => {
        console.log(e.target, e.target.value);
        
        const updatedStock = { ...stock, inStock: parseInt(e.target.value) };
        setStock((prevStock) => {
            const newStock = [...prevStock];
            newStock[index] = updatedStock;
            return newStock;
        });
    };

    const handleEdition = (e) => {
        const updatedStock = { ...stock, edition: e.target.value };
        setStock((prevStock) => {
            const newStock = [...prevStock];
            newStock[index] = updatedStock;
            return newStock;
        });
    };

    const handleCondition = (e) => {
        const updatedStock = { ...stock, condition: e.target.value };
        setStock((prevStock) => {
            const newStock = [...prevStock];
            newStock[index] = updatedStock;
            return newStock;
        });
    }; 

    return (
        <div className="p-4 border-2 rounded-xl bg-baground mb-3 md:mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                <div>
                    <label>Edition</label>
                    <select onChange={(e) => handleEdition(e, index)} defaultValue={stock?.edition} >
                        {
                            editionOptions?.map((edition, idx) => (
                                <option key={idx} value={`${edition?.value || 'common'}`}>{edition?.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Condition</label>
                    <select onChange={(e) => handleCondition(e, index)} defaultValue={stock?.condition}>
                        {
                            conditionOptions?.map((condition, idx) => (
                                <option key={idx} value={`${condition?.value || 'new'}`}>{condition?.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Stock</label>
                    <input type="number" className="!py-2.5" required placeholder="Enter book name here" onChange={(e) => handleStockNum(e, index)} value={inStock} />
                </div>
            </div>
        </div>
    );
};

export default EditBookStock;