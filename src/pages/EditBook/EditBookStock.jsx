const EditBookStock = ({ stock, setStock, index }) => {
    const { inStock = 0, location = '', edition = 'common', condition = 'new' } = stock || {};

    const editionOptions = [
        { value: 'common', label: 'common' },
        { value: 'latest', label: 'latest' },
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        ...Array.from({ length: 27 }, (_, i) => ({ value: `${i + 4}th`, label: `${i + 4}th` })),
    ];

    const conditionOptions = [
        { value: 'new', label: 'new' },
        { value: 'old', label: 'old' },
    ];

    const handleStockChange = (field, value) => {
        setStock((prevStock) => {
            const newStock = [...prevStock];
            newStock[index] = { ...newStock[index], [field]: value };
            return newStock;
        });
    };

    return (
        <div className="p-4 border-2 rounded-xl bg-background mb-3 md:mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                    <label>Edition</label>
                    <select value={edition} onChange={(e) => handleStockChange("edition", e.target.value ? e.target.value : 'common')}>
                        {editionOptions.map((option, optionIdx) => (
                            <option key={optionIdx} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Condition</label>
                    <select value={condition} onChange={(e) => handleStockChange("condition", e.target.value ? e.target.value : 'new')}>
                        {conditionOptions.map((option, optionIdx) => (
                            <option key={optionIdx} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        className="!py-2.5"
                        required
                        placeholder="Enter book stock here"
                        onChange={(e) => handleStockChange("inStock", parseInt(e.target.value))}
                        value={inStock}
                    />
                </div>
                <div>
                    <label>Book Location</label>
                    <input
                        type="text"
                        className="!py-2.5"
                        placeholder="Enter book location here"
                        onChange={(e) => handleStockChange("location", e.target.value)}
                        value={location}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditBookStock;
