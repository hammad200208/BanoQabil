"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { students, trainers } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Center type
type Center = {
  id: string;
  name: string;
  studentCount: number;
  trainerCount: number;
};

// Helper to generate random number in range
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Build default centers with realistic numbers
const buildDefaultCenters = (): Center[] => {
  const uniqueCenters = Array.from(
    new Set([
      ...students.map(s => s.center),
      ...trainers.map(t => t.center),
    ])
  );

  return uniqueCenters.map(center => ({
    id: crypto.randomUUID(),
    name: center,
    studentCount: randomBetween(400, 500), // 👈 realistic students
    trainerCount: randomBetween(15, 20),   // 👈 realistic trainers
  }));
};

export default function CentersPage() {
  const [centers, setCenters] = useState<Center[]>(buildDefaultCenters);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    studentCount: 0,
    trainerCount: 0,
  });

  // --- CRUD Handlers ---
  const handleAddCenter = () => {
    if (!form.name.trim()) return;

    setCenters([
      ...centers,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);
    resetForm();
  };

  const handleEditCenter = (center: Center) => {
    setEditingId(center.id);
    setForm({
      name: center.name,
      studentCount: center.studentCount,
      trainerCount: center.trainerCount,
    });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;

    setCenters(centers.map(c =>
      c.id === editingId
        ? { id: editingId, ...form }
        : c
    ));

    resetForm();
  };

  const handleDeleteCenter = (id: string) => {
    setCenters(centers.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: "",
      studentCount: 0,
      trainerCount: 0,
    });
  };

  // --- Filtering ---
  const filteredCenters = centers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Centers</h1>
          <p className="page-description">
            Overview of training centers and participants
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search center..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Center"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Center Name"
            className="w-full px-3 py-2 border rounded"
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Students Count
            </label>
            <input
              type="number"
              value={form.studentCount}
              onChange={e =>
                setForm({
                  ...form,
                  studentCount: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Trainers Count
            </label>
            <input
              type="number"
              value={form.trainerCount}
              onChange={e =>
                setForm({
                  ...form,
                  trainerCount: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddCenter}>Add</Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Centers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCenters.map(c => (
          <Card key={c.id} className="p-5 space-y-2 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold">{c.name}</h2>

            <div className="text-sm text-muted-foreground">
              Students:{" "}
              <span className="font-medium text-foreground">
                {c.studentCount}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Trainers:{" "}
              <span className="font-medium text-foreground">
                {c.trainerCount}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditCenter(c)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteCenter(c.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
