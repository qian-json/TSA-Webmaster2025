import { createContext } from "react";

export const ResourcesContext = createContext();

const resources = [
    {
        id: "katy-christian-ministries",
        imageUrl: "/src/assets/food1.jpg",
        link: "https://ktcm.org/",
        name: "Katy Christian Ministries",
        description: "Local nonprofit offering food assistance, financial aid, and supportive services to families in need within the Katy community.",
        spotlighted: true,
        tags: ["food assistance", "housing assistance", "clothing assistance"],
    },
    {
        id: "the-ballard-house",
        imageUrl: "/src/assets/house1.jpg",
        link: "https://www.theballardhouse.org/",
        name: "The Ballard House",
        description: "Provides temporary housing and support services for patients and caregivers traveling for medical treatment in the Houston area.",
        spotlighted: true,
        tags: ["housing assistance"],
    },
    {
        id: "clothed-by-faith-katy",
        imageUrl: "/src/assets/church1.jpg",
        link: "https://www.clothedbyfaith.org/",
        name: "Clothed By Faith Katy",
        description: "Organization offering clothing and essential items to children and families through local school and agency partnerships.",
        spotlighted: true,
        tags: ["clothing assistance"],
    },
    {
        id: "compassion-katy",
        imageUrl: "/src/assets/conference1.jpg",
        link: "https://compassionkaty.org/",
        name: "Compassion Katy",
        description: "A 501(c)(3) non-profit that collaborates with local organizations and individuals to provide resources to economically disadvantaged children.",
        spotlighted: false,
        tags: ["family support"],
    },
    {
        id: "katy-responds",
        imageUrl: "/src/assets/construction1.jpg",
        link: "https://www.katyresponds.org/",
        name: "Katy Responds",
        description: "Volunteer organization assisting residents affected by disasters and emergencies with rebuilding and recovery efforts.",
        spotlighted: false,
        tags: ["disaster relief", "housing assistance"],
    },
    {
        id: "workforce-solutions-katy",
        imageUrl: "/src/assets/office1.jpg",
        link: "https://locations.wrksolutions.com/en/katy",
        name: "Workforce Solutions Katy",
        description: "Employment resource center providing job search support, training programs, and career development services for local residents.",
        spotlighted: false,
        tags: ["employment services"],
    },
    {
        id: "katy-cares-inc",
        imageUrl: "/src/assets/parent1.jpg",
        link: "https://katycares.org/",
        name: "Katy Cares",
        description: "501(c)3 non-profit organization founded in 2016 offering support to single-parent families who are victims of trauma.",
        spotlighted: false,
        tags: ["family support"],
    },
    {
        id: "the-arc-of-katy",
        imageUrl: "/src/assets/assistedhome1.jpg",
        name: "The Arc of Katy",
        link: "https://www.thearcofkaty.org/",
        description: "Organization serving individuals with intellectual and developmental disabilities, enabling each person to be included as a respected member of their community.",
        spotlighted: false,
        tags: ["disability support"],
    },
    {
        id: "united-way-greater-houston",
        imageUrl: "/src/assets/house2.jpg",
        link: "https://www.unitedwayhouston.org/",
        name: "United Way Greater Houston",
        description: "Information and referral service connecting residents with housing, food, and utility programs in the region.",
        spotlighted: false,
        tags: ["information", "food assistance", "housing assistance"],
    },
];

export function ResourcesProvider({ children }) {
  return (
    <ResourcesContext.Provider value={resources}>
      {children}
    </ResourcesContext.Provider>
  );
}

