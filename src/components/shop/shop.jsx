// import { useState, useEffect } from "react";


// function Shoppage() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [query, setQuery] = useState("");
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     // Fetch properties from the backend when the component mounts
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await fetch("http://your-backend-url/properties");
//       const data = await response.json();
//       setProperties(data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const filteredItems = properties.filter(
//     (property) =>
//       property.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );

//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const filteredData = (selected, query) => {
//     let filteredProducts = properties;

//     if (query) {
//       filteredProducts = filteredItems;
//     }

//     if (selected) {
//       filteredProducts = filteredProducts.filter(
//         ({ category, color, company, newPrice, title }) =>
//           category === selected ||
//           color === selected ||
//           company === selected ||
//           newPrice === selected ||
//           title === selected
//       );
//     }

//     return filteredProducts.map(
//       ({ img, title, star, reviews, prevPrice, newPrice }) => (
//         <Card
//           key={Math.random()}
//           img={img}
//           title={title}
//           star={star}
//           reviews={reviews}
//           prevPrice={prevPrice}
//           newPrice={newPrice}
//         />
//       )
//     );
//   };

//   const result = filteredData(selectedCategory, query);

//   const handlePropertyUpload = async (propertyData) => {
//     try {
//       const response = await fetch("http://your-backend-url/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(propertyData),
//       });

//       const data = await response.json();
//       console.log("Property uploaded successfully:", data);

//       // After uploading, fetch the updated list of properties
//       fetchProperties();
//     } catch (error) {
//       console.error("Error uploading property:", error);
//     }
//   };

//   return (
//     <>
//       <Sidebar handleChange={handleChange} />
//       <Navigation query={query} handleInputChange={handleInputChange} />
//       <Recommended handleClick={handleClick} />
//       <Products result={result} />
//       {/* Example form for property upload */}
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           placeholder="Title"
//           // Add other property fields as needed
//         />
//         <button
//           onClick={() =>
//             handlePropertyUpload({
//               title: "New Property", // Get values from form inputs
//               // Include other property details
//             })
//           }
//         >
//           Upload Property
//         </button>
//       </form>
//     </>
//   );
// }

// export default Shoppage;
