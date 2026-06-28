import { Skill, SkillLevel } from "@/types";

// ===== LEVEL COLOR MAP =====
const levelColors: Record<SkillLevel, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  expert: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

// ===== PROPS TYPE =====
interface SkillBadgeProps {
  skill: Skill;
  showLevel?: boolean;
}

export default function SkillBadge({
  skill,
  showLevel = true,
}: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        showLevel
          ? levelColors[skill.level]
          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      {skill.name}
      {showLevel && <span className="opacity-60">· {skill.level}</span>}
    </span>
  );
}
