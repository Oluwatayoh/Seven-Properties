export type Property = {
  id: string;
  collectionId: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  imageUrls: string[];
  imageHints: string[];
};

export const propertiesData: Property[] = [
  {
    id: "ikoyi-1",
    collectionId: "ikoyi-residence",
    title: "The Ambrose",
    price: "₦1.2B",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7500,
    description: "A stunning waterfront masterpiece with unmatched views of the Lagos lagoon. The Ambrose offers an infinity pool, private cinema, and a state-of-the-art gym.",
    imageUrls: [
      "https://picsum.photos/seed/ikoyi1/800/600",
      "https://picsum.photos/seed/ikoyi2/800/600",
      "https://picsum.photos/seed/ikoyi3/800/600"
    ],
    imageHints: ["modern mansion", "luxury interior", "poolside lounge"]
  },
  {
    id: "ikoyi-2",
    collectionId: "ikoyi-residence",
    title: "Gerard Place",
    price: "₦950M",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6000,
    description: "An architectural marvel in Old Ikoyi, Gerard Place boasts double-height ceilings, a lush private garden, and bespoke finishings from world-renowned designers.",
    imageUrls: [
      "https://picsum.photos/seed/ikoyi4/800/600",
      "https://picsum.photos/seed/ikoyi5/800/600",
      "https://picsum.photos/seed/ikoyi6/800/600"
    ],
    imageHints: ["villa exterior", "grand staircase", "formal garden"]
  },
  {
    id: "banana-1",
    collectionId: "banana-island-villa",
    title: "The Onyx",
    price: "₦2.5B",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 10000,
    description: "The crown jewel of Banana Island. The Onyx features its own private jetty, a rooftop helipad, and panoramic windows offering 360-degree views.",
    imageUrls: [
      "https://picsum.photos/seed/banana1/800/600",
      "https://picsum.photos/seed/banana2/800/600",
      "https://picsum.photos/seed/banana3/800/600"
    ],
    imageHints: ["luxury villa", "yacht dock", "rooftop view"]
  },
  {
    id: "banana-2",
    collectionId: "banana-island-villa",
    title: "The Palm",
    price: "₦1.8B",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8200,
    description: "Experience resort-style living at The Palm. This estate includes a tennis court, a serene spa, and expansive terraces perfect for entertaining.",
    imageUrls: [
      "https://picsum.photos/seed/banana4/800/600",
      "https://picsum.photos/seed/banana5/800/600",
      "https://picsum.photos/seed/banana6/800/600"
    ],
    imageHints: ["tropical estate", "spa room", "outdoor patio"]
  },
  {
    id: "vi-1",
    collectionId: "vi-penthouse",
    title: "The Skyline",
    price: "₦800M",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4500,
    description: "A duplex penthouse offering breathtaking views of the Eko Atlantic. The Skyline features a private elevator, rooftop jacuzzi, and floor-to-ceiling glass walls.",
    imageUrls: [
      "https://picsum.photos/seed/vi1/800/600",
      "https://picsum.photos/seed/vi2/800/600",
      "https://picsum.photos/seed/vi3/800/600"
    ],
    imageHints: ["city penthouse", "rooftop hot_tub", "modern kitchen"]
  },
  {
    id: "vi-2",
    collectionId: "vi-penthouse",
    title: "The Aerie",
    price: "₦720M",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4100,
    description: "Perched atop a premier residential tower, The Aerie is a haven of tranquility with a wraparound terrace, chef's kitchen, and smart home automation.",
    imageUrls: [
      "https://picsum.photos/seed/vi4/800/600",
      "https://picsum.photos/seed/vi5/800/600",
      "https://picsum.photos/seed/vi6/800/600"
    ],
    imageHints: ["apartment view", "luxury bathroom", "open living_room"]
  }
];

export const collectionsData = [
    {
      id: 'ikoyi-residence',
      title: 'The Ikoyi Collection',
      location: 'Ikoyi, Lagos',
      description: 'A selection of investment-grade residences offering waterfront views and unparalleled architectural design in the heart of Ikoyi.'
    },
    {
      id: 'banana-island-villa',
      title: 'Banana Island Estates',
      location: 'Banana Island, Lagos',
      description: 'The pinnacle of ultra-luxury living. These exclusive estates in Banana Island feature private marinas, expansive grounds, and bespoke amenities.'
    },
    {
      id: 'vi-penthouse',
      title: 'Victoria Island Penthouses',
      location: 'Victoria Island, Lagos',
      description: 'Soar above the city in our Victoria Island Penthouses, offering stunning cityscape views, rooftop terraces, and modern, sophisticated interiors.'
    },
  ];
