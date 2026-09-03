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
import { jobs1191To1191 } from "./jobs/positions-1191-1191.js";
import { jobs1192To1192 } from "./jobs/positions-1192-1192.js";
import { jobs1193To1193 } from "./jobs/positions-1193-1193.js";
import { jobs1194To1194 } from "./jobs/positions-1194-1194.js";
import { jobs1195To1195 } from "./jobs/positions-1195-1195.js";
import { jobs1196To1196 } from "./jobs/positions-1196-1196.js";
import { jobs1197To1197 } from "./jobs/positions-1197-1197.js";
import { jobs1198To1198 } from "./jobs/positions-1198-1198.js";
import { jobs1199To1199 } from "./jobs/positions-1199-1199.js";
import { jobs1200To1200 } from "./jobs/positions-1200-1200.js";
import { jobs1201To1201 } from "./jobs/positions-1201-1201.js";
import { jobs1202To1202 } from "./jobs/positions-1202-1202.js";
import { jobs1203To1203 } from "./jobs/positions-1203-1203.js";
import { jobs1204To1204 } from "./jobs/positions-1204-1204.js";

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
import details1191To1191 from "./jobDetails/details-1191-1191.js";
import details1192To1192 from "./jobDetails/details-1192-1192.js";
import details1193To1193 from "./jobDetails/details-1193-1193.js";
import details1194To1194 from "./jobDetails/details-1194-1194.js";
import details1195To1195 from "./jobDetails/details-1195-1195.js";
import details1196To1196 from "./jobDetails/details-1196-1196.js";
import details1197To1197 from "./jobDetails/details-1197-1197.js";
import details1198To1198 from "./jobDetails/details-1198-1198.js";
import details1199To1199 from "./jobDetails/details-1199-1199.js";
import details1200To1200 from "./jobDetails/details-1200-1200.js";
import details1201To1201 from "./jobDetails/details-1201-1201.js";
import details1202To1202 from "./jobDetails/details-1202-1202.js";
import details1203To1203 from "./jobDetails/details-1203-1203.js";
import details1204To1204 from "./jobDetails/details-1204-1204.js";

import { terminatedPositionIds } from "./terminatedPositionIds.js";
import { dormantPositionIds } from "./dormantPositionIds.js";

// Exported (not just used internally) so scripts like
// scripts/submit-indexnow.mjs can look up the slug for a terminated or
// dormant ID — those records are kept in these files on purpose (see
// terminatedPositionIds.js and dormantPositionIds.js) but are filtered out
// of the public `jobs` export below.
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
  ...jobs1191To1191,
  ...jobs1192To1192,
  ...jobs1193To1193,
  ...jobs1194To1194,
  ...jobs1195To1195,
  ...jobs1196To1196,
  ...jobs1197To1197,
  ...jobs1198To1198,
  ...jobs1199To1199,
  ...jobs1200To1200,
  ...jobs1201To1201,
  ...jobs1202To1202,
  ...jobs1203To1203,
  ...jobs1204To1204,
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
  ...details1191To1191,
  ...details1192To1192,
  ...details1193To1193,
  ...details1194To1194,
  ...details1195To1195,
  ...details1196To1196,
  ...details1197To1197,
  ...details1198To1198,
  ...details1199To1199,
  ...details1200To1200,
  ...details1201To1201,
  ...details1202To1202,
  ...details1203To1203,
  ...details1204To1204,
  ];

const detailsById = new Map(
  detailOverlays.map((details) => [String(details.id), details]),
  );

// See terminatedPositionIds.js and dormantPositionIds.js: both kinds of IDs
// stay in the underlying data files (nothing above this point is touched)
// but are filtered out here so they never reach the live site.
const hiddenIds = new Set([
  ...terminatedPositionIds.map((entry) => String(entry.id)),
  ...dormantPositionIds.map((entry) => String(entry.id)),
]);

export const jobs = coreJobs
.filter((job) => !hiddenIds.has(String(job.id)))
.map((job) => ({
  ...job,
  ...(detailsById.get(String(job.id)) ?? {}),
}));
