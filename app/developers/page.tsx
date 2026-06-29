"use client";

import { useState, useMemo } from "react";
import { mockDevelopers } from "@/data/mockDevelopers";
import { Developer, SearchFilters } from "@/types";
import UserCard from "@/components/UserCard";
import useDebounce from "@/hooks/useDebounce";

export default function DevelopersPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    skills: "",
    availableOnly: false,
  });

  const debouncedQuery = useDebounce(filters.query, 300);

  // ===== ALL UNIQUE SKILLS FOR DROPDOWN =====
  const allSkills = useMemo(() => {
    const skills = mockDevelopers.flatMap((dev) =>
      dev.skills.map((s) => s.name),
    );
    return ["", ...Array.from(new Set(skills))];
  }, []);

  // ===== FILTERED DEVELOPERS =====
  const filtered = useMemo(() => {
    return mockDevelopers.filter((dev: Developer) => {
      const matchesQuery = dev.name
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());

      const matchesSkill = filters.skills
        ? dev.skills.some((s) => s.name === filters.skills)
        : true;

      const matchesAvailable = filters.availableOnly
        ? dev.available === true
        : true;

      return matchesQuery && matchesSkill && matchesAvailable;
    });
  }, [debouncedQuery, filters.skills, filters.availableOnly]);

  return (
    <div>
      {/* HEADING */}
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-1">
        Find developers
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Browse and search registered developers by skill or name
      </p>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilters((prev) => ({ ...prev, query: e.target.value }))
          }
          className="flex-1 min-w-45 px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* SKILL FILTER */}
        <select
          value={filters.skills}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilters((prev) => ({ ...prev, skill: e.target.value }))
          }
          className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill === "" ? "All skills" : skill}
            </option>
          ))}
        </select>

        {/* AVAILABLE TOGGLE */}
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({
                ...prev,
                availableOnly: e.target.checked,
              }))
            }
            className="accent-indigo-600 w-4 h-4"
          />
          Available only
        </label>
      </div>

      {/* RESULTS COUNT */}
      <p className="text-xs text-gray-400 mb-4">
        {filtered.length} developer{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* DEVELOPER GRID */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dev) => (
            <UserCard key={dev.id} developer={dev} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">
            No developers found. Try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
