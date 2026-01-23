"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Trade type
type Trade = {
  id: string;
  name: string;
  total: number;
  completed: number;
};

// Helper to generate random number in range
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// IT field trades
const itTrades = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Mobile App Dev",
];

// Build default trades with realistic numbers (IT field only)
const buildDefaultTrades = (): Trade[] => {
  const uniqueTrades = Array.from(new Set(students.map(s => s.trade))).filter(
    trade => itTrades.includes(trade)
  );

  return uniqueTrades.map(trade => {
    const total = randomBetween(400, 500);
    const completed = randomBetween(200, total);

    return {
      id: crypto.randomUUID(),
      name: trade,
      total,
      completed,
    };
  });
};

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>(buildDefaultTrades);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    total: 0,
    completed: 0,
  });

  // --- CRUD Handlers ---
  const handleAddTrade = () => {
    if (!form.name.trim()) return;

    const completed = Math.min(form.completed, form.total);

    setTrades([
      ...trades,
      {
        id: crypto.randomUUID(),
        name: form.name,
        total: form.total,
        completed,
      },
    ]);

    resetForm();
  };

  const handleEditTrade = (trade: Trade) => {
    setEditingId(trade.id);
    setForm({
      name: trade.name,
      total: trade.total,
      completed: trade.completed,
    });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;

    const completed = Math.min(form.completed, form.total);

    setTrades(trades.map(t =>
      t.id === editingId
        ? { id: editingId, name: form.name, total: form.total, completed }
        : t
    ));

    resetForm();
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: "",
      total: 0,
      completed: 0,
    });
  };

  // --- Filtering ---
  const filteredTrades = trades.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Trades / Courses</h1>
          <p className="page-description">
            Overview of all training trades and student progress
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search trade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Trade"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Trade Name"
            className="w-full px-3 py-2 border rounded"
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Total Students
            </label>
            <input
              type="number"
              value={form.total}
              onChange={e =>
                setForm({
                  ...form,
                  total: Math.max(0, Number(e.target.value)),
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Completed Students
            </label>
            <input
              type="number"
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

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddTrade}>Add</Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Trades Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrades.map(t => {
          const completionRate =
            t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;

          return (
            <Card key={t.id} className="p-5 space-y-3 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold">{t.name}</h2>

              <div className="text-sm text-muted-foreground">
                Total Students:{" "}
                <span className="font-medium text-foreground">
                  {t.total}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Completed:{" "}
                <span className="font-medium text-foreground">
                  {t.completed}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Completion Rate:{" "}
                <span className="font-medium text-foreground">
                  {completionRate}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditTrade(t)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteTrade(t.id)}
                >
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
