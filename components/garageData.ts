// components/garageData.ts
const garageData: Record<string, any> = {
  newtown: {
    name: "Newtown Garage Chesham",
    phone: "01494 77 22 77",
    emailFallback: "bookings@motmatch.co.uk", // safer than your personal email
    address: "456 High Street, Chesham, HP5 2BB",
    heroLine: "Your trusted local garage for MOT & repairs",
    heroImage: "/images/garage-hero.jpg", // replace with real NG image
    colors: {
      primary: "#009688", // teal from NG logo
      secondary: "#FFFFFF", // white
    },
    logo: "/logos/newtown.png", // your NG logo
    hours: [
      "Monday: 8am – 5pm",
      "Tuesday: 8am – 5pm",
      "Wednesday: 8am – 5pm",
      "Thursday: 8am – 5pm",
      "Friday: 8am – 5pm",
      "Saturday: Closed",
      "Sunday: Closed",
    ],
    services: [
      {
        name: "MOT Test",
        desc: "DVSA-approved MOT testing centre.",
        price: 54.85,
        image: "/images/mot.jpg",
      },
      {
        name: "Full Service",
        desc: "Complete service with oil, filter & safety checks.",
        price: 199,
        image: "/images/service.jpg",
      },
      {
        name: "Exhausts",
        desc: "Supply & fitting of exhaust systems.",
        price: 129,
        image: "/images/exhausts.jpg",
      },
    ],
  },
  // other garages...
};

export default garageData;


