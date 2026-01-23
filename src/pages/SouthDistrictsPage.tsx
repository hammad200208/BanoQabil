"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { students, trainers } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// District type
type District = {
  id: string;
  name: string;
  studentCount: number;
  trainerCount: number;
};

// Helper to generate random number in range
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Build south districts from mock data
const buildSouthDistricts = (): District[] => {
  const southDistrictNames = ["South", "DI Khan"];
  
  const uniqueSouthDistricts = Array.from(
    new Set([
      ...students
        .filter(s => southDistrictNames.includes(s.district))
        .map(s => s.district),
      ...trainers
        .filter(t => southDistrictNames.includes(t.district))
        .map(t => t.district),
    ])
  );

  return uniqueSouthDistricts.map(district => ({
    id: crypto.randomUUID(),
    name: district,
    studentCount: randomBetween(400, 500),
    trainerCount: randomBetween(15, 20),
  }));
};

export default function SouthDistrictsPage() {
  const [districts, setDistricts] = useState<District[]>(buildSouthDistricts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    studentCount: 0,
    trainerCount: 0,
  });

  // --- CRUD Handlers ---
  const handleAddDistrict = () => {
    if (!form.name.trim()) return;

    setDistricts([
      ...districts,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);
    resetForm();
  };

  const handleEditDistrict = (district: District) => {
    setEditingId(district.id);
    setForm({
      name: district.name,
      studentCount: district.studentCount,
      trainerCount: district.trainerCount,
    });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;

    setDistricts(districts.map(d =>
      d.id === editingId
        ? { id: editingId, ...form }
        : d
    ));

    resetForm();
  };

  const handleDeleteDistrict = (id: string) => {
    setDistricts(districts.filter(d => d.id !== id));
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
  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">South Districts</h1>
          <p className="page-description">
            Overview of training districts in South region and participants
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search district..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add District"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="District Name"
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
                setForm({ ...form, studentCount: Math.max(0, Number(e.target.value)) })
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
                setForm({ ...form, trainerCount: Math.max(0, Number(e.target.value)) })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddDistrict}>Add</Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Districts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDistricts.map(d => (
          <Card key={d.id} className="p-5 space-y-2 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold">{d.name}</h2>

            <div className="text-sm text-muted-foreground">
              Students:{" "}
              <span className="font-medium text-foreground">
                {d.studentCount}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Trainers:{" "}
              <span className="font-medium text-foreground">
                {d.trainerCount}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditDistrict(d)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteDistrict(d.id)}
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
