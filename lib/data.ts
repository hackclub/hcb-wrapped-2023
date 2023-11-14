import friendlyWords from 'friendly-words';
import title from 'title'
import { faker, allFakers } from '@faker-js/faker';
import type { Faker } from '@faker-js/faker';

export type moneyCents = number;

export type date = `${number}-${number}-${number}`;

export type orgCategory = "hackathon" | "hack club" | "nonprofit" | "event" | "high school hackathon" | "robotics team" | "hardware grant" | "hack club hq" | "outernet guild" | "grant recipient" | "salary" | "ai";

export interface SpendingByLocation {
  [key: string]: ({
    amount: moneyCents;
    [key: string]: string | moneyCents;
  })[] | moneyCents;
}

export interface PlatinumCard {
  organization: string;
  lastFourDigits: string
} 

export interface SpendingByCategory {
  [key: string]: number;
}

export interface SpendingByMerchant {
  [key: string]: number;
}

export interface IndividualData {
  totalMoneySpent: number;
  spendingByDate: {
    [key: date]: moneyCents;
  };
  ranking: {
    overall: number | null;
    mutuals: number | null;
    teenagers: number | null;
    adults: number | null;
  };
  averageReceiptUploadTime: number;
  lostReceiptCount: number;
  spendingByLocation: SpendingByLocation;
  platinumCard: PlatinumCard | null;
  words: string[];
  spendingByCategory: SpendingByCategory;
  spendingByMerchant: SpendingByMerchant;
}



export interface OrgData {  
  individualSpent: moneyCents;
  spent: moneyCents;
  raised: moneyCents;
  spendingByDate: {
    [key: date]: moneyCents;
  };
  spendingByLocation: SpendingByLocation;
  spendingByCategory: SpendingByCategory;
  spendingByMerchant: SpendingByMerchant;
  category: orgCategory;
}

export interface HCBGrowthStat {
  total: number;
  new: number;
}

export interface SpendingByDate {
  [key: date]: moneyCents;
}

export interface HCBData {
  spent: moneyCents;
  raised: moneyCents;
  organizations: HCBGrowthStat;
  users: HCBGrowthStat;
  spendingByLocation: SpendingByLocation;
  spendingByCategory: SpendingByCategory;
  spendingByMerchant: SpendingByMerchant;
  spendingByDate: SpendingByDate;
}

export interface WrappedData {
  individual: IndividualData;
  organizations: {
    [key: string]: OrgData;
  };
  hcb: HCBData;
}

export default {
  individual: {
    totalMoneySpent: 0.00,
    spendingByDate: {
      "01-01-2023": 0
    },
    ranking: {
      overall: 0.05,
      mutuals: 0.01,
      teenagers: 0.01,
      adults: null,
    },
    averageReceiptUploadTime: 55, // in seconds
    lostReceiptCount: 9999999,
    platinumCard: {
      organization: "Sam's Shillings",
      lastFourDigits: "5609"
    },
    words: ["legal", "safe", "not fraud", "approved", "approved by @zrl"],
    spendingByLocation: {
      "United States of America": [
        {
          postal: "90069",
          amount: 0
        }
      ],
      "Singapore": 0,
      "India": [
        {
          city: "Gurgaon",
          amount: 0
        }
      ]
    },
    spendingByCategory: {
      "fast food": 9,
      "health": 72,
      "buisness expenses": 93
    },
    spendingByMerchant: {
      "AMAZON.COM": 99990,
      "Covenant Hills Christian Campground": 1
    }
  },
  organizations: {
    "hq": {
      individualSpent: 0,
      category: "hack club hq",
      spent: 0,
      raised: 0,
      spendingByDate: {
        "01-01-2023": 0
      },
      spendingByLocation: {
        "United States of America": [
          {
            postal: "90069",
            amount: 0
          }
        ],
        "Singapore": 0,
        "India": [
          {
            city: "Gurgaon",
            amount: 0
          }
        ]
      },
      spendingByCategory: {
        "fast food": 9,
        "health": 72,
        "buisness expenses": 93
      },
      spendingByMerchant: {
        "AMAZON.COM": 99990,
        "Covenant Hills Christian Campground": 1
      }
    }
  },
  hcb: {
    raised: 0.00,
    spent: 0.00,
    organizations: {
      total: 22,
      new: 1
    },
    users: {
      total: 2103,
      new: 99,
    },
    spendingByLocation: {
      "United States of America": [
        {
          postal: "90069",
          amount: 0
        }
      ],
      "Singapore": 0,
      "India": [
        {
          city: "Gurgaon",
          amount: 0
        }
      ]
    },
    spendingByCategory: {
      "fast food": 9,
      "health": 72,
      "buisness expenses": 93
    },
    spendingByMerchant: {
      "AMAZON.COM": 99990,
      "Covenant Hills Christian Campground": 1
    },
    spendingByDate: {
      "01-01-2023": 0
    }
  }
} satisfies WrappedData;

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomWord(words: string[]){
  return words[Math.floor(Math.random() * words.length)];
}

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export function generateTestOrganizations(){
  let organizations: {
    [key: string]: OrgData;
  } = {}
  for (let i = 0; i < getRandomArbitrary(1, 20); i++) {
    let name = title(`${getRandomWord(friendlyWords.predicates)} ${getRandomWord(friendlyWords.teams)}`)
    let category = ["hackathon", "hack club", "nonprofit", "event", "high school hackathon", "robotics team", "hardware grant", "hack club hq", "outernet guild", "grant recipient", "salary", "ai"][Math.floor(Math.random() * 12)] as orgCategory
    let spent = getRandomArbitrary(0, 9999)
    let raised = getRandomArbitrary(spent, 10999)
    let individualSpent = getRandomArbitrary(0, spent)
    let slug = camelToSnakeCase(name)
    organizations[slug] = {
      name,
      category,
      spent,
      raised,
      individualSpent,
      spendingByDate: generateSpendingByDate(spent),
      spendingByLocation: generateSpendingByLocation(spent),
      spendingByCategory: generateSpendingByCategory(spent),
      spendingByMerchant: generateSpendingByMerchant(spent)
    } as OrgData
  }
  return organizations
}

