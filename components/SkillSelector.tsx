'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SelectedSkill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  yearsExperience?: number;
}

interface SkillCategory {
  categoryId: string;
  name: string;
  description: string;
  demandLevel: 'very-high' | 'high' | 'medium' | 'low';
  skills: Array<{ id: string; name: string }>;
}

interface Props {
  taxonomy: SkillCategory[];
  selected: SelectedSkill[];
  onChange: (skills: SelectedSkill[]) => void;
  maxSkills?: number;
}

const DEMAND_BADGE: Record<string, string> = {
  'very-high': 'bg-green-100 text-green-800 border-green-300',
  high: 'bg-blue-100 text-blue-800 border-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  low: 'bg-gray-100 text-gray-700 border-gray-300',
};

const DEMAND_LABEL: Record<string, string> = {
  'very-high': 'Very High Demand',
  high: 'High Demand',
  medium: 'Medium Demand',
  low: 'Low Demand',
};

const LEVEL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export function SkillSelector({ taxonomy, selected, onChange, maxSkills = 20 }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(taxonomy.slice(0, 2).map((c) => c.categoryId)),
  );
  const [levelOverrides, setLevelOverrides] = useState<Map<string, SkillLevel>>(new Map());

  const selectedIds = useMemo(() => new Set(selected.map((s) => s.id)), [selected]);

  function toggleCategory(categoryId: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }

  function toggleSkill(skill: { id: string; name: string }, category: SkillCategory) {
    if (selectedIds.has(skill.id)) {
      onChange(selected.filter((s) => s.id !== skill.id));
    } else {
      if (selected.length >= maxSkills) return;
      const level = levelOverrides.get(skill.id) ?? 'intermediate';
      onChange([...selected, { id: skill.id, name: skill.name, category: category.categoryId, level }]);
    }
  }

  function setSkillLevel(skillId: string, level: SkillLevel) {
    setLevelOverrides((prev) => new Map(prev).set(skillId, level));
    onChange(selected.map((s) => (s.id === skillId ? { ...s, level } : s)));
  }

  return (
    <div className="space-y-3">
      {/* Selection count */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm text-gray-600">
          {selected.length} of {maxSkills} skills selected
        </p>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-sm font-bold text-red-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category accordion */}
      {taxonomy.map((category) => {
        const isExpanded = expandedCategories.has(category.categoryId);
        const selectedInCategory = category.skills.filter((s) => selectedIds.has(s.id)).length;

        return (
          <div key={category.categoryId} className="border-3 border-black bg-white">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(category.categoryId)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="font-black text-base">{category.name}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 border rounded-full ${DEMAND_BADGE[category.demandLevel] ?? ''}`}
                >
                  {DEMAND_LABEL[category.demandLevel]}
                </span>
                {selectedInCategory > 0 && (
                  <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded-full">
                    {selectedInCategory}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 flex-shrink-0" />
              )}
            </button>

            {/* Skills grid */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t-2 border-black pt-3">
                <p className="text-xs font-bold text-gray-500 mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedIds.has(skill.id);
                    return (
                      <div key={skill.id} className="flex flex-col gap-1">
                        <button
                          onClick={() => toggleSkill(skill, category)}
                          disabled={!isSelected && selected.length >= maxSkills}
                          className={`flex items-center gap-2 px-3 py-2 border-2 font-bold text-sm transition-all
                            ${isSelected
                              ? 'bg-black text-white border-black shadow-brutal-sm'
                              : 'bg-white text-black border-black hover:shadow-brutal-sm disabled:opacity-40 disabled:cursor-not-allowed'
                            }`}
                        >
                          {isSelected && <Check className="w-3 h-3 flex-shrink-0" />}
                          {skill.name}
                        </button>
                        {/* Level picker — only shown when selected */}
                        {isSelected && (
                          <select
                            value={levelOverrides.get(skill.id) ?? 'intermediate'}
                            onChange={(e) => setSkillLevel(skill.id, e.target.value as SkillLevel)}
                            className="text-xs font-bold border-2 border-black px-1 py-0.5 bg-white focus:outline-none"
                            aria-label={`Level for ${skill.name}`}
                          >
                            {LEVEL_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
