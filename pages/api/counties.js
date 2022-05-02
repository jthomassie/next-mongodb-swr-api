// pages/api/counties.js

import { connectToDatabase } from "../../lib/mongodb";

//
let col = process.env.MONGODB_COL;

// query
let query = { AMPKE001: { $gt: 500000 } };

// group, count by subtype
let group = {
  _id: "$properties.SUBTYPE",
  count: { $count: {} },
};
//
const Connect = async (req, res) => {
  const { db } = await connectToDatabase();

  let withAtts = {
    POP: "$AMPKE001",
    GISJOIN: 1,
    STUSAB: 1,
    STATE: 1,
    STATEA: 1,
    COUNTY: 1,
    COUNTYA: 1,
    NAME_M: 1,
    _id: 0,
  };

  let withoutAtts = {
    CTY_SUBA: 0,
    PLACEA: 0,
    TRACTA: 0,
    BLCK_GRPA: 0,
    C_CITYA: 0,
    AIANHHA: 0,
    RES_ONLYA: 0,
    TRUSTA: 0,
    AIHHTLI: 0,
    TRBL_SUBA: 0,
    REGIONA: 0,
    DIVISIONA: 0,
    AITS: 0,
    ANRCA: 0,
    CBSAA: 0,
    CSAA: 0,
    METDIVA: 0,
    MEMI: 0,
    NECTAA: 0,
    C_NECTAA: 0,
    NECTADIVA: 0,
    URB_AREAA: 0,
    CDA: 0,
    STLEG_UPA: 0,
    STLEG_LOA: 0,
    ZCTAA: 0,
    SUBMCDA: 0,
    SD_ELMA: 0,
    SD_SECA: 0,
    SD_UNIA: 0,
    UR: 0,
    PCI: 0,
    PUMAA: 0,
    TRBL_CTA: 0,
    TRBL_BGA: 0,
    NAME_E: 0,
    NAME_M: 0,
    AMPKM001: 0,
    AMPKM002: 0,
    AMPKM003: 0,
    AMPKM004: 0,
    AMPKM005: 0,
    AMPKM006: 0,
    AMPKM007: 0,
    AMPKM008: 0,
    AMPKM009: 0,
    AMPKM010: 0,
    AMPKM011: 0,
    AMPKM012: 0,
    AMPKM013: 0,
    AMPKM014: 0,
    AMPKM015: 0,
    AMPKM016: 0,
    AMPKM017: 0,
    AMPKM018: 0,
    AMPKM019: 0,
    AMPKM020: 0,
    AMPKM021: 0,
    AMPKM022: 0,
    AMPKM023: 0,
    AMPKM024: 0,
    AMPKM025: 0,
    AMPKM026: 0,
    AMPKM027: 0,
    AMPKM028: 0,
    AMPKM029: 0,
    AMPKM030: 0,
    AMPKM031: 0,
    AMPKM032: 0,
    AMPKM033: 0,
    AMPKM034: 0,
    AMPKM035: 0,
    AMPKM036: 0,
    AMPKM037: 0,
    AMPKM038: 0,
    AMPKM039: 0,
    AMPKM040: 0,
    AMPKM041: 0,
    AMPKM042: 0,
    AMPKM043: 0,
    AMPKM044: 0,
    AMPKM045: 0,
    AMPKM046: 0,
    AMPKM047: 0,
    AMPKM048: 0,
    AMPKM049: 0,
    AMPLM001: 0,
    AMPLM002: 0,
    AMPLM003: 0,
    AMPVM001: 0,
    AMPWM001: 0,
    AMPWM002: 0,
    AMPWM003: 0,
    AMPWM004: 0,
    AMPWM005: 0,
    AMPWM006: 0,
    AMPWM007: 0,
    AMPWM008: 0,
    AMPWM009: 0,
    AMPWM010: 0,
  };

  // clean up aggregation
  // const counties = await db
  //   .collection(col)
  //   .aggregate([
  //     { $match: query },
  //     // { $group: group },
  //     { $project: withoutAtts },
  //     // { $sort: { GISJOIN: 1 } },
  //     { $out: { db: "census2020", coll: "countiesclean" } },
  //   ])
  //   .toArray();

  // filter aggregation
  const counties = await db
    .collection("countiesclean")
    .aggregate([
      { $match: query },
      { $project: withAtts },
      { $sort: { POP: -1 } },
    ])
    .toArray();

  // query
  // const counties = await db
  //   .collection("countiesclean")
  //   .find(query)
  //   .project(withAtts)
  //   .sort({ AMPKE001: -1 })
  //   // .limit(20)
  //   .toArray();

  //
  res.status(200).json({ counties });
};

export default Connect;