export function generateSpendingByCategory(max: number): SpendingByCategory{
  const categories = [
    "fast food", 
    "health", 
    "business expenses", 
    "travel", 
    "entertainment",
    "groceries",
    "clothing",
    "electronics",
    "home improvement",
    "beauty",
    "books",
    "office supplies",
    "pet supplies",
    "toys",
    "sporting goods",
    "music",
    "movies",
    "jewelry",
    "crafts",
    "automotive",
    "baby",
    "food delivery",
    "furniture",
    "gifts",
    "hobbies",
    "outdoor",
    "party supplies",
    "tools",
    "video games",
    "other"
  ];
  const spendingByCategory: SpendingByCategory = {}
  let totalSpent = 0
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    if (i === categories.length - 1) {
      spendingByCategory[category] = max - totalSpent
    } else if (Math.random() < 0.9) {
      const amount = getRandomArbitrary(1, max - totalSpent - (categories.length - i - 1))
      spendingByCategory[category] = amount
      totalSpent += amount
    }
  }
  return spendingByCategory
}

export function generateSpendingByMerchant(max: number): SpendingByMerchant {
  const merchants = Array(getRandomArbitrary(20, 200)).fill(0).map(() => faker.company.name().toUpperCase())
  const spendingByMerchant: SpendingByMerchant = {}
  let totalSpent = 0
  for (let i = 0; i < merchants.length; i++) {
    const merchant = merchants[i]
    if (i === merchants.length - 1) {
      spendingByMerchant[merchant] = max - totalSpent
    } else if (Math.random() < 0.8) {
      const amount = getRandomArbitrary(1, max - totalSpent - (merchants.length - i - 1))
      spendingByMerchant[merchant] = amount
      totalSpent += amount
    }
  }
  return spendingByMerchant
}

const countries = {
  "United States of America": allFakers.en_US,
  "Australia": allFakers.en_AU,
  "Czechia": allFakers.cs_CZ,
  "Germany": allFakers.de,
  "Austria": allFakers.de_AT,
  "Switzerland": allFakers.de_CH,
  "Greece": allFakers.el,
  "Canada": allFakers.en_CA,
  "Great Britain": allFakers.en_GB,
  "India": allFakers.en_IN,
  "Nigeria": allFakers.en_NG,
  "United States": allFakers.en_US,
  "South Africa": allFakers.en_ZA,
  "Spain": allFakers.es,
  "Mexico": allFakers.es_MX,
  "Finland": allFakers.fi,
  "France": allFakers.fr,
  "Belgium": allFakers.fr_BE,
  "Indonesia": allFakers.id_ID,
  "Italy": allFakers.it,
  "Japan": allFakers.ja,
  "Korea": allFakers.ko,
  "Netherlands": allFakers.nl,
  "Norway": allFakers.nb_NO,
  "Poland": allFakers.pl,
  "Brazil": allFakers.pt_BR,
  "Portugal": allFakers.pt_PT,
  "Sweden": allFakers.sv,
  "Thailand": allFakers.th,
  "Turkish": allFakers.tr,
  "Ukraine": allFakers.uk,
  "China": allFakers.zh_CN,
  "Taiwan": allFakers.zh_TW,
}

