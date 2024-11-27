// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Admin.css'

// const Admin = () => {
//     const [info, setInfo] = useState([]); 

//     useEffect(() => {
//         const getData = async () => {
           
//                   await axios.get('http://127.0.0.1:5000/check').then((res)=>{
                      
//                       setInfo(res.data); // Update state with fetched data
//                       console.log('Fetched data:', res.data); // Log the actual data received
//                       console.log('Fetching data...'); // Log fetching message
//                   }).catch((err)=>{
//                     console.log(err);
//                   })
            
//         };
//         getData();
//     }, []); // Empty dependency array means this effect runs once on mount

//     return (
//         <div>
//             <h2>Good day Shopkeeper</h2>
//             <h4>See orders</h4>

//             {/* Display info */}
//             <p>{info.length}</p>
//             {info.map((ele, ind) => (
//                 <div key={ind}>
//                     {Object.keys(ele).map((key) => (
//                         <p key={key}>{`${key}: ${ele[key]}`}</p>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Admin;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file

const Admin = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await axios.get('https://pizzashop-2.onrender.com/check').then((res) => {
                setInfo(res.data); // Update state with fetched data
                console.log('Fetched data:', res.data); // Log the actual data received
                console.log('Fetching data...'); // Log fetching message
            }).catch((err) => {
                console.log(err);
            });
        };
        getData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="container">
            <h2>Good day Shopkeeper</h2>
            <h4>See orders</h4>

            {/* Display info */}
            <p>{info.length}</p>
            {/* {info.map((ele, ind) => (
                <div key={ind} className="order-item">
                    {Object.keys(ele).map((key) => (
                        <p key={key}>{`${key}: ${ele[key]}`}</p>
                    ))}
                </div>
            ))} */}



{info.map((ele, ind) => (
   <div key={ind} style={{
    border: '1px solid #ccc', 
    padding: '20px', 
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    margin: '10px', 
    maxWidth: '300px',
    textAlign: 'left'
  }}>
    <h3 style={{ marginBottom: '15px' }}>Pizza Order</h3>
    <p><strong>Pizza 1:</strong> {ele.pizza1}</p>
    <p><strong>Pizza 2:</strong> {ele.pizza2}</p>
    <p><strong>Pizza 3:</strong> {ele.pizza3}</p>
    <p><strong>Pizza 4:</strong> {ele.pizza4}</p>
    <p><strong>Address:</strong> {ele.address}</p>
</div>

))}
        </div>
    );
};

export default Admin;
