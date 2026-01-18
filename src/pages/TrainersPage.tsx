import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { cn } from "@/lib/utils";

const trainers = [
  {
    id: 1,
    name: "Dr. Farhan Khan",
    email: "farhan.khan@email.com",
    phone: "+92 333 1112233",
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
    name: "Eng. Sadia Afridi",
    email: "sadia.afridi@email.com",
    phone: "+92 334 2223344",
    specialization: "Graphic Design",
    batches: 2,
    students: 52,
    center: "Mingora Campus",
    district: "Swat",
    status: "Active",
    rating: 4.9,
    attendance: 98,
  },
  {
    id: 3,
    name: "Prof. Imran Shah",
    email: "imran.shah@email.com",
    phone: "+92 335 3334455",
    specialization: "Digital Marketing",
    batches: 2,
    students: 48,
    center: "Main Campus",
    district: "Mardan",
    status: "Active",
    rating: 4.6,
    attendance: 94,
  },
  {
    id: 4,
    name: "Ms. Hira Gul",
    email: "hira.gul@email.com",
    phone: "+92 336 4445566",
    specialization: "Mobile App Dev",
    batches: 1,
    students: 28,
    center: "Cantonment Center",
    district: "Abbottabad",
    status: "Active",
    rating: 4.7,
    attendance: 92,
  },
  {
    id: 5,
    name: "Mr. Zahid Ullah",
    email: "zahid.ullah@email.com",
    phone: "+92 337 5556677",
    specialization: "Web Development",
    batches: 2,
    students: 55,
    center: "City Center",
    district: "DI Khan",
    status: "On Leave",
    rating: 4.5,
    attendance: 88,
  },
  {
    id: 6,
    name: "Dr. Nadia Yousaf",
    email: "nadia.yousaf@email.com",
    phone: "+92 338 6667788",
    specialization: "Data Science",
    batches: 2,
    students: 45,
    center: "Main Center",
    district: "Swabi",
    status: "Active",
    rating: 4.9,
    attendance: 99,
  },
];

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "badge-active",
      "On Leave": "bg-warning/10 text-warning",
      Inactive: "badge-inactive",
    };
    return styles[status as keyof typeof styles] || "badge-inactive";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-success";
    if (rating >= 4.5) return "text-primary";
    return "text-warning";
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">Trainers</h1>
          <p className="page-description">
            Manage and monitor all trainers across KPK centers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Trainer</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Total Trainers</p>
              <p className="stat-value">86</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Active Trainers</p>
              <p className="stat-value">78</p>
            </div>
            <div className="p-3 rounded-xl bg-success/10 text-success">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Avg. Rating</p>
              <p className="stat-value">4.7</p>
            </div>
            <div className="p-3 rounded-xl bg-warning/10 text-warning">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Avg. Attendance</p>
              <p className="stat-value">94.5%</p>
            </div>
            <div className="p-3 rounded-xl bg-info/10 text-info">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="stat-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">6</span> of{" "}
            <span className="font-medium text-foreground">86</span> trainers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="border border-border rounded-xl p-5 hover:shadow-card-hover transition-shadow bg-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {trainer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{trainer.name}</h3>
                    <p className="text-sm text-muted-foreground">{trainer.specialization}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{trainer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{trainer.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-muted px-2 py-1 rounded">{trainer.center}</span>
                <span className="text-xs text-muted-foreground">{trainer.district}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{trainer.batches}</p>
                  <p className="text-xs text-muted-foreground">Batches</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{trainer.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <p className={cn("text-lg font-semibold flex items-center justify-center gap-1", getRatingColor(trainer.rating))}>
                    <Star className="w-4 h-4 fill-current" />
                    {trainer.rating}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className={cn("badge-status", getStatusBadge(trainer.status))}>
                  {trainer.status}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Attendance:</span>
                  <span className={cn(
                    "font-medium",
                    trainer.attendance >= 95 ? "text-success" : trainer.attendance >= 90 ? "text-primary" : "text-warning"
                  )}>
                    {trainer.attendance}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <button className="filter-button">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 8, 9].map((page, i) => (
              <button
                key={i}
                className={cn(
                  "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                  page === 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="filter-button">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
