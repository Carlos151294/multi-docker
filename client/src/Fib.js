import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Fib() {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        setValues(values.data);
    }

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(seenIndexes.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index
        });

        setIndex('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={event => setIndex(event.target.value)} />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {
                seenIndexes.map(({ number }, index) => (<span key={index}>{number}, </span>))
            }
            <h3>Calculated values:</h3>
            {
                Object.entries(values).map(([key, value]) => (
                    <div key={key}>
                        For index {key} I calculated {value}
                    </div>
                ))
            }
        </div>
    );

}

export default Fib;