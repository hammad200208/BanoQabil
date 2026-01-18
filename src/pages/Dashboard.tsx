import {
  GraduationCap,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { DistrictComparison } from "@/components/dashboard/DistrictComparison";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopPerformers } from "@/components/dashboard/TopPerformers";

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Overview of Bano Qabil 3.0 training program performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="filter-button">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Students"
          value="12,458"
          change={12.5}
          icon={GraduationCap}
        />
        <StatCard
          title="Active Batches"
          value="234"
          change={8.2}
          icon={BookOpen}
        />
        <StatCard
          title="Trainers"
          value="186"
          change={5.1}
          icon={Users}
        />
        <StatCard
          title="Avg. Attendance"
          value="87.3%"
          change={2.4}
          icon={Calendar}
        />
        <StatCard
          title="Completion Rate"
          value="78.5%"
          change={6.8}
          icon={TrendingUp}
        />
        <StatCard
          title="Dropout Rate"
          value="8.2%"
          change={-1.5}
          icon={AlertTriangle}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceChart />
        <DistrictComparison />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <TopPerformers />
      </div>
    </MainLayout>
  );
}
