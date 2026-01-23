// src/lib/mockData.ts

export type Student = {
  id: number;
  name: string;
  email: string;
  phone: string;
  trade: string;
  batch: string;
  center: string;
  district: string;
  status: "Active" | "Dropped" | "Completed";
  attendance: number;
  performance: number;
  phase?: string;  
  season?: string;
  program?: string;
  region?: string;
};

export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  batches: number;
  students: number;
  center: string;
  district: string;
  status: "Active" | "On Leave" | "Inactive";
  rating: number;
  attendance: number;
}

// Helper function to generate students
const generateStudents = (): Student[] => {
  const trades = ["Web Development", "Graphic Design", "Digital Marketing", "Mobile App Dev", "Electrical", "Plumbing", "Carpentry", "Welding"];
  const centers = ["University Town Center", "Mingora Campus", "Main Campus", "City Center", "Cantonment Center", "Karachi", "Lahore", "Islamabad", "Faisalabad"];
  const districts = ["Peshawar", "Swat", "Mardan", "DI Khan", "Abbottabad", "Karachi", "Lahore", "Islamabad", "Faisalabad"];
  const regions = ["North KPK", "South KPK"];
  const statuses: ("Active" | "Dropped" | "Completed")[] = ["Active", "Active", "Active", "Dropped", "Completed"];
  const phases = ["Phase 1", "Phase 2", "Phase 3"];
  const seasons = ["Spring 2026", "Summer 2026", "Winter 2026", "Autumn 2026"];
  const programs = ["Bano Qabil KPK"];
  const firstNames = ["Muhammad", "Ayesha", "Saeed", "Zainab", "Usman", "Fatima", "Aisha", "Bilal", "Sadia", "Hamza", "Hina", "Shahbaz", "Maryam", "Ali", "Hassan", "Rana", "Sara", "Ahmed", "Omar", "Laiba", "Hassan", "Faisal", "Nimra", "Imran", "Amina", "Tariq", "Hafsa", "Karim", "Zehra", "Rashid"];
  const lastNames = ["Khan", "Gul", "Ahmad", "Shah", "Ali", "Noor", "Malik", "Ahmed", "Tariq", "Saeed", "Qadir", "Iqbal", "Hassan", "Raza", "Hussain", "Ahmed", "Iqbal", "Mahmood", "Zaman", "Mirza"];

  const students: Student[] = [];
  
  // Map districts to regions
  const districtToRegion: { [key: string]: string } = {
    "Peshawar": "North KPK",
    "Swat": "North KPK",
    "Mardan": "North KPK",
    "DI Khan": "South KPK",
    "Abbottabad": "North KPK",
    "Karachi": "South KPK",
    "Lahore": "South KPK",
    "Islamabad": "North KPK",
    "Faisalabad": "South KPK",
  };
  
  // Generate 280 students with distribution:
  // Phase 1: 100 students
  // Phase 2: 100 students
  // Phase 3: 80 students
  let id = 1;
  
  // Phase 1 students (100)
  for (let i = 0; i < 100; i++) {
    const seasonOptions = ["Spring 2026", "Summer 2026", "Winter 2026", "Autumn 2026"];
    const district = districts[i % districts.length];
    students.push({
      id: id++,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      email: `student${id}@email.com`,
      phone: `+92 ${300 + (i % 100)} ${1000000 + i}`,
      trade: trades[i % trades.length],
      batch: `BQKPK-${i + 1}`,
      center: centers[i % centers.length],
      district: district,
      region: districtToRegion[district],
      program: programs[0],
      status: statuses[i % statuses.length],
      attendance: 45 + Math.floor(Math.random() * 55),
      performance: 40 + Math.floor(Math.random() * 60),
      phase: "Phase 1",
      season: seasonOptions[i % seasonOptions.length],
    });
  }
  
  // Phase 2 students (100)
  for (let i = 0; i < 100; i++) {
    const seasonOptions = ["Spring 2026", "Summer 2026", "Winter 2026", "Autumn 2026"];
    const district = districts[i % districts.length];
    students.push({
      id: id++,
      name: `${firstNames[i % firstNames.length]} ${lastNames[(i + 5) % lastNames.length]}`,
      email: `student${id}@email.com`,
      phone: `+92 ${300 + (i % 100)} ${1000000 + i}`,
      trade: trades[i % trades.length],
      batch: `BQKPK-${i + 100}`,
      center: centers[i % centers.length],
      district: district,
      region: districtToRegion[district],
      program: programs[0],
      status: statuses[i % statuses.length],
      attendance: 45 + Math.floor(Math.random() * 55),
      performance: 40 + Math.floor(Math.random() * 60),
      phase: "Phase 2",
      season: seasonOptions[i % seasonOptions.length],
    });
  }
  
  // Phase 3 students (80)
  for (let i = 0; i < 80; i++) {
    const seasonOptions = ["Spring 2026", "Summer 2026", "Winter 2026", "Autumn 2026"];
    const district = districts[i % districts.length];
    students.push({
      id: id++,
      name: `${firstNames[i % firstNames.length]} ${lastNames[(i + 10) % lastNames.length]}`,
      email: `student${id}@email.com`,
      phone: `+92 ${300 + (i % 100)} ${1000000 + i}`,
      trade: trades[i % trades.length],
      batch: `BQKPK-${i + 200}`,
      center: centers[i % centers.length],
      district: district,
      region: districtToRegion[district],
      program: programs[0],
      status: statuses[i % statuses.length],
      attendance: 45 + Math.floor(Math.random() * 55),
      performance: 40 + Math.floor(Math.random() * 60),
      phase: "Phase 3",
      season: seasonOptions[i % seasonOptions.length],
    });
  }
  
  return students;
};

export const students: Student[] = generateStudents();

export const trainers: Trainer[] = [
  {
    id: 1,
    name: "Imran Sheikh",
    email: "imran.sheikh@email.com",
    phone: "+92 300 1234567",
    specialization: "Web Development",
    batches: 3,
    students: 75,
    center: "University Town Center",
    district: "Peshawar",
    status: "Active",
    rating: 4.8,
    attendance: 96,
  },
  {
    id: 2,
    name: "Hina Malik",
    email: "hina.malik@email.com",
    phone: "+92 301 2345678",
    specialization: "Artificial Intelligence",
    batches: 2,
    students: 50,
    center: "City Center",
    district: "Mardan",
    status: "Active",
    rating: 4.9,
    attendance: 98,
  },
  {
    id: 3,
    name: "Faisal Raza",
    email: "faisal.raza@email.com",
    phone: "+92 302 3456789",
    specialization: "Data Science",
    batches: 1,
    students: 40,
    center: "Main Campus",
    district: "Swat",
    status: "On Leave",
    rating: 4.7,
    attendance: 92,
  },
];

export const stats = {
  totalStudents: students.length,
  totalTrainers: trainers.length,
  avgPerformance: Math.round(
    students.reduce((sum, s) => sum + s.performance, 0) / students.length
  ),
};

export const recentActivity = [
  { id: 1, text: "Muhammad Bilal enrolled in Web Development" },
  { id: 2, text: "Ayesha Gul completed AI Module 1" },
  { id: 3, text: "Saeed Ahmad joined Data Science track" },
];
