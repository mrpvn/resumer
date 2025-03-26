import NetflixTemplate from "@/templates/netflix";
import StandardTemplate from "@/templates/standard";

export const templates = [
  {
    id: "standard",
    name: "Standard",
    image: "/templates/standard.png",
    locked: false,
    price: 0,
    component: StandardTemplate,
  },
  {
    id: "netflix",
    name: "Netflix",
    image: "/templates/netflix.png",
    locked: false,
    price: 9.99,
    component: NetflixTemplate,
  },
  {
    id: "spotify",
    name: "Spotify",
    image: "/templates/spotify.png",
    locked: true,
    price: 14.99,
  },
  {
    id: "amazon",
    name: "Amazon",
    image: "/templates/amazon.png",
    locked: true,
    price: 12.99,
  },
  {
    id: "google",
    name: "Google",
    image: "/templates/google.png",
    locked: true,
    price: 11.99,
  },
  {
    id: "twitter",
    name: "Twitter",
    image: "/templates/twitter.png",
    locked: true,
    price: 10.99,
  },
];
