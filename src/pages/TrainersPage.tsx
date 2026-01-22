"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Star,
  Trash,
  Edit,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { cn } from "@/lib/utils";
import { trainers as mockTrainers, Trainer } from "@/lib/mockData";

export default function TrainersPage() {
  // --- State ---
  const [trainersData, setTrainersData] = useState<Trainer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    center: "",
    district: "",
    status: "Active" as "Active" | "On Leave" | "Inactive", // type-safe
    rating: 0,
    attendance: 0,
  });

  // --- Load data from localStorage or mock ---
  useEffect(() => {
    const stored = localStorage.getItem("trainers");
    setTrainersData(stored ? JSON.parse(stored) : mockTrainers);
  }, []);

  useEffect(() => {
    localStorage.setItem("trainers", JSON.stringify(trainersData));
  }, [trainersData]);

  // --- Helper Functions ---
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

  const filteredTrainers = trainersData.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingTrainer(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      center: "",
      district: "",
      status: "Active",
      rating: 0,
      attendance: 0,
    });
    setModalOpen(true);
  };

  const openEditModal = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setForm({ ...trainer });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      setTrainersData((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = () => {
  if (editingTrainer) {
    setTrainersData((prev) =>
      prev.map((t) =>
        t.id === editingTrainer.id ? { ...form, id: editingTrainer.id } as Trainer : t
      )
    );
  } else {
    const newTrainer: Trainer = { ...form, id: Date.now() } as Trainer;
    setTrainersData((prev) => [...prev, newTrainer]);
  }
  setModalOpen(false);
};


  // --- JSX ---
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">Trainers</h1>
          <p className="page-description">Manage and monitor all trainers across KPK centers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Trainer</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

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
            Showing <span className="font-medium text-foreground">{filteredTrainers.length}</span> of{" "}
            <span className="font-medium text-foreground">{trainersData.length}</span> trainers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="border border-border rounded-xl p-5 hover:shadow-card-hover transition-shadow bg-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {trainer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{trainer.name}</h3>
                    <p className="text-sm text-muted-foreground">{trainer.specialization}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(trainer)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(trainer.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                </div>
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

              <div className="text-center pt-4 border-t border-border">
                <p className={cn("text-lg font-semibold flex items-center justify-center gap-1", getRatingColor(trainer.rating))}>
                  <Star className="w-4 h-4 fill-current" />
                  {trainer.rating}
                </p>
                <p className="text-xs text-muted-foreground">Rating</p>
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
                  page === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
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

      {/* --- Modal --- */}
{modalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-background p-6 rounded-xl w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">{editingTrainer ? "Edit Trainer" : "Add Trainer"}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm">
          Name
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Phone
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Specialization
          <input
            type="text"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Center
          <input
            type="text"
            value={form.center}
            onChange={(e) => setForm({ ...form, center: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          District
          <input
            type="text"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Rating
          <input
            type="number"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm">
          Attendance %
          <input
            type="number"
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: Number(e.target.value) })}
            className="input-field"
          />
        </label>

        <label className="flex flex-col text-sm sm:col-span-2">
          Status
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "Active" | "On Leave" | "Inactive" })}
            className="input-field"
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setModalOpen(false)} className="filter-button">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          {editingTrainer ? "Update" : "Add"}
        </button>
      </div>
    </div>
  </div>
)}

    </MainLayout>
  );
}
