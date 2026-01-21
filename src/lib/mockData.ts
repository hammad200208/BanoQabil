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

export const students: Student[] = [
  {
    id: 1,
    name: "Muhammad Bilal",
    email: "bilal.khan@email.com",
    phone: "+92 333 1234567",
    trade: "Web Development",
    batch: "BQKPK-WD-001",
    center: "University Town Center",
    district: "Peshawar",
    status: "Active",
    attendance: 92,
    performance: 85,
  },
  {
    id: 2,
    name: "Ayesha Gul",
    email: "ayesha.gul@email.com",
    phone: "+92 334 2345678",
    trade: "Graphic Design",
    batch: "BQKPK-GD-002",
    center: "Mingora Campus",
    district: "Swat",
    status: "Active",
    attendance: 88,
    performance: 91,
  },
  {
    id: 3,
    name: "Saeed Ahmad",
    email: "saeed.a@email.com",
    phone: "+92 335 3456789",
    trade: "Digital Marketing",
    batch: "BQKPK-DM-001",
    center: "Main Campus",
    district: "Mardan",
    status: "Active",
    attendance: 95,
    performance: 78,
  },
  {
    id: 4,
    name: "Zainab Shah",
    email: "zainab.s@email.com",
    phone: "+92 336 4567890",
    trade: "Web Development",
    batch: "BQKPK-WD-003",
    center: "City Center",
    district: "DI Khan",
    status: "Dropped",
    attendance: 45,
    performance: 52,
  },
  {
    id: 5,
    name: "Usman Ali",
    email: "usman.ali@email.com",
    phone: "+92 337 5678901",
    trade: "Mobile App Dev",
    batch: "BQKPK-MA-001",
    center: "Cantonment Center",
    district: "Abbottabad",
    status: "Active",
    attendance: 89,
    performance: 82,
  },
  {
    id: 6,
    name: "Fatima Noor",
    email: "fatima.n@email.com",
    phone: "+92 338 6789012",
    trade: "Graphic Design",
    batch: "BQKPK-GD-001",
    center: "University Town Center",
    district: "Peshawar",
    status: "Completed",
    attendance: 97,
    performance: 94,
  },
];

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
