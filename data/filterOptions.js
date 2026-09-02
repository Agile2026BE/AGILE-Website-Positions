export const minimumSalaryOptions = [
  { value: "75000", label: "$75K+" },
  { value: "100000", label: "$100K+" },
  { value: "125000", label: "$125K+" },
  { value: "150000", label: "$150K+" },
  { value: "175000", label: "$175K+" },
  { value: "200000", label: "$200K+" },
  { value: "225000", label: "$225K+" },
];

export const stateOptions = [
  "California",
  "Colorado",
  "Connecticut",
  "Florida",
  "Massachusetts",
  "New Jersey",
  "New York",
  "North Carolina",
  "Pennsylvania",
];

export const disciplineOptions = [
  "Civil Engineering",
  "Commissioning",
  "Construction Management",
  "Electrical Engineering",
  "ICT/AV Technology",
  "Mechanical HVAC",
  "Mechanical Plumbing and Fire Protection",
  "MEP Executive Leadership",
  "MEP Project Manager",
  "Resident Engineering",
  "Structural Engineering",
];

export const workplaceOptions = ["Hybrid", "Onsite", "Remote"];

// Continuous, non-overlapping experience bands (each year falls in exactly one
// band) used by both the position search filters and the corporate site's
// Salary Calculator, so a deep link between the two always means the same thing.
export const experienceOptions = [
  { value: "1-2", label: "1–2 years", min: 1, max: 2 },
  { value: "3-5", label: "3–5 years", min: 3, max: 5 },
  { value: "6-10", label: "6–10 years", min: 6, max: 10 },
  { value: "11-15", label: "11–15 years", min: 11, max: 15 },
  { value: "16-20", label: "16–20 years", min: 16, max: 20 },
  { value: "21-25", label: "21–25 years", min: 21, max: 25 },
  { value: "26-35", label: "26–35 years", min: 26, max: 35 },
];
