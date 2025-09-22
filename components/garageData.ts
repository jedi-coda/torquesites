// components/garageData.ts
const garageData: Record<string, any> = {
  swift: {
    name: "Swift Motor Services",
    phone: "01903 237137",
    email: "swift@example.com",
    address: "Station Rd, Worthing",
    heroLine: "Reliable MOT & Servicing in Worthing",
    colors: { primary: "#FBBF24", secondary: "#000000" },
    services: [
      { name: "MOT", price: "£45" },
      { name: "Servicing", price: "£150" },
      { name: "Diagnostics", price: "£60" },
      { name: "Tyres", price: "£POA" },
    ],
  },
  newtown: {
    name: "Newtown Garage",
    phone: "01494 772277",
    email: "newtown@example.com",
    address: "Chesham, HP5 1AA",
    heroLine: "Trusted MOT & Repairs in Chesham",
    colors: { primary: "#0C1A2B", secondary: "#FFFFFF" },
    services: [
      { name: "MOT", price: "£45" },
      { name: "Servicing", price: "£140" },
      { name: "Diagnostics", price: "£55" },
      { name: "Tyres", price: "£POA" },
    ],
  },
};

export default garageData;
