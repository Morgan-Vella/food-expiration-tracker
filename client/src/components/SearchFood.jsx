import { useState, useEffect, useContext } from " react";

const SearchFood = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const { search } = useContext(AuthContext);
    const searchFoods = async (q) => {
        if (!q) {
            setResults([]);
            return;
        }

        try {
            const res = await search(q);
            console.log(res)
            setResults(res);
        } catch (err) {
            console.log("Seach error:", err.response?.data || err.message);
        }
    };

    const handleChange = (e) => {
        const text = e.target.value;
        setQuery(text);

        if (typingTimeout) clearTimeout(typingTimeout);

        setTypingTimeout(setTimeout(() => {
            searchFoods(text)
        }, 400));
    };
    return (
        <div style={{ padding: "20px" }}>
            <input type="text" placeholder="Search Foods..." value={query} onChange={handleChange} style={{ padding: "10px", width: "300px", borderRadius: "8px" }} />
            <ul>
                {results.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchFood;