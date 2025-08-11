import airplane1 from './assets/images/banner/airplane1.jpg'
import airplane2 from './assets/images/banner/airplane2.jpg'
import hotel1 from './assets/images/banner/hotel1.jpg'
import hotel2 from './assets/images/banner/hotel2.jpg'
import bus1 from './assets/images/banner/bus1.jpg'
import bus2 from './assets/images/banner/bus2.jpg'
import tour1 from './assets/images/banner/tour1.jpg'
import tour2 from './assets/images/banner/tour2.jpg'

export const bannerItems = [
    {
        id: "bi01",
        img: [airplane1, airplane2],
        textHeader: "Fly to Your Dream Destination",
        textBody: "Seamless booking, unbeatable fares, and flights to over 100+ countries.",
        textSubBody: "Whether it’s a quick getaway or a long-haul adventure, we’ve got you covered.",
        ctaButton1: "Book a Flight",
        ctaButton2: "View Promotions",
        ctaPath: "/flights",
    },
    {
        id: "bi02",
        img: [hotel1, hotel2],
        textHeader: "Stay in Comfort, Anywhere",
        textBody: "From budget-friendly stays to 5-star luxury, find the perfect room for your trip.",
        textSubBody: "Secure your spot now and enjoy exclusive member discounts.",
        ctaButton1: "Book a Hotel",
        ctaButton2: "Exclusive Deals",
        ctaPath: "/hotels",
    },
    {
        id: "bi03",
        img: [bus1, bus2],
        textHeader: "Travel Smart by Bus",
        textBody: "Affordable and convenient bus routes connecting major cities and towns.",
        textSubBody: "Reserve your seat instantly with real-time availability.",
        ctaButton1: "Find Buses",
        ctaButton2: "Low Fare Alerts",
        ctaPath: "/buses",
    },
    {
        id: "bi04",
        img: [tour1, tour2],
        textHeader: "Explore with Guided Tours",
        textBody: "Curated experiences with local guides to make your trip unforgettable.",
        textSubBody: "Choose from cultural tours, adventure trips, and hidden gems.",
        ctaButton1: "Browse Tours",
        ctaButton2: "Hot Picks",
        ctaPath: "/tours",
    },
];

export const navItems = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Products",
        path: "/product",
    },
    {
        title: "About Us",
        path: "/about-us",
    },
    {
        title: "Contact Us",
        path: "/contact",
    }
]