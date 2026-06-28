// Skill
export type SkillLevel = "beginner" | "intermediate" | "expert";

export interface Skill {
  name: string;
  level: SkillLevel;
}

// Developer

export interface Developer {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  location: string;
  skills: Skill[];
  available: boolean;
  joinedAt: string;
}

// Register form

export interface RegisterFormData {
  name: string;
  email: string;
  bio: string;
  skills: string[];
  available: boolean;
}

// Form Errors
export interface FromErrors {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  skills?: string;
}

// Search & Filters
export interface SearchFilters {
  query: string;
  skills: string;
  availableOnly: boolean;
}
