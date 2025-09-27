// components/garageData.tsx
const garageData: Record<string, any> = {
  newtown: {
    name: "Newtown Garage",
    phone: "01494 77 22 77",
    emailFallback: "info@newtowngarage.co.uk",
    address: "123 Main Road, Chesham, HP5 1AA",
    heroLine: "Trusted MOT & Servicing in Chesham",
    heroImages: [
      "/images/customer.jpg",
      "/images/tech.jpg",
      "/images/prestige.jpg",
    ],
    colors: { primary: "#E91E63", secondary: "#FFFFFF" },
    logo: "/logos/newtown.png",
    services: [
      {
        name: "MOT",
        desc: "DVSA-approved MOT testing.",
        icon: "Car",
      },
      {
        name: "Servicing",
        desc: "Full & interim servicing for all makes.",
        icon: "Wrench",
      },
      {
        name: "Diagnostics",
        desc: "Advanced diagnostics & repairs.",
        icon: "Cpu",
      },
    ],
    hours: {
      monFri: "8AM – 5PM",
      sat: "Closed",
      sun: "Closed",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2472.112199380249!2d-0.6103956999999999!3d51.7126898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48765d057ffc1b21%3A0x3808012303af4373!2sNewtown%20Garage%20Chesham!5e0!3m2!1sen!2suk!4v1758659883473!5m2!1sen!2suk",
  },

  swift: {
    name: "Swift Motor Services",
    phone: "01903 237137",
    emailFallback: "info@swiftmotorservices.co.uk",
    address:
      "Unit 22, Ham Bridge Trading Estate, Willowbrook Rd, Worthing BN14 8NA",
    heroLine: "Reliable MOT & Servicing in Worthing",
    heroImages: [
      "/images/customer.jpg",
      "/images/tech.jpg",
      "/images/prestige.jpg",
    ],
    colors: { primary: "#E91E63", secondary: "#FFFFFF" },
    logo: "/logos/swift.png",
    services: [
      {
        name: "MOT",
        desc: "DVSA-approved MOT testing.",
        icon: "Car",
      },
      {
        name: "Servicing",
        desc: "Full & interim servicing for all makes.",
        icon: "Wrench",
      },
      {
        name: "Diagnostics",
        desc: "Fault finding & warning lights.",
        icon: "Cpu",
      },
    ],
    hours: {
      monFri: "8AM – 5PM",
      sat: "Closed",
      sun: "Closed",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.467520560671!2d-0.35142540000000005!3d50.8225036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875986c907b76bf%3A0xb57c8c4377a2c0ad!2sSwift%20Motor%20Services!5e0!3m2!1sen!2suk!4v1758659851395!5m2!1sen!2suk",
  },
};

export default garageData;

