import { img } from "@/lib/images";

export type CommunityAmbassador = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  image?: string;
};

export const COMMUNITY_AMBASSADORS: CommunityAmbassador[] = [
  {
    id: "winsome-bolt",
    firstName: "Winsome",
    lastName: "Bolt",
    role: "Ayuda Ambassador",
    image: img("2025/08/Winsome-Digital-Marketing-Agency-Instagram-Post-1080-x-1350-px-240x300.png"),
    bio: "Presently designs Mindwarehouse co-work space and Mindwarehouse Connect, an open concept venue for events located downtown Miami. Winsome curates, creates and designs venues to exhibit visual, musical, and spoken word artists in pop-up gallery style at homes and offices in Miami and Broward, the Miami Beach Botanical Garden Banyan Room, and at Mindwarehouse Connect. She curated Art Days and Block 1 Art Week during Art Basel. She presently instructs art and design classes at local after-school programs such as Fienberg Fisher, as well as classes for adults at UNIDAD, Surfside Community Center, and other neighborhood facilities.",
  },
  {
    id: "janelle-graham",
    firstName: "Janelle",
    lastName: "Graham",
    role: "Ayuda Ambassador",
    image: img("2025/08/Janelle-Graham-Digital-Marketing-Agency-Instagram-Post-1080-x-1350-px-240x300.png"),
    bio: "Serving as an advocate for youth and their role in telling their stories, Janelle facilitates creative expression workshops. Through Poetic Puff, Janelle Nicole Graham provides relatable spaces for young people to take ownership as the authors of their life stories. With ten years as a poetry instructor, she has volunteered for nonprofits serving at-risk youth. For five years, she has worked as an educator and earned recognition such as New Educator of the Year and New American Hero Award. As a writer, she listens to needs and crafts words to form clear, creative expressions intended to generate discussion, fuel action, and make an imprint. Transparency brings healing, and storytelling has the power to build community — through Poetic Puff, rising generations are harnessing the vitality of their voices.",
  },
  {
    id: "liliana-martinez",
    firstName: "Liliana",
    lastName: "Martinez",
    role: "Ayuda Ambassador",
    image: img("2025/08/Liliana-Martinez-Digital-Marketing-Agency-Instagram-Post-1080-x-1350-px-240x300.png"),
    bio: "A native of Colombia, Liliana Martinez has lived in Miami Beach for 22 years. She is an activist supporting causes that help the needy and underserved in Miami Beach and is a member of the City's Hispanic Affairs Committee. Over the years, she has become the go-to person for campaigns in need of voter outreach. Liliana has worked for eight campaigns in Miami Beach's 2021 elections, including those of Mayor Dan Gelber, Commissioner Kristen Rosen Gonzalez, and the political committee opposing a 2 a.m. alcohol sales ban. She has received several recognitions from the Miami Beach City Commission for her passion and activism in the city.",
  },
  {
    id: "andres-williams",
    firstName: "Andrés",
    lastName: "Williams",
    role: "Ayuda Ambassador",
    image: img("2025/08/andre-Digital-Marketing-Agency-Instagram-Post-1080-x-1350-px-240x300.png"),
    bio: "André L. Williams is a real estate attorney with a full-service real estate law firm representing developers, investors, lenders, brokers, and individuals in real estate matters. He previously practiced law at Holland & Knight LLP and was selected as one of the 10 Best Attorneys in Florida for Client Satisfaction in Real Estate Law by the American Institute of Legal Counsel. He is President and CEO of Pendragon Title and Escrow Inc., offering a full range of title and real estate closing services throughout Florida, and President of the Miami Gardens Chamber of Commerce. André received a Bachelor of Arts in English and American Literature from Harvard University and his law degree from Vanderbilt University School of Law.",
  },
  {
    id: "kyra-fulleda",
    firstName: "Kyra",
    lastName: "Fulleda",
    role: "Ayuda Ambassador",
    image: img("2025/08/Kyra-2-Digital-Marketing-Agency-Instagram-Post-1080-x-1350-px-240x300.png"),
    bio: "Kyra Fulleda brings over 19 years of experience in the Medicare industry, with a strong background in Medicare Advantage plans. She is Director of Market Development for Carepoint. A bilingual professional known for hands-on performance, she cultivates excellent relationships with new and existing brokers. Kyra has managed all aspects of the organization, overseeing four district managers and more than 400 brokers. She rebuilt, restructured, and revitalized her sales team, recruiting more than 150 brokers and general agencies while communicating a clear, strategic sales vision and effectively coaching veteran and junior team members.",
  },
];
