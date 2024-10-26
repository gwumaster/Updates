// // Simulate an asynchronous function (e.g., fetching data from an API)
// function fetchData() {
//     const data = { id: 1, name: 'Sample Data' };
//     return data;
//   }
  
//   // Function that uses async/await to get the data
//   async function getData() {
//     console.log("Fetching data...");
    
//     try {
//       const result = await fetchData();  // Wait for the data to be fetched
//       console.log("Data received:", result);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   }
  
//   // Call the function
//   getData();
  

const car1 = {
  brand: "Benz",
  model: "250D",
  year: 2024,
  start() {
    console.log("This car is something crazy!!!");
  }
};
car1.start();

// -----------------------------------------------------

const car2 = {
  brand: "Mercedes Benz",
  model: "250D",
  year: 2024,
  start() {
    console.log(`The ${this.brand} ${this.model} has started in the ${this.year}.`);
  }
};

car2.start();
