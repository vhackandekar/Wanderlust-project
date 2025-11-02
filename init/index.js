const mongoose=require('mongoose');
const initdata=require("./data");
const listing=require("../model/listing");

main()
.then(()=>{
    console.log("conneted to db");
}).catch((err)=>{
    console.log(err);
})

async function main()
{
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const categories = [
  "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Amazing pools",
    "Camping",
    "Farms",
    "Arctic",
    "Domes",
    "Boats"
];

const initdb=async()=>{
   await listing.deleteMany();

   await listing.insertMany(initdata.data.map(item => ({
      ...item,
      image: {
         url: item.image.url,
         filename: item.image.filename
      },
      owner:'6903111ecc88c9acde63bb41',
      category: categories[Math.floor(Math.random() * categories.length)]
   })));

}
const show=async()=>{
    const data=await listing.find();
    console.log(data);
}
// initdb();
 show();