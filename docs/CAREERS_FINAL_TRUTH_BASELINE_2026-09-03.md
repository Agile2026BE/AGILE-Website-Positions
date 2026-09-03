# AGILE Careers — FINAL TRUTH BASELINE — September 3, 2026, 19:26 EDT

## Status

This is the locked, fully cross-referenced baseline for the entire live position dataset as of the timestamp above. Every row below was generated directly from the production source code at this commit — not hand-copied, not carried forward from any prior document.

Baseline code commit:

`b402444` — "Terminate 6 confirmed duplicate Dewberry positions," branch `main`.

Repository:

`Agile2026BE/AGILE-Website-Positions`

Production domain:

`https://www.agileconsultingsolutions.com/careers`

Total records: **202** — **164 Active** (live on the site), **30 Dormant** (client not currently engaged, reversible, IDs retained), **8 Terminated** (permanent duplicates, IDs never reused).

## What "FINAL TRUTH BASELINE" means here

- The full position roster below (all 202 IDs) was pulled straight from `data/jobs.js`'s `coreJobs`, merged with every `data/jobDetails/*.js` overlay exactly the way the site itself merges them, cross-referenced against `data/terminatedPositionIds.js` and `data/dormantPositionIds.js` for status.
- The companion Excel workbook (`AGILE_Master_Position_List_20260903_FINAL_TRUTH_BASELINE.xlsx`, saved to `/Users/byronevens/Documents/Claude outputs/` and `/Users/byronevens/Desktop/Claude Downloads!!/` — internal client names live only there, never in this repo) was rebuilt from the same data. Every column (title, discipline, specialty, market, location, state, workplace, salary, bonus, experience, credential, summary, key responsibilities, key qualifications, why-consider, full description, SEO slug/title, meta description, direct URL, status) was regenerated at this timestamp.
- **Correction made during this rebuild:** the prior workbook version (v34) had blank Key Responsibilities, Key Qualifications, Why Consider, Full Website Description, SEO Title, and Meta Description columns for all 202 rows — a generation-script bug had pulled from the base records before the `jobDetails` overlay merge. All 201 of 202 rows now have this content (1012, a Dormant position, has no responsibilities text on file — a pre-existing gap already flagged in the workbook's own Data Quality tab, not something invented here).
- **Internal Client corrections** confirmed and normalized this session (full mapping lives only in the Excel workbook, per the standing confidentiality rule — no real client name appears in this repo):
  - Two inconsistent spellings of the same real client normalized to one name (15 positions).
  - Two inconsistent spellings of a second real client normalized to one name (23 positions, post-dedup below).
  - Position 1128 corrected to a distinct company from the "M/E Engineering" cluster it had been lumped into — confirmed by Byron as a different, NYC-based firm.
  - The 13 "M/E Engineering" positions (1030, 1031, 1032, 1033, 1054, 1055, 1058, 1059, 1064, 1065, 1068, 1069, 1105) are tagged **Business Development** internally and confirmed to stay Active — not Dormant.
- **Spot-checked live this session** against the workbook, client by client: a 9-position roster, a 15-position roster, and a 1-position roster (see the Dewberry Duplicate Resolution baseline below for the fourth) — all confirmed accurate against the live site.
- **Full-site duplicate scan performed** (every Active position grouped by internal client, titles compared for overlap): only the 6 Dewberry duplicates below were confirmed real. Several other near-identical-looking pairs (same title/city, different client) were checked in detail and confirmed by Byron to be genuinely distinct openings — different specialty focus, different experience tier, or a PE-required/non-PE split — not duplicates.
- **36 Active positions have no confirmed Internal Client** anywhere in this workbook's history. Left unresolved rather than guessed at.

## Dewberry Duplicate Resolution (this session)

Six pairs of Position IDs described the same real Dewberry opening, created in two separate batches weeks apart without ever being cross-checked against each other. The older ID in each pair was Terminated; the ID built directly from a real, directly-sourced Dewberry posting stays live:

| Terminated | Stays live | Opening |
|---|---|---|
| 1163 | 1175 | Transportation Project Manager, Denver, CO |
| 1164 | 1174 | Senior Transportation Project Manager, Rancho Cordova, CA |
| 1165 | 1176 | Senior Structures/Project Engineer (Bridge), Rancho Cordova, CA |
| 1166 | 1177 | Land Development Project Manager, Louisville, CO |
| 1167 | 1179 | Senior Civil CAD Designer, Louisville, CO |
| 1168 | 1178 | Water/Wastewater Project Manager, Denver, CO |

Confirmed **not** duplicates during the same scan (kept as-is): 1169/1173 (different seniority tiers of a Water/Wastewater role), 1066/1067 (different project-focus specialties), 1013/1034 (PE-required lead role vs. non-PE role under that PE), and the MG Engineering pairs (different experience levels and responsibilities).

## Full Position Roster (202 IDs)

| ID | Status | Title | Location | Salary | Experience |
|---|---|---|---|---|---|
| 1001 | Active | Associate Electrical Engineer- Technical | NYC, NY | $110,000–$145,000 | 5+ years |
| 1002 | Dormant | Associate Electrical Engineer – Power Systems and Modeling | NYC, NY | $122,000–$140,000 | 10+ years |
| 1003 | Dormant | Associate, Electrical | NYC, NY | $130,000–$155,000 | 10–14 years |
| 1004 | Dormant | Associate, Building Management Systems (BMS) | NYC, NY | $122,000–$140,000 | 8–14 years |
| 1005 | Dormant | Electrical Engineer | NYC, NY | $80,000–$85,000 | 0–1 years |
| 1006 | Active | Electrical Project Engineer | NYC, Long Island, NY, Voorhees, NJ, Miami, FL | $130,000–$175,000 | 10+ years |
| 1007 | Active | Systems Design Project Manager | NYC, NY | $120,000–$160,000 | 7–10 years |
| 1008 | Active | Low Voltage ICT, Security, AV Systems Designer | NYC, NY | $100,000–$115,000 | 3-5 years |
| 1009 | Dormant | Senior Associate Electrical Engineer | NYC, NY; Boston, MA and Philadelphia, PA | $125,000–$160,000 | 7+ years |
| 1010 | Active | Senior Electrical Commissioning Engineer | NYC, NY | $150,000–$200,000 | 15–20 years |
| 1011 | Active | Senior Electrical Engineer | NJ, NY, and PA | $115,000–$150,000 | 5+ years |
| 1012 | Dormant | Senior Special Systems Designer | Philadelphia, PA or Remote | $160,000–$195,000 | Minimum 5 years |
| 1013 | Active | Senior Electrical Engineer, PE | NYC, NY | $130,000–$180,000 | Minimum 15 years |
| 1014 | Active | Project Electrical Engineer | NYC, NY ; Monroe Township, NJ; Philadelphia, PA | $100,000–$140,000 | 5–10 years |
| 1015 | Active | Electrical Engineer | Long Island, NY Areas | $105,000–$140,000 | 5+ years |
| 1016 | Dormant | Project Engineer, Electrical | Boston, MA | $95,000–$105,000 | 3–6 years |
| 1017 | Dormant | Senior Engineer, Electrical | Boston, MA | $85,000–$95,000 | 2+ years |
| 1018 | Active | Senior Electrical Engineer | Boston, MA (Braintree area) | $150,000–$190,000 | 3-5 years |
| 1019 | Dormant | Senior Electrical Engineer | NYC, NY; Monroe Township, NJ ; Philadelphia, PA | $120,000–$160,000 | 10–15 years |
| 1020 | Dormant | Electrical Project Engineer | Chadds Ford, PA | $120,000–$140,000 | Minimum 10 years |
| 1021 | Dormant | Senior Electrical Engineer | Chadds Ford, PA | $130,000–$155,000 | 10+ years |
| 1022 | Dormant | Senior Electrical Engineer | Chadds Ford, PA | $130,000–$155,000 | 10+ years |
| 1023 | Dormant | Electrical Project Engineer | Chadds Ford, PA | $120,000–$155,000 | Minimum 10 years |
| 1024 | Active | Electrical Engineer | Albany, NY | $75,000–$105,000 | Minimum 5 years |
| 1025 | Active | Senior Electrical Engineer | Albany, NY | $100,000–$130,000 | Minimum 10 years |
| 1026 | Active | Electrical Engineer | Albany, NY | $75,000–$105,000 | Minimum 5 years |
| 1027 | Active | Senior Electrical Engineer | Buffalo, NY | $88,000–$122,000 | Minimum 8 years |
| 1028 | Active | Senior Electrical Engineer – Buildings | Buffalo, NY | $100,000–$130,000 | Minimum 10 years |
| 1029 | Active | Senior Electrical Engineer – Healthcare | Buffalo, NY | $125,000–$175,000 | Minimum 10 years |
| 1030 | Active | Electrical Engineer | Buffalo, NY | $85,000–$125,000 | Minimum 5 years |
| 1031 | Active | Electrical Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years |
| 1032 | Active | Senior Electrical Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years |
| 1033 | Active | Senior Electrical Engineer | Schenectady, NY | $88,000–$122,000 | Minimum 8 years |
| 1034 | Active | Senior Electrical Engineer | NYC, NY | $130,000–$180,000 | 10+ years |
| 1035 | Active | Electrical Engineer | NYC, NY | $80,000–$130,000 | 3–10 years |
| 1036 | Active | Mechanical HVAC Design Engineer | NYC, NY | $110,000–$140,000 | 8–12 years |
| 1037 | Active | Mechanical HVAC Project Manager | NYC, NY | $135,000–$165,000 | 10–15 years |
| 1038 | Dormant | Associate, Mechanical | NYC, NY | $125,000–$145,000 | 8–14 years |
| 1039 | Active | Senior HVAC Engineer / Project Manager | White Plains, NY; NYC, NY | $120,000–$170,000 | 8+ years |
| 1040 | Dormant | Associate Mechanical Engineer –Data Centers (HVAC) | NYC, NY | $125,000–$150,000 | 10+ years |
| 1041 | Dormant | Project Engineer, Mechanical | NYC, NY | $95,000–$105,000 | 3–6 years |
| 1042 | Dormant | Mechanical Engineer- Intermediate | NYC, NY | $85,000–$95,000 | Minimum 2 years |
| 1043 | Dormant | Senior Project Engineer, Mechanical | NYC, NY | $100,000–$115,000 | 6–9 years |
| 1044 | Dormant | Mechanical Engineer- Intermediate | Boston, MA | $85,000–$98,000 | Minimum 2 years |
| 1045 | Dormant | Associate, Mechanical | Philadelphia, PA | $122,000–$140,000 | 8–14 years |
| 1046 | Dormant | Project Engineer, Mechanical | Philadelphia, PA | $93,000–$100,000 | 3–6 years |
| 1047 | Dormant | Mechanical HVAC Engineer | Monroe Township, NJ | $140,000–$140,000 | Not stated |
| 1048 | Active | Mechanical Engineer | NYC, NY | $95,000–$115,000 | Minimum 5 years |
| 1049 | Active | Mechanical Engineer | NYC, NY | $95,000–$120,000 | 2–5 years |
| 1050 | Dormant | Senior Mechanical Engineer | NYC, NY | $150,000–$175,000 | 10+ years |
| 1051 | Dormant | Senior Mechanical Engineer | Boston, MA (Braintree area) | $150,000–$190,000 | 10+ years |
| 1052 | Dormant | Mechanical Project Engineer | Chadds Ford, PA | $120,000–$145,000 | Minimum 10 years |
| 1053 | Active | Mechanical Engineer/Project Manager | NYC, NY | $100,000–$150,000 | 4–7 years |
| 1054 | Active | Mechanical Project Engineer | Buffalo, NY | $75,000–$89,000 | Minimum 2 years |
| 1055 | Active | Senior Mechanical Engineer | Buffalo, NY | $88,000–$120,000 | Minimum 8 years |
| 1056 | Active | Mechanical Engineer – Energy Infrastructure (Mid-Level) | Buffalo, NY | $80,000–$120,000 | 8–10 years |
| 1057 | Active | Mechanical Engineer | Latham, NY | $70,000–$90,000 | 4–6 years |
| 1058 | Active | Mechanical Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years |
| 1059 | Active | Mechanical Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years |
| 1060 | Active | Senior Mechanical Engineer | Albany, NY | $120,000–$145,000 | Minimum 10 years |
| 1061 | Active | Mechanical Engineer / Project Manager- Healthcare Design | NYC, NY | $100,000–$150,000 | 4–7 years |
| 1062 | Active | Plumbing & Fire Protection Engineer | NYC, NY | $85,000–$105,000 | Minimum 3 years |
| 1063 | Active | Plumbing and Fire Protection Engineer | NYC, NY | $100,000–$115,000 | 1–2 years |
| 1064 | Active | Plumbing/Fire Protection Project Engineer | Buffalo, NY | $73,000–$89,000 | Minimum 2 years |
| 1065 | Active | Plumbing/Fire Protection Design Engineer | Buffalo, NY | $65,000–$75,000 | Not stated |
| 1066 | Active | Senior Plumbing/Fire Protection Engineer | Albany, NY | $90,000–$120,000 | Minimum 10 years |
| 1067 | Active | Senior Plumbing/Fire Protection Engineer | Albany, NY | $100,000–$120,000 | Minimum 10 years |
| 1068 | Active | Plumbing/Fire Protection Project Engineer | Rochester, NY | $73,000–$88,000 | Minimum 2 years |
| 1069 | Active | Senior Plumbing/Fire Protection Engineer | Rochester, NY | $88,000–$122,000 | Minimum 8 years |
| 1070 | Active | Project Engineer, Plumbing & Fire Protection | Boston, MA | $95,000–$105,000 | 3–5 years |
| 1071 | Dormant | Plumbing and Fire Protection Engineer | Boston, MA | $100,000–$170,000 | 5+ years |
| 1072 | Active | Plumbing and Fire Protection Engineer | Miami, FL | $105,000–$175,000 | 1–2 years |
| 1073 | Active | Electrical Engineering Department Manager | NYC, NY | $190,000–$220,000 | 15+ years |
| 1074 | Active | Director of Operations – Commissioning Group | NYC, NY | $175,000–$210,000 | 10+ years |
| 1075 | Active | Director, Healthcare/Sciences Department: Health/Sciences | Voorhees, NJ and NYC, NY | $200,000–$250,000 | 15+ years |
| 1076 | Dormant | Electrical Discipline Lead | Chadds Ford, PA | $175,000–$200,000 | minimum 10 years |
| 1077 | Dormant | Fire Life Safety Discipline Leader | Chadds Ford, PA | $175,000–$190,000 | Minimum 10 years |
| 1078 | Active | Associate, Electrical PE | Philadelphia, PA | $122,000–$140,000 | 10–14 years |
| 1079 | Active | Senior Electrical Engineer | Midland Park, NJ; Voorhees, NJ; or Goshen, NY | $130,000–$150,000 | 6+ years |
| 1080 | Active | Associate, Electrical | Boston, MA | $122,000–$155,000 | 10–14 years |
| 1081 | Active | Senior Project Engineer, Electrical | Boston, MA | $100,000–$120,000 | Minimum 5 years |
| 1082 | Active | Senior Project Engineer, Electrical | NYC, NY | $100,000–$120,000 | Minimum 5 years |
| 1083 | Active | Senior Electrical Designer | Wall Township, NJ | $85,000–$125,000 | 6–15 years |
| 1084 | Active | Electrical Engineer | Wall Township, NJ | $90,000–$175,000 | 3–15 years |
| 1085 | Active | Electrical Department Group Manager | Wall Township, NJ | $150,000–$200,000 | 10+ years |
| 1086 | Active | Senior Staff Engineer – Electrical | Wall Township, NJ | $80,000–$105,000 | 2+ years |
| 1087 | Active | Electrical Design Engineer | Voorhees, NJ | $135,000–$170,000 | 5–10 years |
| 1088 | Active | Senior Electrical Engineer | Newark, NJ; NYC, NY; Philadelphia, PA | $100,000–$145,000 | 8+ years |
| 1089 | Active | Lead Electrical Designer | NYC, NY | $135,000–$170,000 | 6+ years |
| 1090 | Active | Senior Electrical Designer | NYC, NY | $110,000–$125,000 | 4+ years |
| 1091 | Active | Senior Mechanical Engineer | Voorhees, NJ | $135,000–$170,000 | 15+ years |
| 1092 | Active | Mechanical Engineer II | Voorhees, NJ | $120,000–$150,000 | 5+ years |
| 1093 | Active | Senior HVAC Engineer & Project Manager | NYC, NY or Philadelphia, PA | $120,000–$160,000 | Minimum 10 years |
| 1094 | Active | Senior HVAC Engineer | NYC, NY | $140,000–$170,000 | 10+ years |
| 1095 | Active | Senior Mechanical Designer | Hollywood, FL | $110,000–$135,000 | 6+ years |
| 1096 | Active | Senior Mechanical Designer | NYC, NY | $120,000–$145,000 | 6+ years |
| 1097 | Active | Senior Mechanical Designer | Hollywood, FL | $110,000–$140,000 | 4+ years |
| 1098 | Active | Project Manager Mechanical (HVAC) | Wall Township, NJ | $115,000–$180,000 | 10+ years |
| 1099 | Active | Mechanical Engineer (HVAC) | Wall Township, NJ | $90,000–$140,000 | 3–10 years |
| 1100 | Terminated | Mechanical Engineer (HVAC) | Wall Township, NJ | $90,000–$140,000 | 3–10 years |
| 1101 | Active | Electrical Engineering Group Manager (Senior Electrical Engineer) | Miami, FL | $165,000–$190,000 | 15+ years |
| 1102 | Active | Group Manager – Municipal Engineering | Sparta, NJ ; Parsippany, NJ | $140,000–$190,000 | 15+ years |
| 1103 | Active | Lead Plumbing & Fire Protection Designer | NYC, NY | $120,000–$150,000 | 6+ years |
| 1104 | Dormant | Plumbing & Fire Protection Engineer | NYC, NY | $135,000–$165,000 | 6+ years |
| 1105 | Active | Senior Plumbing/Fire Protection Engineer | Schenectady, NY | $88,000–$122,000 | Minimum 8 years |
| 1106 | Active | Senior Mechanical Engineer / Project Manager | Midland Park, NJ | $150,000–$175,000 | 15+ years |
| 1107 | Active | Project Manager – MEP | Parsippany, NJ | $110,000–$150,000 | 5–8 years |
| 1110 | Active | Project Manager – MEP | Sparta, NJ | $110,000–$150,000 | 5–8 years |
| 1111 | Dormant | Senior Electrical Engineer | NYC, NY | $145,000–$185,000 | 8–10 years |
| 1112 | Active | Senior Electrical Engineer | NYC, NY | $110,000–$135,000 | 7–10 years |
| 1113 | Active | Technology and Design Engineer | NYC, NY | $85,000–$105,000 | 3–5 years |
| 1114 | Active | Senior Electrical Engineer | NYC, NY | $150,000–$180,000 | 15+ years |
| 1115 | Active | Intermediate – Senior– Electrical Engineer | NYC, NY | $115,000–$135,000 | 8+ years |
| 1116 | Active | Intermediate – Senior – Electrical Engineer | NYC, NY | $125,000–$175,000 | Minimum of 10 years |
| 1117 | Active | Electrical Engineer – Team Lead | Newark, NJ; Parsippany, NJ | $105,000–$175,000 | 5-15+ years |
| 1118 | Active | Senior Electrical Engineer | NYC, NY | $175,000–$215,000 | 15+ years |
| 1119 | Active | Electrical Engineer | NYC, NY | $105,000–$155,000 | 5–10 years |
| 1120 | Active | Senior Electrical Engineer | NYC, NY | $150,000–$210,000 | 10+ years |
| 1121 | Active | Electrical Engineer | NYC, NY | $165,000–$197,000 | 7+ years |
| 1122 | Active | Senior Electrical Engineer | NYC, NY | $140,000–$190,000 | 10+ years |
| 1123 | Active | Senior Electrical Engineer | NYC, NY | $115,000–$148,000 | 8+ years |
| 1124 | Active | Senior Electrical Engineer | NYC, NY | $145,000–$185,000 | Minimum 10 years |
| 1125 | Active | Senior Electrical Engineer | NYC, NY | $130,000–$175,000 | 10-20 years |
| 1126 | Active | Senior Electrical Engineer – Project Manager | NYC, NY | $110,000–$160,000 | 7–10 years |
| 1127 | Active | Senior Project Engineer – Electrical | NYC, NY; Boston, MA; Newark, NJ | $110,000–$150,000 | 4+ years |
| 1128 | Active | Electrical Engineer | NYC, NY | $85,000–$130,000 | 2–5 years |
| 1129 | Active | Senior Electrical Engineer – Water/Wastewater | NYC, NY | $135,000–$190,000 | 10 years |
| 1130 | Active | Electrical Engineer | NYC, NY | $90,000–$125,000 | 5–10 years |
| 1131 | Active | Senior Electrical Engineer | Bridgewater, NJ; Pleasantville, NJ | $135,000–$190,000 | 10–15 years |
| 1132 | Active | Principal , Senior Electrical Engineering Leader | NYC, NY | $175,000–$200,000 | 10+ years |
| 1133 | Active | Senior Mechanical Engineer – Healthcare and Laboratory Projects | NYC, NY | $120,000–$155,000 | 7–10 years |
| 1134 | Active | Mechanical Engineer – Healthcare Projects | NYC, NY | $105,000–$135,000 | 5+ years |
| 1135 | Active | Senior Mechanical Engineer – Existing Buildings | NYC, NY | $135,000–$180,000 | 7–10 years |
| 1136 | Active | Mechanical Design Engineer – MEP Consulting | NYC, NY | $95,000–$135,000 | 5+ years |
| 1137 | Active | Intermediate Mechanical Engineer | NYC, NY | $95,000–$125,000 | 5+ years |
| 1138 | Active | Intermediate MEP Project Manager – HVAC | NYC, NY | $115,000–$150,000 | 5+ years |
| 1139 | Active | Principal MEP Engineer – Business Development | Remote (NYC-focused market) | $140,000–$200,000 | 8+ years |
| 1140 | Active | Mechanical Project Engineer – Vertical Building Systems | NYC, NY | $106,000–$145,000 | Minimum 5 years |
| 1141 | Active | Senior Project Engineer – Mechanical | NYC, NY | $120,000–$165,000 | Minimum 4 years |
| 1142 | Active | Lead Mechanical Engineer | NYC, NY | $115,000–$170,000 | 7–10 years |
| 1143 | Active | Senior Mechanical Engineer | NYC, NY | $115,000–$150,000 | 3+ years |
| 1144 | Active | Mechanical Engineer | NYC, NY | $70,000–$150,000 | 5+ years |
| 1145 | Active | Mechanical Engineer | NYC, NY | $130,000–$175,000 | 5–10 years |
| 1146 | Active | Electrical Designer / Engineer | Clarks Summit, PA | $78,000–$95,000 | 3–7 years |
| 1147 | Active | Mechanical Designer / Engineer | Clarks Summit, PA | $78,000–$95,000 | 3–7 years |
| 1148 | Active | MEP Engineering BIM / CAD Specialist | Clarks Summit, PA | $65,000–$115,000 | 2-15 years |
| 1149 | Active | Senior Electrical Engineer / Project Manager | Clarks Summit, PA | $105,000–$145,000 | 8+ years |
| 1150 | Active | Senior Mechanical Engineer / Project Manager | Clarks Summit, PA | $105,000–$145,000 | 8+ years |
| 1151 | Active | Lead Electrical Designer | NYC, NY | $135,000–$175,000 | 8+ years |
| 1152 | Active | Senior Electrical Designer | NYC, NY | $105,000–$140,000 | 4+ years |
| 1153 | Active | Electrical Engineer II | Voorhees, NJ | $95,000–$152,000 | 7-10 years |
| 1154 | Active | Senior BIM Design Specialist | Voorhees, NJ | $65,000–$104,000 | 5+ years |
| 1155 | Active | Senior Electrical Engineer | Voorhees, NJ | $115,000–$175,000 | 12-15 years |
| 1156 | Active | Senior Mechanical Engineer | Voorhees, NJ | $115,000–$175,000 | 12+ years |
| 1157 | Active | Senior Mechanical Engineer / Project Manager | NYC, NY | $115,000–$175,000 | 10+ years |
| 1158 | Active | Senior Engineering Project Manager | Voorhees, NJ; NYC, NY; Philadelphia, PA | $150,000–$200,000 | 15+ years |
| 1159 | Active | Electrical Engineer | NYC, NY | $115,000–$150,000 | 5-10 years |
| 1160 | Active | Structural Engineer | Clarks Summit, PA | $90,000–$120,000 | 5-10 years |
| 1161 | Active | Senior Civil Project Manager | New York, NY | $170,000–$230,000 | 10–15 years |
| 1162 | Active | Senior Highway/Civil Engineer | New York, NY | $142,000–$185,000 | 8–12 years |
| 1163 | Terminated | Senior Transportation Project Manager | Denver, CO | $130,000–$170,000 | 10+ years |
| 1164 | Terminated | Senior Transportation Project Manager | Rancho Cordova, CA | $170,000–$200,000 | 12+ years |
| 1165 | Terminated | Senior Structures/Project Engineer (Bridge) | Rancho Cordova, CA | $135,000–$190,000 | 10+ years |
| 1166 | Terminated | Land Development Project Manager | Louisville, CO | $130,000–$190,000 | 10+ years |
| 1167 | Terminated | Senior Civil CAD Designer | Louisville, CO | $95,000–$130,000 | 10+ years |
| 1168 | Terminated | Water / Wastewater Project Manager | Denver, CO | $125,000–$145,000 | 8+ years |
| 1169 | Active | Water / Wastewater Project Engineer – Pipelines, Pump Stations & Treatment | Denver, CO | $100,000–$120,000 | 5+ years |
| 1170 | Active | Senior Civil Project Manager | Charlotte, NC | $140,000–$165,000 | 10+ years |
| 1171 | Active | Site Civil Project Manager | Charlotte, NC | $115,000–$135,000 | 6-10 years |
| 1172 | Active | Senior Project Engineer – Plumbing/Fire Protection | Madison, NJ | $105,000–$125,000 | 4+ years |
| 1173 | Active | Water / Wastewater Senior Project Engineer – Pipelines, Pump Stations & Treatment | Denver, CO | $141,000–$185,000 | 10+ years |
| 1174 | Active | Senior Transportation Project Manager | Rancho Cordova, CA | $170,000–$200,000 | 12+ years |
| 1175 | Active | Transportation Project Manager | Denver, CO | $130,000–$170,000 | 10+ years |
| 1176 | Active | Senior Structures/Project Engineer (Bridge) | Fresno, CA or Rancho Cordova, CA | $135,000–$190,000 | 10+ years |
| 1177 | Active | Land Development Project Manager | Louisville, CO | $130,000–$190,000 | 10+ years |
| 1178 | Active | Water/Wastewater Project Manager | Denver, CO | $125,000–$142,000 | 8+ years |
| 1179 | Active | Senior Civil CAD Designer | Louisville, CO | $95,000–$128,000 | 10+ years |
| 1180 | Active | Civil Engineer/Project Manager | Raleigh, NC | $140,000–$165,000 | 6-10 years |
| 1181 | Terminated | Assistant Chief Engineer, Structural (Bridge) | Wall Township, NJ | $150,000–$200,000 | 15+ years |
| 1182 | Active | Project Engineer, Structural (Bridge) | Wall Township, NJ | $90,000–$115,000 | 5 to 8 years |
| 1183 | Active | Senior Transportation Engineering Project Manager | Wall Township, NJ | $150,000–$185,000 | 12+ years |
| 1184 | Active | Transportation Engineering Project Manager | Wall Township, NJ | $125,000–$160,000 | 8+ years |
| 1185 | Active | Transportation Group Manager | Wall Township, NJ | $175,000–$225,000 | 15+ years |
| 1186 | Active | Senior Transportation Project Manager | NYC, NY | $175,000–$205,000 | 12+ years |
| 1187 | Active | Senior Mechanical Engineer | Pine Brook, NJ | $100,000–$150,000 | 5+ years |
| 1188 | Active | Senior Electrical Engineer | New York, NY | $130,000–$175,000 | 10+ years |
| 1189 | Active | Senior Electrical Designer | NYC, NY | $120,000–$150,000 | 10+ years |
| 1190 | Active | Plumbing & Fire Protection Engineer | NYC, NY | $135,000–$170,000 | 6+ years |
| 1191 | Active | Senior Mechanical Engineer | NYC, NY | $135,000–$170,000 | 8+ years |
| 1192 | Active | Mechanical Designer | NYC, NY | $85,000–$130,000 | 2+ years |
| 1193 | Active | Lead Electrical Designer | Hollywood, FL | $120,000–$150,000 | 6+ years |
| 1194 | Active | Senior Mechanical Engineer | Hollywood, FL | $140,000–$170,000 | 8+ years |
| 1195 | Active | Plumbing & Fire Protection Design Manager | Hollywood, FL | $120,000–$150,000 | 8+ years |
| 1196 | Active | Lead Plumbing & Fire Protection Designer | Hollywood, FL | $110,000–$145,000 | 6+ years |
| 1197 | Active | Mechanical Project Engineer | NYC, NY | $110,000–$165,000 | 5-12 years |
| 1198 | Active | Assistant Chief Engineer – Structural (Bridge) | Wall Township, NJ | $150,000–$200,000 | 15+ years |
| 1199 | Active | Site/Civil Project Engineer | Raleigh, NC | $115,000–$135,000 | 4+ years |
| 1200 | Active | Senior Mechanical Engineer – Central Utility Plants | Voorhees, NJ | $160,000–$180,000 | 10+ years |
| 1201 | Active | Controls Integration Engineer | Voorhees, NJ | $100,000–$160,000 | 5-10 years |
| 1202 | Active | Electrical Designer | Voorhees, NJ | $65,000–$104,000 | 1-2 years |
| 1203 | Active | Electrical Design Engineer | Voorhees, NJ | $100,000–$160,000 | 5-10 years |
| 1204 | Active | Staff Engineer – Mechanical Engineer | NYC, NY | $90,000–$115,000 | 2-4 years |