"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Batch type
type Batch = {
  id: string;
  name: string;
  total: number;
  active: number;
  completed: number;
};

// Helper to generate random number in range
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Batches to exclude
const excludedBatches = ["Batch 2", "Batch 3", "Batch 4", "Batch 5"];

// Build default batches with realistic numbers
const buildDefaultBatches = (): Batch[] => {
  const uniqueBatches = Array.from(new Set(students.map(s => s.batch))).filter(
    batch => !excludedBatches.includes(batch)
  );

  return uniqueBatches.map(batch => {
    const total = randomBetween(400, 500);
    const active = randomBetween(150, total - 50);
    const completed = total - active;

    return {
      id: crypto.randomUUID(),
      name: batch,
      total,
      active,
      completed,
    };
  });
};

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(buildDefaultBatches);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    total: 0,
    active: 0,
    completed: 0,
  });

  // --- CRUD Handlers ---
  const handleAddBatch = () => {
    if (!form.name.trim()) return;

    const active = Math.min(form.active, form.total);
    const completed = Math.min(form.completed, form.total - active);

    setBatches([
      ...batches,
      {
        id: crypto.randomUUID(),
        name: form.name,
        total: form.total,
        active,
        completed,
      },
    ]);

    resetForm();
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingId(batch.id);
    setForm({
      name: batch.name,
      total: batch.total,
      active: batch.active,
      completed: batch.completed,
    });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;

    const active = Math.min(form.active, form.total);
    const completed = Math.min(form.completed, form.total - active);

    setBatches(
      batches.map(b =>
        b.id === editingId
          ? { id: editingId, name: form.name, total: form.total, active, completed }
          : b
      )
    );

    resetForm();
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({ name: "", total: 0, active: 0, completed: 0 });
  };

  // --- Filtering ---
  const filteredBatches = batches.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Batches</h1>
          <p className="page-description">
            Overview of all training batches and student progress
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search batch..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Batch"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Batch Name"
            className="w-full px-3 py-2 border rounded"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Total Students</label>
            <input
              type="number"
              value={form.total}
              onChange={e =>
                setForm({ ...form, total: Math.max(0, Number(e.target.value)) })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Active Students</label>
            <input
              type="number"
              value={form.active}
              onChange={e =>
                setForm({ ...form, active: Math.max(0, Number(e.target.value)) })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Completed Students</label>
            <input
              type="number"
              value={form.completed}
              onChange={e =>
                setForm({ ...form, completed: Math.max(0, Number(e.target.value)) })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddBatch}>Add</Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBatches.map(b => {
          const completionRate =
            b.total > 0 ? Math.round((b.completed / b.total) * 100) : 0;

          return (
            <Card key={b.id} className="p-5 space-y-3 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold">{b.name}</h2>

              <div className="text-sm text-muted-foreground">
                Total Students: <span className="font-medium text-foreground">{b.total}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Active Students: <span className="font-medium text-foreground">{b.active}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Completed Students: <span className="font-medium text-foreground">{b.completed}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Completion Rate: <span className="font-medium text-foreground">{completionRate}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completionRate}%` }} />
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEditBatch(b)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteBatch(b.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
