"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";

interface SalaryCalculatorProps {
  minSalary: number;
  maxSalary: number;
  careerTitle: string;
}

export function SalaryCalculator({ minSalary, maxSalary, careerTitle }: SalaryCalculatorProps) {
  const [yearsExperience, setYearsExperience] = useState(0);
  const [educationLevel, setEducationLevel] = useState<"bachelor" | "master" | "phd">("bachelor");
  const [location, setLocation] = useState<"kigali" | "other">("kigali");

  // Calculate estimated salary based on inputs
  const calculateEstimatedSalary = () => {
    let baseSalary = minSalary;
    const salaryRange = maxSalary - minSalary;

    // Experience factor (0-10 years, linear growth)
    const experienceFactor = Math.min(yearsExperience / 10, 1);
    baseSalary += salaryRange * experienceFactor * 0.6;

    // Education multiplier
    const educationMultiplier = {
      bachelor: 1.0,
      master: 1.15,
      phd: 1.3,
    };
    baseSalary *= educationMultiplier[educationLevel];

    // Location multiplier (Kigali typically pays 10-15% more)
    if (location === "kigali") {
      baseSalary *= 1.12;
    }

    // Ensure it doesn't exceed max
    return Math.min(baseSalary, maxSalary);
  };

  const estimatedSalary = calculateEstimatedSalary();
  const monthlySalary = estimatedSalary / 12;

  return (
    <div className="bg-white border-3 border-black shadow-brutal-lg">
      <div className="p-6 border-b-3 border-black bg-brutal-orange text-white">
        <h2 className="text-2xl font-black uppercase flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Salary Calculator
        </h2>
        <p className="text-sm font-bold mt-1 opacity-90">
          Estimate your potential earnings as a {careerTitle}
        </p>
      </div>

      <div className="p-6">
        {/* Input Controls */}
        <div className="space-y-6 mb-6">
          {/* Years of Experience */}
          <div>
            <label className="block font-black text-sm uppercase mb-2">
              Years of Experience: {yearsExperience}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
              className="w-full h-3 border-2 border-black appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #000 0%, #000 ${(yearsExperience / 20) * 100}%, #e5e7eb ${(yearsExperience / 20) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs font-bold text-gray-600 mt-1">
              <span>Entry Level</span>
              <span>Mid-Level</span>
              <span>Senior</span>
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block font-black text-sm uppercase mb-2">
              Education Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setEducationLevel("bachelor")}
                className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                  educationLevel === "bachelor"
                    ? "bg-brutal-blue text-white shadow-brutal"
                    : "bg-white hover:shadow-brutal-sm"
                }`}
              >
                Bachelor
              </button>
              <button
                onClick={() => setEducationLevel("master")}
                className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                  educationLevel === "master"
                    ? "bg-brutal-blue text-white shadow-brutal"
                    : "bg-white hover:shadow-brutal-sm"
                }`}
              >
                Master
              </button>
              <button
                onClick={() => setEducationLevel("phd")}
                className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                  educationLevel === "phd"
                    ? "bg-brutal-blue text-white shadow-brutal"
                    : "bg-white hover:shadow-brutal-sm"
                }`}
              >
                PhD
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-black text-sm uppercase mb-2">
              Location
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLocation("kigali")}
                className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                  location === "kigali"
                    ? "bg-brutal-yellow shadow-brutal"
                    : "bg-white hover:shadow-brutal-sm"
                }`}
              >
                Kigali
              </button>
              <button
                onClick={() => setLocation("other")}
                className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                  location === "other"
                    ? "bg-brutal-yellow shadow-brutal"
                    : "bg-white hover:shadow-brutal-sm"
                }`}
              >
                Other Cities
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="border-3 border-black bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-lg font-black uppercase">Estimated Salary</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-black p-4 bg-brutal-yellow">
              <p className="text-sm font-bold mb-1">Annual</p>
              <p className="text-3xl font-black">
                {(estimatedSalary / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs font-bold">RWF per year</p>
            </div>
            <div className="border-2 border-black p-4 bg-brutal-blue text-white">
              <p className="text-sm font-bold mb-1">Monthly</p>
              <p className="text-3xl font-black">
                {(monthlySalary / 1000).toFixed(0)}K
              </p>
              <p className="text-xs font-bold">RWF per month</p>
            </div>
          </div>

          {/* Salary Range Indicator */}
          <div className="mt-6 pt-4 border-t-3 border-black">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>MIN: {(minSalary / 1000000).toFixed(1)}M</span>
              <span>MAX: {(maxSalary / 1000000).toFixed(1)}M</span>
            </div>
            <div className="w-full h-4 bg-gray-200 border-3 border-black relative">
              <div
                className="h-full bg-brutal-green transition-all duration-300"
                style={{
                  width: `${((estimatedSalary - minSalary) / (maxSalary - minSalary)) * 100}%`
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-6 bg-black border-2 border-black"
                style={{
                  left: `${((estimatedSalary - minSalary) / (maxSalary - minSalary)) * 100}%`,
                  transform: "translateX(-50%) translateY(-50%)"
                }}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-4 bg-brutal-yellow bg-opacity-20 border-2 border-black">
          <p className="text-xs font-bold text-gray-700">
            <strong>Note:</strong> This is an estimate based on industry averages in Rwanda. 
            Actual salaries may vary based on company size, specific skills, and market demand.
          </p>
        </div>
      </div>
    </div>
  );
}

