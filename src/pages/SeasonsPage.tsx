"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Status options
const statuses = ["Active", "Completed", "Dropped"] as const;
type Status = typeof statuses[number];

// Seasons type
type Season = {
  id: string;
  name: string;
  total: number;
  active: number;
  completed: number;
  dropped: number;
  status: Status;
  phase: string;
};

// Default seasons
const defaultSeasons: Season[] = [
  {
    id: "1",
    name: "Spring 2026",
    total: 30,
    active: 20,
    completed: 8,
    dropped: 2,
    status: "Active",
    phase: "Module 1",
  },
  {
    id: "2",
    name: "Summer 2026",
    total: 25,
    active: 15,
    completed: 8,
    dropped: 2,
    status: "Active",
    phase: "Module 2",
  },
  {
    id: "3",
    name: "Fall 2026",
    total: 20,
    active: 10,
    completed: 8,
    dropped: 2,
    status: "Active",
    phase: "Module 3",
  },
];

export default function SeasonsPage() {
  const [seasons, setSeasons] = useState<Season[]>(defaultSeasons);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
  const [phaseFilter, setPhaseFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    total: 0,
    active: 0,
    completed: 0,
    dropped: 0,
    status: "Active" as Status,
    phase: "Module 1",
  });

  // 🔁 Auto-calc total
  useEffect(() => {
    const sum = form.active + form.completed + form.dropped;
    setForm(prev => ({ ...prev, total: sum }));
  }, [form.active, form.completed, form.dropped]);

  // ⚠️ Validation
  useEffect(() => {
    if (form.active < 0 || form.completed < 0 || form.dropped < 0) {
      setError("Values cannot be negative");
      return;
    }

    if (form.total !== form.active + form.completed + form.dropped) {
      setError("Total must equal Active + Completed + Dropped");
      return;
    }

    setError("");
  }, [form]);

  // --- Handlers ---
  const handleAdd = () => {
    if (!form.name.trim() || error) return;
    setSeasons([...seasons, { id: crypto.randomUUID(), ...form }]);
    resetForm();
  };

  const handleEdit = (season: Season) => {
    setEditingId(season.id);
    setForm({ ...season });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim() || error) return;
    setSeasons(seasons.map(s => (s.id === editingId ? { id: editingId, ...form } : s)));
    resetForm();
  };

  const handleDelete = (id: string) =>
    setSeasons(seasons.filter(s => s.id !== id));

  const resetForm = () => {
    setForm({
      name: "",
      total: 0,
      active: 0,
      completed: 0,
      dropped: 0,
      status: "Active",
      phase: "Module 1",
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // --- Filtering ---
  const filteredSeasons = seasons.filter(s => {
    const matchStatus = statusFilter ? s.status === statusFilter : true;
    const matchPhase = phaseFilter ? s.phase === phaseFilter : true;
    return matchStatus && matchPhase;
  });

  // --- Unique phases for filter dropdown ---
  const uniquePhases = Array.from(new Set(seasons.map(s => s.phase)));

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Seasons</h1>
          <p className="page-description">
            Manage training seasons (Bano Qabil KPK)
          </p>
        </div>

        {/* Filters & Add */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as "" | Status)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={phaseFilter}
            onChange={e => setPhaseFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Phases</option>
            {uniquePhases.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Season"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            placeholder="Season Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />

          {/* Total Students (auto) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Students (Auto)
            </label>
            <input
              type="number"
              value={form.total}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Active Students */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Active Students
            </label>
            <input
              type="number"
              placeholder="e.g., 20"
              value={form.active}
              onChange={e =>
                setForm({ ...form, active: Math.max(0, Number(e.target.value)) })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Completed Students */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Completed Students
            </label>
            <input
              type="number"
              placeholder="e.g., 8"
              value={form.completed}
              onChange={e =>
                setForm({
                  ...form,
                  completed: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Dropped Students */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Dropped Students
            </label>
            <input
              type="number"
              placeholder="e.g., 2"
              value={form.dropped}
              onChange={e =>
                setForm({
                  ...form,
                  dropped: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          <select
            value={form.status}
            onChange={e =>
              setForm({ ...form, status: e.target.value as Status })
            }
            className="w-full px-3 py-2 border rounded"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={form.phase}
            onChange={e => setForm({ ...form, phase: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            {["Module 1", "Module 2", "Module 3"].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit} disabled={!!error}>
                Save
              </Button>
            ) : (
              <Button onClick={handleAdd} disabled={!!error}>
                Add
              </Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Seasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeasons.map(season => (
          <Card
            key={season.id}
            className="p-5 space-y-2 shadow-lg border rounded-lg hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold">{season.name}</h2>
            <div>Status: {season.status}</div>
            <div>Phase: {season.phase}</div>
            <div>Total Students: {season.total}</div>
            <div>Active: {season.active}</div>
            <div>Completed: {season.completed}</div>
            <div>Dropped: {season.dropped}</div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: season.total
                    ? `${Math.round(
                        (season.completed / season.total) * 100
                      )}%`
                    : "0%",
                }}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(season)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(season.id)}
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
