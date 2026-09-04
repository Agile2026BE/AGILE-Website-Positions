# AGILE Careers — FINAL TRUTH BASELINE — September 3, 2026, 21:34 EDT

## Status

This supersedes the [19:26 EDT baseline](CAREERS_FINAL_TRUTH_BASELINE_2026-09-03.md) from earlier the same day. Every row below was regenerated directly from the production source code at this timestamp.

Baseline code commit:

`ab98ad4` — "Add missing real datePosted for 1149 and 1150," branch `main`.

Repository:

`Agile2026BE/AGILE-Website-Positions`

Production domain:

`https://www.agileconsultingsolutions.com/careers`

Total records: **202** — **164 Active**, **30 Dormant**, **8 Terminated** (unchanged from the 19:26 baseline — no position's live/dormant/terminated status changed since then).

## What changed since the 19:26 EDT baseline

All six of these were found during a full-site audit and are already live in production:

1. **29 positions' credential field corrected** from a fabricated placeholder value, "PE mentioned," to "PE required" or "PE preferred" — read directly from each position's own qualifications text, nothing guessed. Commit `2055757`.
2. **Similar Positions logic fixed** so same-discipline candidates always rank before cross-discipline ones, regardless of market-tag overlap. An Electrical Engineer position had been recommending a Mechanical role. Commit `5c390a8`.
3. **Unsupported "Transportation / Aviation / Rail" market tag** — already flagged and fixed once this session on 3 other positions — found still live on 5 French and Parrello positions (1182, 1183, 1184, 1185, 1198). None of their real content mentions aviation or rail; corrected to "Transportation." Commit `aa3986f`.
4. **Position 1197's standalone "Education" market tag** consolidated into "Higher Education," completing Byron's 2026-09-02 site-wide policy that 1197 (added afterward) had missed. This is also what removes "Education" as a standalone option from the live Market Sectors filter dropdown, which derives its list directly from position data — no separate filter-options file to edit. Commit `515a319`.
5. **Two dead `jobLocations.js` entries removed** (1108, 1109) — confirmed via git history these Position IDs never existed at any point in the repo; zero live-site impact. Commit `c9e0ac3`.
6. **Positions 1149 and 1150 were missing a real `datePosted` entry** entirely — a gap from their dormant-then-restored history earlier this session — so their JobPosting structured data was silently using a generic fallback date. Added their real date, 2026-08-07, reconstructed from git history and matching sibling positions 1147/1148/1151. Commit `ab98ad4`.

Also checked and confirmed clean during the same audit: no duplicate Position IDs, no duplicate slugs, no missing SEO title/meta description, no salary sanity issues (min > max, zero salary with a real display value), no missing bonus fields, no text corruption or garbling in any responsibilities/qualifications/summary field, no other vague experience fields contradicted by their own qualifications text.

## Full Position Roster (202 IDs, with Credential)

| ID | Status | Title | Location | Salary | Experience | Credential |
|---|---|---|---|---|---|---|
| 1001 | Active | Associate Electrical Engineer- Technical | NYC, NY | $110,000–$145,000 | 5+ years | PE preferred |
| 1002 | Dormant | Associate Electrical Engineer – Power Systems and Modeling | NYC, NY | $122,000–$140,000 | 10+ years | Not stated |
| 1003 | Dormant | Associate, Electrical | NYC, NY | $130,000–$155,000 | 10–14 years | Not stated |
| 1004 | Dormant | Associate, Building Management Systems (BMS) | NYC, NY | $122,000–$140,000 | 8–14 years | Not stated |
| 1005 | Dormant | Electrical Engineer | NYC, NY | $80,000–$85,000 | 0–1 years | Not stated |
| 1006 | Active | Electrical Project Engineer | NYC, Long Island, NY, Voorhees, NJ, Miami, FL | $130,000–$175,000 | 10+ years | Not stated |
| 1007 | Active | Systems Design Project Manager | NYC, NY | $120,000–$160,000 | 7–10 years | PE preferred |
| 1008 | Active | Low Voltage ICT, Security, AV Systems Designer | NYC, NY | $100,000–$115,000 | 3-5 years | Not stated |
| 1009 | Dormant | Senior Associate Electrical Engineer | NYC, NY; Boston, MA and Philadelphia, PA | $125,000–$160,000 | 7+ years | PE preferred |
| 1010 | Active | Senior Electrical Commissioning Engineer | NYC, NY | $150,000–$200,000 | 15–20 years | PE preferred |
| 1011 | Active | Senior Electrical Engineer | NJ, NY, and PA | $115,000–$150,000 | 5+ years | PE preferred |
| 1012 | Dormant | Senior Special Systems Designer | Philadelphia, PA or Remote | $160,000–$195,000 | Minimum 5 years | PE preferred |
| 1013 | Active | Senior Electrical Engineer, PE | NYC, NY | $130,000–$180,000 | Minimum 15 years | PE preferred |
| 1014 | Active | Project Electrical Engineer | NYC, NY ; Monroe Township, NJ; Philadelphia, PA | $100,000–$140,000 | 5–10 years | PE preferred |
| 1015 | Active | Electrical Engineer | Long Island, NY Areas | $105,000–$140,000 | 5+ years | PE preferred |
| 1016 | Dormant | Project Engineer, Electrical | Boston, MA | $95,000–$105,000 | 3–6 years | Not stated |
| 1017 | Dormant | Senior Engineer, Electrical | Boston, MA | $85,000–$95,000 | 2+ years | Not stated |
| 1018 | Active | Senior Electrical Engineer | Boston, MA (Braintree area) | $150,000–$190,000 | 3-5 years | PE required |
| 1019 | Dormant | Senior Electrical Engineer | NYC, NY; Monroe Township, NJ ; Philadelphia, PA | $120,000–$160,000 | 10–15 years | PE preferred |
| 1020 | Dormant | Electrical Project Engineer | Chadds Ford, PA | $120,000–$140,000 | Minimum 10 years | PE required |
| 1021 | Dormant | Senior Electrical Engineer | Chadds Ford, PA | $130,000–$155,000 | 10+ years | PE required |
| 1022 | Dormant | Senior Electrical Engineer | Chadds Ford, PA | $130,000–$155,000 | 10+ years | PE required |
| 1023 | Dormant | Electrical Project Engineer | Chadds Ford, PA | $120,000–$155,000 | Minimum 10 years | PE required |
| 1024 | Active | Electrical Engineer | Albany, NY | $75,000–$105,000 | Minimum 5 years | Not stated |
| 1025 | Active | Senior Electrical Engineer | Albany, NY | $100,000–$130,000 | Minimum 10 years | PE preferred |
| 1026 | Active | Electrical Engineer | Albany, NY | $75,000–$105,000 | Minimum 5 years | Not stated |
| 1027 | Active | Senior Electrical Engineer | Buffalo, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1028 | Active | Senior Electrical Engineer – Buildings | Buffalo, NY | $100,000–$130,000 | Minimum 10 years | EIT required |
| 1029 | Active | Senior Electrical Engineer – Healthcare | Buffalo, NY | $125,000–$175,000 | Minimum 10 years | PE preferred |
| 1030 | Active | Electrical Engineer | Buffalo, NY | $85,000–$125,000 | Minimum 5 years | EIT preferred |
| 1031 | Active | Electrical Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years | PE preferred |
| 1032 | Active | Senior Electrical Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1033 | Active | Senior Electrical Engineer | Schenectady, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1034 | Active | Senior Electrical Engineer | NYC, NY | $130,000–$180,000 | 10+ years | PE preferred |
| 1035 | Active | Electrical Engineer | NYC, NY | $80,000–$130,000 | 3–10 years | PE preferred |
| 1036 | Active | Mechanical HVAC Design Engineer | NYC, NY | $110,000–$140,000 | 8–12 years | PE preferred |
| 1037 | Active | Mechanical HVAC Project Manager | NYC, NY | $135,000–$165,000 | 10–15 years | PE preferred |
| 1038 | Dormant | Associate, Mechanical | NYC, NY | $125,000–$145,000 | 8–14 years | Not stated |
| 1039 | Active | Senior HVAC Engineer / Project Manager | White Plains, NY; NYC, NY | $120,000–$170,000 | 8+ years | PE preferred |
| 1040 | Dormant | Associate Mechanical Engineer –Data Centers (HVAC) | NYC, NY | $125,000–$150,000 | 10+ years | PE preferred |
| 1041 | Dormant | Project Engineer, Mechanical | NYC, NY | $95,000–$105,000 | 3–6 years | Not stated |
| 1042 | Dormant | Mechanical Engineer- Intermediate | NYC, NY | $85,000–$95,000 | Minimum 2 years | Not stated |
| 1043 | Dormant | Senior Project Engineer, Mechanical | NYC, NY | $100,000–$115,000 | 6–9 years | Not stated |
| 1044 | Dormant | Mechanical Engineer- Intermediate | Boston, MA | $85,000–$98,000 | Minimum 2 years | Not stated |
| 1045 | Dormant | Associate, Mechanical | Philadelphia, PA | $122,000–$140,000 | 8–14 years | Not stated |
| 1046 | Dormant | Project Engineer, Mechanical | Philadelphia, PA | $93,000–$100,000 | 3–6 years | Not stated |
| 1047 | Dormant | Mechanical HVAC Engineer | Monroe Township, NJ | $140,000–$140,000 | Not stated | PE preferred |
| 1048 | Active | Mechanical Engineer | NYC, NY | $95,000–$115,000 | Minimum 5 years | PE preferred |
| 1049 | Active | Mechanical Engineer | NYC, NY | $95,000–$120,000 | 2–5 years | Not stated |
| 1050 | Dormant | Senior Mechanical Engineer | NYC, NY | $150,000–$175,000 | 10+ years | PE required |
| 1051 | Dormant | Senior Mechanical Engineer | Boston, MA (Braintree area) | $150,000–$190,000 | 10+ years | PE required |
| 1052 | Dormant | Mechanical Project Engineer | Chadds Ford, PA | $120,000–$145,000 | Minimum 10 years | PE required |
| 1053 | Active | Mechanical Engineer/Project Manager | NYC, NY | $100,000–$150,000 | 4–7 years | PE preferred |
| 1054 | Active | Mechanical Project Engineer | Buffalo, NY | $75,000–$89,000 | Minimum 2 years | PE preferred |
| 1055 | Active | Senior Mechanical Engineer | Buffalo, NY | $88,000–$120,000 | Minimum 8 years | PE preferred |
| 1056 | Active | Mechanical Engineer – Energy Infrastructure (Mid-Level) | Buffalo, NY | $80,000–$120,000 | 8–10 years | Not stated |
| 1057 | Active | Mechanical Engineer | Latham, NY | $70,000–$90,000 | 4–6 years | PE preferred |
| 1058 | Active | Mechanical Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years | PE preferred |
| 1059 | Active | Mechanical Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1060 | Active | Senior Mechanical Engineer | Albany, NY | $120,000–$145,000 | Minimum 10 years | PE preferred |
| 1061 | Active | Mechanical Engineer / Project Manager- Healthcare Design | NYC, NY | $100,000–$150,000 | 4–7 years | PE preferred |
| 1062 | Active | Plumbing & Fire Protection Engineer | NYC, NY | $85,000–$105,000 | Minimum 3 years | PE preferred |
| 1063 | Active | Plumbing and Fire Protection Engineer | NYC, NY | $100,000–$115,000 | 1–2 years | PE preferred |
| 1064 | Active | Plumbing/Fire Protection Project Engineer | Buffalo, NY | $73,000–$89,000 | Minimum 2 years | PE preferred |
| 1065 | Active | Plumbing/Fire Protection Design Engineer | Buffalo, NY | $65,000–$75,000 | Not stated | Not stated |
| 1066 | Active | Senior Plumbing/Fire Protection Engineer | Albany, NY | $90,000–$120,000 | Minimum 10 years | PE preferred |
| 1067 | Active | Senior Plumbing/Fire Protection Engineer | Albany, NY | $100,000–$120,000 | Minimum 10 years | PE preferred |
| 1068 | Active | Plumbing/Fire Protection Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years | PE preferred |
| 1069 | Active | Senior Plumbing/Fire Protection Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1070 | Active | Project Engineer, Plumbing & Fire Protection | Boston, MA | $95,000–$105,000 | 3–5 years | Not stated |
| 1071 | Dormant | Plumbing and Fire Protection Engineer | Boston, MA | $100,000–$170,000 | 5+ years | PE preferred |
| 1072 | Active | Plumbing and Fire Protection Engineer | Miami, FL | $105,000–$175,000 | 1–2 years | PE preferred |
| 1073 | Active | Electrical Engineering Department Manager | NYC, NY | $190,000–$220,000 | 15+ years | PE required |
| 1074 | Active | Director of Operations – Commissioning Group | NYC, NY | $175,000–$210,000 | 10+ years | Not stated |
| 1075 | Active | Director, Healthcare/Sciences Department: Health/Sciences | Voorhees, NJ and NYC, NY | $200,000–$250,000 | 15+ years | PE required |
| 1076 | Dormant | Electrical Discipline Lead | Chadds Ford, PA | $175,000–$200,000 | minimum 10 years | PE required |
| 1077 | Dormant | Fire Life Safety Discipline Leader | Chadds Ford, PA | $175,000–$190,000 | Minimum 10 years | PE required |
| 1078 | Active | Associate, Electrical PE | Philadelphia, PA | $122,000–$140,000 | 10–14 years | Not stated |
| 1079 | Active | Senior Electrical Engineer | Midland Park, NJ; Voorhees, NJ; or Goshen, NY | $130,000–$150,000 | 6+ years | PE required |
| 1080 | Active | Associate, Electrical | Boston, MA | $122,000–$155,000 | 10–14 years | Not stated |
| 1081 | Active | Senior Project Engineer, Electrical | Boston, MA | $100,000–$120,000 | Minimum 5 years | Not stated |
| 1082 | Active | Senior Project Engineer, Electrical | NYC, NY | $100,000–$120,000 | Minimum 5 years | Not stated |
| 1083 | Active | Senior Electrical Designer | Wall Township, NJ | $85,000–$125,000 | 6–15 years | Not stated |
| 1084 | Active | Electrical Engineer | Wall Township, NJ | $90,000–$175,000 | 3–15 years | PE preferred |
| 1085 | Active | Electrical Department Group Manager | Wall Township, NJ | $150,000–$200,000 | 10+ years | PE required |
| 1086 | Active | Senior Staff Engineer – Electrical | Wall Township, NJ | $80,000–$105,000 | 2+ years | EIT preferred |
| 1087 | Active | Electrical Design Engineer | Voorhees, NJ | $135,000–$170,000 | 5–10 years | PE required |
| 1088 | Active | Senior Electrical Engineer | Newark, NJ; NYC, NY; Philadelphia, PA | $100,000–$145,000 | 8+ years | PE preferred |
| 1089 | Active | Lead Electrical Designer | NYC, NY | $135,000–$170,000 | 6+ years | PE preferred |
| 1090 | Active | Senior Electrical Designer | NYC, NY | $110,000–$125,000 | 4+ years | PE preferred |
| 1091 | Active | Senior Mechanical Engineer | Voorhees, NJ | $135,000–$170,000 | 15+ years | PE preferred |
| 1092 | Active | Mechanical Engineer II | Voorhees, NJ | $120,000–$150,000 | 5+ years | PE preferred |
| 1093 | Active | Senior HVAC Engineer & Project Manager | NYC, NY or Philadelphia, PA | $120,000–$160,000 | Minimum 10 years | PE preferred |
| 1094 | Active | Senior HVAC Engineer | NYC, NY | $140,000–$170,000 | 10+ years | PE preferred |
| 1095 | Active | Senior Mechanical Designer | Hollywood, FL | $110,000–$135,000 | 6+ years | PE preferred |
| 1096 | Active | Senior Mechanical Designer | NYC, NY | $120,000–$145,000 | 6+ years | PE preferred |
| 1097 | Active | Senior Mechanical Designer | Hollywood, FL | $110,000–$140,000 | 4+ years | PE preferred |
| 1098 | Active | Project Manager Mechanical (HVAC) | Wall Township, NJ | $115,000–$180,000 | 10+ years | PE required |
| 1099 | Active | Mechanical Engineer (HVAC) | Wall Township, NJ | $90,000–$140,000 | 3–10 years | EIT preferred |
| 1100 | Terminated | Mechanical Engineer (HVAC) | Wall Township, NJ | $90,000–$140,000 | 3–10 years | EIT preferred |
| 1101 | Active | Electrical Engineering Group Manager (Senior Electrical Engineer) | Miami, FL | $165,000–$190,000 | 15+ years | PE preferred |
| 1102 | Active | Group Manager – Municipal Engineering | Sparta, NJ ; Parsippany, NJ | $140,000–$190,000 | 15+ years | PE preferred |
| 1103 | Active | Lead Plumbing & Fire Protection Designer | NYC, NY | $120,000–$150,000 | 6+ years | PE preferred |
| 1104 | Dormant | Plumbing & Fire Protection Engineer | NYC, NY | $135,000–$165,000 | 6+ years | PE required |
| 1105 | Active | Senior Plumbing/Fire Protection Engineer | Schenectady, NY | $88,000–$122,000 | Minimum 8 years | PE preferred |
| 1106 | Active | Senior Mechanical Engineer / Project Manager | Midland Park, NJ | $150,000–$175,000 | 15+ years | PE preferred |
| 1107 | Active | Project Manager – MEP | Parsippany, NJ | $110,000–$150,000 | 5–8 years | Not stated |
| 1110 | Active | Project Manager – MEP | Sparta, NJ | $110,000–$150,000 | 5–8 years | Not stated |
| 1111 | Dormant | Senior Electrical Engineer | NYC, NY | $145,000–$185,000 | 8–10 years | PE required |
| 1112 | Active | Senior Electrical Engineer | NYC, NY | $110,000–$135,000 | 7–10 years | PE preferred |
| 1113 | Active | Technology and Design Engineer | NYC, NY | $85,000–$105,000 | 3–5 years | EIT required |
| 1114 | Active | Senior Electrical Engineer | NYC, NY | $150,000–$180,000 | 15+ years | PE preferred |
| 1115 | Active | Intermediate – Senior– Electrical Engineer | NYC, NY | $115,000–$135,000 | 8+ years | PE preferred |
| 1116 | Active | Intermediate – Senior – Electrical Engineer | NYC, NY | $125,000–$175,000 | Minimum of 10 years | PE required |
| 1117 | Active | Electrical Engineer – Team Lead | Newark, NJ; Parsippany, NJ | $105,000–$175,000 | 5-15+ years | PE preferred |
| 1118 | Active | Senior Electrical Engineer | NYC, NY | $175,000–$215,000 | 15+ years | PE required |
| 1119 | Active | Electrical Engineer | NYC, NY | $105,000–$155,000 | 5–10 years | PE required |
| 1120 | Active | Senior Electrical Engineer | NYC, NY | $150,000–$210,000 | 10+ years | PE required |
| 1121 | Active | Electrical Engineer | NYC, NY | $165,000–$197,000 | 7+ years | PE preferred |
| 1122 | Active | Senior Electrical Engineer | NYC, NY | $140,000–$190,000 | 10+ years | PE required |
| 1123 | Active | Senior Electrical Engineer | NYC, NY | $115,000–$148,000 | 8+ years | PE preferred |
| 1124 | Active | Senior Electrical Engineer | NYC, NY | $145,000–$185,000 | Minimum 10 years | PE preferred |
| 1125 | Active | Senior Electrical Engineer | NYC, NY | $130,000–$175,000 | 10-20 years | PE preferred |
| 1126 | Active | Senior Electrical Engineer – Project Manager | NYC, NY | $110,000–$160,000 | 7–10 years | PE required |
| 1127 | Active | Senior Project Engineer – Electrical | NYC, NY; Boston, MA; Newark, NJ | $110,000–$150,000 | 4+ years | PE preferred |
| 1128 | Active | Electrical Engineer | NYC, NY | $85,000–$130,000 | 2–5 years | PE required |
| 1129 | Active | Senior Electrical Engineer – Water/Wastewater | NYC, NY | $135,000–$190,000 | 10 years | PE required |
| 1130 | Active | Electrical Engineer | NYC, NY | $90,000–$125,000 | 5–10 years | PE preferred |
| 1131 | Active | Senior Electrical Engineer | Bridgewater, NJ; Pleasantville, NJ | $135,000–$190,000 | 10–15 years | PE preferred |
| 1132 | Active | Principal , Senior Electrical Engineering Leader | NYC, NY | $175,000–$200,000 | 10+ years | PE required |
| 1133 | Active | Senior Mechanical Engineer – Healthcare and Laboratory Projects | NYC, NY | $120,000–$155,000 | 7–10 years | PE required |
| 1134 | Active | Mechanical Engineer – Healthcare Projects | NYC, NY | $105,000–$135,000 | 5+ years | EIT preferred |
| 1135 | Active | Senior Mechanical Engineer – Existing Buildings | NYC, NY | $135,000–$180,000 | 7–10 years | PE preferred |
| 1136 | Active | Mechanical Design Engineer – MEP Consulting | NYC, NY | $95,000–$135,000 | 5+ years | PE preferred |
| 1137 | Active | Intermediate Mechanical Engineer | NYC, NY | $95,000–$125,000 | 5+ years | Not stated |
| 1138 | Active | Intermediate MEP Project Manager – HVAC | NYC, NY | $115,000–$150,000 | 5+ years | Not stated |
| 1139 | Active | Principal MEP Engineer – Business Development | Remote (NYC-focused market) | $140,000–$200,000 | 8+ years | PE preferred |
| 1140 | Active | Mechanical Project Engineer – Vertical Building Systems | NYC, NY | $106,000–$145,000 | Minimum 5 years | PE required |
| 1141 | Active | Senior Project Engineer – Mechanical | NYC, NY | $120,000–$165,000 | Minimum 4 years | PE preferred |
| 1142 | Active | Lead Mechanical Engineer | NYC, NY | $115,000–$170,000 | 7–10 years | PE required |
| 1143 | Active | Senior Mechanical Engineer | NYC, NY | $115,000–$150,000 | 3+ years | PE required |
| 1144 | Active | Mechanical Engineer | NYC, NY | $70,000–$150,000 | 5+ years | PE preferred |
| 1145 | Active | Mechanical Engineer | NYC, NY | $130,000–$175,000 | 5–10 years | PE preferred |
| 1146 | Active | Electrical Designer / Engineer | Clarks Summit, PA | $78,000–$95,000 | 3–7 years | EIT preferred |
| 1147 | Active | Mechanical Designer / Engineer | Clarks Summit, PA | $78,000–$95,000 | 3–7 years | EIT preferred |
| 1148 | Active | MEP Engineering BIM / CAD Specialist | Clarks Summit, PA | $65,000–$115,000 | 2-15 years | Not stated |
| 1149 | Active | Senior Electrical Engineer / Project Manager | Clarks Summit, PA | $105,000–$145,000 | 8+ years | PE preferred |
| 1150 | Active | Senior Mechanical Engineer / Project Manager | Clarks Summit, PA | $105,000–$145,000 | 8+ years | PE preferred |
| 1151 | Active | Lead Electrical Designer | NYC, NY | $135,000–$175,000 | 8+ years | PE preferred |
| 1152 | Active | Senior Electrical Designer | NYC, NY | $105,000–$140,000 | 4+ years | PE preferred |
| 1153 | Active | Electrical Engineer II | Voorhees, NJ | $95,000–$152,000 | 7-10 years | PE preferred |
| 1154 | Active | Senior BIM Design Specialist | Voorhees, NJ | $65,000–$104,000 | 5+ years | Not stated |
| 1155 | Active | Senior Electrical Engineer | Voorhees, NJ | $115,000–$175,000 | 12-15 years | PE required |
| 1156 | Active | Senior Mechanical Engineer | Voorhees, NJ | $115,000–$175,000 | 12+ years | PE preferred |
| 1157 | Active | Senior Mechanical Engineer / Project Manager | NYC, NY | $115,000–$175,000 | 10+ years | PE required |
| 1158 | Active | Senior Engineering Project Manager | Voorhees, NJ; NYC, NY; Philadelphia, PA | $150,000–$200,000 | 15+ years | PE required |
| 1159 | Active | Electrical Engineer | NYC, NY | $115,000–$150,000 | 5-10 years | PE preferred |
| 1160 | Active | Structural Engineer | Clarks Summit, PA | $90,000–$120,000 | 5-10 years | PE preferred |
| 1161 | Active | Senior Civil Project Manager | New York, NY | $170,000–$230,000 | 10–15 years | New York PE required |
| 1162 | Active | Senior Highway/Civil Engineer | New York, NY | $142,000–$185,000 | 8–12 years | New York PE required |
| 1163 | Terminated | Senior Transportation Project Manager | Denver, CO | $130,000–$170,000 | 10+ years | PE required |
| 1164 | Terminated | Senior Transportation Project Manager | Rancho Cordova, CA | $170,000–$200,000 | 12+ years | PE required |
| 1165 | Terminated | Senior Structures/Project Engineer (Bridge) | Rancho Cordova, CA | $135,000–$190,000 | 10+ years | PE preferred |
| 1166 | Terminated | Land Development Project Manager | Louisville, CO | $130,000–$190,000 | 10+ years | PE required |
| 1167 | Terminated | Senior Civil CAD Designer | Louisville, CO | $95,000–$130,000 | 10+ years | Not stated |
| 1168 | Terminated | Water / Wastewater Project Manager | Denver, CO | $125,000–$145,000 | 8+ years | PE required |
| 1169 | Active | Water / Wastewater Project Engineer – Pipelines, Pump Stations & Treatment | Denver, CO | $100,000–$120,000 | 5+ years | PE preferred |
| 1170 | Active | Senior Civil Project Manager | Charlotte, NC | $140,000–$165,000 | 10+ years | PE or RLA required |
| 1171 | Active | Site Civil Project Manager | Charlotte, NC | $115,000–$135,000 | 6-10 years | PE or RLA required |
| 1172 | Active | Senior Project Engineer – Plumbing/Fire Protection | Madison, NJ | $105,000–$125,000 | 4+ years | PE preferred |
| 1173 | Active | Water / Wastewater Senior Project Engineer – Pipelines, Pump Stations & Treatment | Denver, CO | $141,000–$185,000 | 10+ years | PE required |
| 1174 | Active | Senior Transportation Project Manager | Rancho Cordova, CA | $170,000–$200,000 | 12+ years | PE required |
| 1175 | Active | Transportation Project Manager | Denver, CO | $130,000–$170,000 | 10+ years | PE required |
| 1176 | Active | Senior Structures/Project Engineer (Bridge) | Fresno, CA or Rancho Cordova, CA | $135,000–$190,000 | 10+ years | PE preferred |
| 1177 | Active | Land Development Project Manager | Louisville, CO | $130,000–$190,000 | 10+ years | PE required |
| 1178 | Active | Water/Wastewater Project Manager | Denver, CO | $125,000–$142,000 | 8+ years | PE required |
| 1179 | Active | Senior Civil CAD Designer | Louisville, CO | $95,000–$128,000 | 10+ years | Not stated |
| 1180 | Active | Civil Engineer/Project Manager | Raleigh, NC | $140,000–$165,000 | 6-10 years | PE required |
| 1181 | Terminated | Assistant Chief Engineer, Structural (Bridge) | Wall Township, NJ | $150,000–$200,000 | 15+ years | PE required |
| 1182 | Active | Project Engineer, Structural (Bridge) | Wall Township, NJ | $90,000–$115,000 | 5 to 8 years | PE required |
| 1183 | Active | Senior Transportation Engineering Project Manager | Wall Township, NJ | $150,000–$185,000 | 12+ years | PE required |
| 1184 | Active | Transportation Engineering Project Manager | Wall Township, NJ | $125,000–$160,000 | 8+ years | PE required |
| 1185 | Active | Transportation Group Manager | Wall Township, NJ | $175,000–$225,000 | 15+ years | PE required |
| 1186 | Active | Senior Transportation Project Manager | NYC, NY | $175,000–$205,000 | 12+ years | PE required |
| 1187 | Active | Senior Mechanical Engineer | Pine Brook, NJ | $100,000–$150,000 | 5+ years | PE, LEED AP preferred |
| 1188 | Active | Senior Electrical Engineer | New York, NY | $130,000–$175,000 | 10+ years | PE preferred |
| 1189 | Active | Senior Electrical Designer | NYC, NY | $120,000–$150,000 | 10+ years | PE preferred |
| 1190 | Active | Plumbing & Fire Protection Engineer | NYC, NY | $135,000–$170,000 | 6+ years | PE required |
| 1191 | Active | Senior Mechanical Engineer | NYC, NY | $135,000–$170,000 | 8+ years | PE required |
| 1192 | Active | Mechanical Designer | NYC, NY | $85,000–$130,000 | 2+ years | PE preferred |
| 1193 | Active | Lead Electrical Designer | Hollywood, FL | $120,000–$150,000 | 6+ years | PE preferred |
| 1194 | Active | Senior Mechanical Engineer | Hollywood, FL | $140,000–$170,000 | 8+ years | PE required |
| 1195 | Active | Plumbing & Fire Protection Design Manager | Hollywood, FL | $120,000–$150,000 | 8+ years | PE preferred |
| 1196 | Active | Lead Plumbing & Fire Protection Designer | Hollywood, FL | $110,000–$145,000 | 6+ years | PE preferred |
| 1197 | Active | Mechanical Project Engineer | NYC, NY | $110,000–$165,000 | 5-12 years | PE required |
| 1198 | Active | Assistant Chief Engineer – Structural (Bridge) | Wall Township, NJ | $150,000–$200,000 | 15+ years | PE required |
| 1199 | Active | Site/Civil Project Engineer | Raleigh, NC | $115,000–$135,000 | 4+ years | EIT required, PE preferred |
| 1200 | Active | Senior Mechanical Engineer – Central Utility Plants | Voorhees, NJ | $160,000–$180,000 | 10+ years | PE required |
| 1201 | Active | Controls Integration Engineer | Voorhees, NJ | $100,000–$160,000 | 5-10 years | PE preferred |
| 1202 | Active | Electrical Designer | Voorhees, NJ | $65,000–$104,000 | 1-2 years | Not stated |
| 1203 | Active | Electrical Design Engineer | Voorhees, NJ | $100,000–$160,000 | 5-10 years | PE required |
| 1204 | Active | Staff Engineer – Mechanical Engineer | NYC, NY | $90,000–$115,000 | 2-4 years | EIT required, PE preferred |