export function generateSpendingByLocation(max: number, minCountries: number = 1): SpendingByLocation {
  const locations = Array(getRandomArbitrary(minCountries, 20)).fill(0).map(() => Object.keys(countries)[Math.floor(Math.random() * Object.keys(countries).length)] as string)
  const spendingByLocation: SpendingByLocation = {}
  let totalSpent = 0
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i]
    if (i === locations.length - 1) {
      spendingByLocation[location] = max - totalSpent
    } else if (Math.random() < 0.2) {
      const amount = getRandomArbitrary(1, max - totalSpent - (locations.length - i - 1))
      spendingByLocation[location] = amount
    } else if (Math.random() < 0.8) {
      let amount = getRandomArbitrary(1, max - totalSpent - (locations.length - i - 1))
      const subdivisions = []
      // @ts-ignore
      let localFaker: Faker = countries[location]
      for (let a = 0; a < getRandomArbitrary(0, 300) && amount > 0; i++) {
        let type = ['postal', 'city', 'state'][Math.floor(Math.random() * 3)] 
        let randomLocation = ""
        if(type == "postal"){
            randomLocation = localFaker.location.zipCode()
        }
        else if(type == "city"){
            randomLocation = localFaker.location.city()
        }
        else if(type == "state"){
            randomLocation = localFaker.location.state()
        }
        const spendingData = {
          amount: getRandomArbitrary(1, amount),
          [type]: randomLocation
        }
        amount = amount - spendingData.amount
        subdivisions.push(spendingData)
      }
      totalSpent += amount
      spendingByLocation[location] = subdivisions
    }
  }
  return spendingByLocation
}

export function generateSpendingByDate(max: number): SpendingByDate {
  const daysInYear = 365
  const spendingByDate: SpendingByDate = {}
  let totalSpent = 0
  for (let i = 0; i < daysInYear; i++) {
    const date = new Date(2023, 0, i + 1)
    if (i === daysInYear - 1) {
      spendingByDate[date.toISOString().slice(0, 10).replaceAll("/", "-")  as date] = max - totalSpent
    } else {
      const amount = getRandomArbitrary(0, (max - totalSpent) / 40)
      spendingByDate[date.toISOString().slice(0, 10).replaceAll("/", "-") as date] = amount
      totalSpent += amount
    }
  }
  return spendingByDate
}


export function generateTestData(){
  let totalMoneySpent = Math.ceil(Math.random() * 100000)
  let overallRankingBracket = Math.ceil(Math.random() * 19) 
  let teenager = Math.random() > 0.5
  let adult = !teenager
  let organizations = generateTestOrganizations()
  let newOrganizations = getRandomArbitrary(40, 1000)
  let newUsers = getRandomArbitrary(newOrganizations, 1500)
  let individual = {
    totalMoneySpent,
    ranking: {
      overall: overallRankingBracket / 20,
      mutuals: getRandomArbitrary(1, overallRankingBracket) / 20,
      teenagers: teenager ? getRandomArbitrary(1, overallRankingBracket) / 20 : null,
      adults: adult ? getRandomArbitrary(1, overallRankingBracket) / 20 : null,
    },
    averageReceiptUploadTime: getRandomArbitrary(60, 63072000), // in seconds
    lostReceiptCount: getRandomArbitrary(0, 300),
    platinumCard: Math.random() > 0.5 ? {
      organization: title(`${getRandomWord(friendlyWords.predicates)} ${getRandomWord(friendlyWords.teams)}`),
      lastFourDigits: zeroPad(getRandomArbitrary(0, 9999), 4)
    } : null,
    words: Array(getRandomArbitrary(5, 20)).fill(0).map(() => getRandomWord(friendlyWords.predicates)),
    spendingByDate: generateSpendingByDate(totalMoneySpent),
    spendingByLocation: generateSpendingByLocation(totalMoneySpent),
    spendingByCategory: generateSpendingByCategory(totalMoneySpent),
    spendingByMerchant: generateSpendingByMerchant(totalMoneySpent)
  }

  let hcb = {
    raised: getRandomArbitrary(totalMoneySpent, 9999999),
    spent: getRandomArbitrary(totalMoneySpent, 9999999),
    organizations: {
      total: getRandomArbitrary(newOrganizations, 3000),
      new: newOrganizations
    },
    users: {
      total: getRandomArbitrary(newUsers, 6000),
      new: newUsers,
    },
    spendingByDate: {},
    spendingByLocation: {},
    spendingByCategory: {},
    spendingByMerchant: {}
  }

  hcb.spendingByDate = generateSpendingByDate(hcb.spent)
  hcb.spendingByLocation = generateSpendingByLocation(hcb.spent, 10)
  hcb.spendingByCategory = generateSpendingByCategory(hcb.spent)
  hcb.spendingByMerchant = generateSpendingByMerchant(hcb.spent)

  let data: WrappedData = {
    individual,
    organizations,
    hcb
  }

  return data
}