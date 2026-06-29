"use client";

import Link from "next/link";
import Image from "next/image";
import { Developer } from "@/types";

// ===== PROPS TYPE =====
interface UserCardProps {
  developer: Developer;
}

export default function UserCard({ developer }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
      {/* HEADER — avatar + name + location */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={developer.avatar}
          alt={developer.name}
          width={44}
          height={44}
          className="rounded-full bg-gray-100"
          unoptimized
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
            {developer.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            📍 {developer.location}
          </p>
        </div>
      </div>

      {/* BIO */}
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {developer.bio}
      </p>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-1 mb-3">
        {developer.skills.map((skill) => (
          <span
            key={skill.name}
            className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* FOOTER — availability + view profile */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <span
          className={`text-xs font-medium flex items-center gap-1 ${
            developer.available
              ? "text-green-600 dark:text-green-400"
              : "text-gray-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              developer.available ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          {developer.available ? "Available" : "Not available"}
        </span>

        <Link
          href={`/developers/${developer.id}`}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View profile →
        </Link>
      </div>
    </div>
  );
}
