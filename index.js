const fs = require("fs");
const http = require("http");
const url = require("url");
/////////////////////////////////////////////////////////////
//  FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!')

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if(err) return(console.log("ERROR💣🎇🔥"))

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('File has been written🥰😁')
//       })
//     });
//   });
// });

// console.log("Will read file");

/////////////////////////////////////////////////////////////
//  SERVER
try{


const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempOverview);

    // Product page
  } else if (pathName === "/product") {
    res.end(tempProduct);

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT_FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
  res.end("Hello fron the Server World!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
} catch(error) {
  console.log("Error reading file: ", error);
}
// \\///






// if (billerSlug === "SMARTER_GRID") {
//   const smarterGridProducts = productPackage.filter(
//     (product) => product.billerId === smarterGridBillerId
//   );
//   const productIndex = Math.floor(
//     Math.random() * smarterGridProducts.length
//   );
//   const smarterGridProduct = smarterGridProducts[productIndex];
//   productName = smarterGridProduct.slug;
// } else if (billerSlug === "LUMOS") {
//   const lumosProducts = productPackage.filter(
//     (product) => product.billerId === lumosBillerId
//   );
//   const productIndex = Math.floor(Math.random() * lumosProducts.length);
//   const lumosProduct = lumosProducts[productIndex];
//   productName = lumosProduct.slug;
// } else if (billerSlug === "CEL_ELECTRIC") {
//   productName = "CEL_PREPAID";
// } else if (billerSlug === "BH_ELECTRIC") {
//   productName = "BH_PREPAID";
// } else if (billerSlug === "CLOUD_ENERGY") {
//   productName = "CLOUD_ENERGY_PAYGO";
// } else if (billerSlug === "PRIVIDA") {
//   productName = "PRIVIDA";
// } else if (billerSlug === "PHEDC") {
//   productName = `PHED_${verificationRequest.type}`;
// } else if (billerSlug === "EEDC") {
//   productName = `ENUGU_${verificationRequest.type}`;
// } else if (billerSlug === "KADUNA_ELECTRIC") {
//   productName = `KAEDCO_${verificationRequest.type}`;
// } else {
//   productName = `${billerSlug}_${verificationRequest.type}`;
// }

// Smart Example
// if (billerSlug === "SMARTER_GRID") {
//   // Filter the productPackage array to find products with the specified billerId
//   const smarterGridProducts = productPackage.filter(product => product.billerId === 130);

//   // Here, you can define your criteria to select the desired product dynamically
//   // For example, you could randomly select a product or select based on some other criteria
//   const randomIndex = Math.floor(Math.random() * smarterGridProducts.length);
//   const desiredProductSlug = smarterGridProducts[randomIndex].slug; // Dynamically select product slug

//   // Find the product with the desired slug
//   const desiredProduct = smarterGridProducts.find(product => product.slug === desiredProductSlug);

//   if (desiredProduct) {
//     productName = desiredProduct.slug;
//   } else {
//     // Handle case where desired product is not found
//     // You can set a default value or throw an error
//     productName = "DEFAULT_PRODUCT"; // Set a default value
//   }