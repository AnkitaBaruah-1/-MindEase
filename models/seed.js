const mongoose = require("mongoose");
const Therapist = require("./therapists");  


const MONGO_URI = "mongodb://127.0.0.1:27017/mindEase";


const therapists = [
  {
    name: "Dr. Shreya Mitra",
    specialization: "Anxiety & Stress",
    experience: "10+ years",
    fees: "Rs 699/session",
    description: "Dr. Shreya helps clients manage anxiety and stress using proven therapeutic techniques.",
    image: "/images/Shreya.png",
  },
  {
    name: "Dr. John Smith",
    specialization: "Depression & Trauma",
    experience: "12+ years",
    fees: "Rs 749/session",
    description: "Dr. John specializes in helping clients recover from depression and trauma.",
    image: "/images/John.png",
  },
  {
    name: "Dr. Rhea Mukherjee",
    specialization: "Relationships",
    experience: "8+ years",
    fees: "Rs 649/session",
    description: "Dr. Rhea helps clients navigate relationship challenges and improve communication.",
    image: "/images/Rhea.png",
  },
  {
    name: "Dr. Dimple Chauhan",
    specialization: "Addiction Recovery",
    experience: "15+ years",
    fees: "Rs 999/session",
    description: "Dr. Dimple specializes in helping individuals recover from addiction.",
    image: "/images/Dimple.png",
  },
  {
    name: "Dr. Keshav Sharma",
    specialization: "Parenting",
    experience: "10+ years",
    fees: "Rs 699/session",
    description: "Dr. Keshav supports parents and families in overcoming challenges with teens.",
    image: "/images/Keshav.png",
  },
  {
    name: "Dr. Rishav Jha",
    specialization: "Career Stress",
    experience: "7+ years",
    fees: "Rs 555/session",
    description: "Dr. Rishav helps clients deal with work-related stress and career challenges.",
    image: "/images/Rishav.png",
  },
  {
    name: "Dr. Sarah Khan",
    specialization: "Eating Disorders",
    experience: "9+ years",
    fees: "Rs 660/session",
    description: "Dr. Sarah helps individuals overcome eating disorders and body image issues.",
    image: "/images/Sarah .png",
  },
  {
    name: "Dr. Steven Clark",
    specialization: "Anger Management",
    experience: "10+ years",
    fees: "Rs 870/session",
    description: "Dr. Steven specializes in managing anger and improving emotional control.",
    image: "/images/Steven .png",
  },
];


const seedDB = async () => {
  try {
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");

    
    await Therapist.deleteMany({});
    await Therapist.insertMany(therapists);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    
    mongoose.connection.close();
  }
};


seedDB();
