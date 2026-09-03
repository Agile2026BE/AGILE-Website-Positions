import { jobs1001To1020 } from "./jobs/positions-1001-1020.js";
import { jobs1021To1040 } from "./jobs/positions-1021-1040.js";
import { jobs1041To1060 } from "./jobs/positions-1041-1060.js";
import { jobs1061To1080 } from "./jobs/positions-1061-1080.js";
import { jobs1081To1100 } from "./jobs/positions-1081-1100.js";
import { jobs1101To1112 } from "./jobs/positions-1101-1112.js";
import { jobs1113To1132 } from "./jobs/positions-1113-1132.js";
import { jobs1133To1142 } from "./jobs/positions-1133-1142.js";
import { jobs1143To1152 } from "./jobs/positions-1143-1152.js";
import { jobs1153To1162 } from "./jobs/positions-1153-1162.js";
import { jobs1163To1172 } from "./jobs/positions-1163-1172.js";
import { jobs1173To1180 } from "./jobs/positions-1173-1180.js";
import { jobs1181To1185 } from "./jobs/positions-1181-1185.js";
import { jobs1186To1186 } from "./jobs/positions-1186-1186.js";
import { jobs1187To1187 } from "./jobs/positions-1187-1187.js";
import { jobs1188To1188 } from "./jobs/positions-1188-1188.js";
import { jobs1189To1189 } from "./jobs/positions-1189-1189.js";
import { jobs1190To1190 } from "./jobs/positions-1190-1190.js";

import details1001To1010 from "./jobDetails/details-1001-1010.js";
import details1011To1020 from "./jobDetails/details-1011-1020.js";
import details1021To1030 from "./jobDetails/details-1021-1030.js";
import details1031To1040 from "./jobDetails/details-1031-1040.js";
import details1041To1050 from "./jobDetails/details-1041-1050.js";
import details1051To1060 from "./jobDetails/details-1051-1060.js";
import details1061To1070 from "./jobDetails/details-1061-1070.js";
import details1071To1080 from "./jobDetails/details-1071-1080.js";
import details1081To1090 from "./jobDetails/details-1081-1090.js";
import details1091To1100 from "./jobDetails/details-1091-1100.js";
import details1101To1112 from "./jobDetails/details-1101-1112.js";
import details1113To1122 from "./jobDetails/details-1113-1122.js";
import details1123To1132 from "./jobDetails/details-1123-1132.js";
import details1133To1142 from "./jobDetails/details-1133-1142.js";
import details1143To1152 from "./jobDetails/details-1143-1152.js";
import details1153To1158 from "./jobDetails/details-1153-1158.js";
import details1159To1162 from "./jobDetails/details-1159-1162.js";
import details1163To1167 from "./jobDetails/details-1163-1167.js";
import details1168To1172 from "./jobDetails/details-1168-1172.js";
import details1173To1180 from "./jobDetails/details-1173-1180.js";
import details1181To1185 from "./jobDetails/details-1181-1185.js";
import details1186To1186 from "./jobDetails/details-1186-1186.js";
import details1187To1187 from "./jobDetails/details-1187-1187.js";
import details1188To1188 from "./jobDetails/details-1188-1188.js";
import details1189To1189 from "./jobDetails/details-1189-1189.js";
import details1190To1190 from "./jobDetails/details-1190-1190.js";

import { retiredPositionIds } from "./retiredPositionIds.js";

// Exported (not just used internally) so scripts like
// scripts/submit-indexnow.mjs can look up the slug for a retired ID —
// retired records are kept in these files on purpose (see
// retiredPositionIds.js) but are filtered out of the public `jobs` export
// below.
export const coreJobs = [
  ...jobs1001To1020,
  ...jobs1021To1040,
  ...jobs1041To1060,
  ...jobs1061To1080,
  ...jobs1081To1100,
  ...jobs1101To1112,
  ...jobs1113To1132,
  ...jobs1133To1142,
  ...jobs1143To1152,
  ...jobs1153To1162,
  ...jobs1163To1172,
  ...jobs1173To1180,
  ...jobs1181To1185,
  ...jobs1186To1186,
  ...jobs1187To1187,
  ...jobs1188To1188,
  ...jobs1189To1189,
  ...jobs1190To1190,
  ];

const detailOverlays = [
  ...details1001To1010,
  ...details1011To1020,
  ...details1021To1030,
  ...details1031To1040,
  ...details1041To1050,
  ...details1051To1060,
  ...details1061To1070,
  ...details1071To1080,
  ...details1081To1090,
  ...details1091To1100,
  ...details1101To1112,
  ...details1113To1122,
  ...details1123To1132,
  ...details1133To1142,
  ...details1143To1152,
  ...details1153To1158,
  ...details1159To1162,
  ...details1163To1167,
  ...details1168To1172,
  ...details1173To1180,
  ...details1181To1185,
  ...details1186To1186,
  ...details1187To1187,
  ...details1188To1188,
  ...details1189To1189,
  ...details1190To1190,
  ];

const detailsById = new Map(
  detailOverlays.map((details) => [String(details.id), details]),
  );

// See retiredPositionIds.js: retired IDs stay in the underlying data files
// (nothing above this point is touched) but are filtered out here so they
// never reach the live site.
const retiredIds = new Set(retiredPositionIds.map((entry) => String(entry.id)));

export const jobs = coreJobs
.filter((job) => !retiredIds.has(String(job.id)))
.map((job) => ({
  ...job,
  ...(detailsById.get(String(job.id)) ?? {}),
}));
