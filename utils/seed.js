import "dotenv/config";
import { connectDB } from "../config/db.js";
import Admin from "../Models/Admin.js";
import ContactMessage from "../Models/ContactMessage.js";
import Profile from "../Models/Profile.js";
import Project from "../Models/Project.js";
import Service from "../Models/Service.js";
import Testimonial from "../Models/Testimonial.js";

async function seed() {
  await connectDB();

  // Clear all collections
  await Admin.deleteMany({});
  await Profile.deleteMany({});
  await ContactMessage.deleteMany({});
  await Project.deleteMany({});
  await Service.deleteMany({});
  await Testimonial.deleteMany({});

  // Seed admin user
  await Admin.create({
    username: "samtech-admin",
    password: "samtech_ticotico",
    secretSlug: "samtech",
    role: "admin"
  });
  console.log("Admin user created");

  await Profile.create({
    name: "SamTech",
    role: "Full Stack MERN Developer",
    tagline: "I build elegant web platforms and mobile apps with a strong backend foundation.",
    intro: "From UI architecture to API design, I create products that are usable, scalable, and polished.",
    heroImage: "",
    contactImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    resumeUrl: "",
    githubUrl: "https://github.com/example",
    linkedinUrl: "https://linkedin.com/in/example",
    xUrl: "https://x.com/example",
    aboutTitle: "Full stack development with a builder's mindset.",
    aboutIntro:
      "I build web and mobile systems end-to-end, from interface structure to backend logic, data modeling, and deployment-ready APIs.",
    aboutImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    aboutGallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    ],
    aboutName: "Samuel Dagbo",
    aboutEducation: "BSc. Information Technology, University of Ghana",
    aboutJourneyTitle: "My journey",
    aboutJourneyBody:
      "I have worked steadily to grow from curiosity into real technical capability, learning through practice, discipline, and consistent building.",
    aboutInspirationTitle: "What drives me",
    aboutInspirationBody:
      "Where I am today came from hard work, patience, and refusing to stop improving. I want every product I build to reflect that growth and determination.",
    aboutWhoTitle: "Who I am",
    aboutWhoBody:
      "I design and develop products with a balance of clean interface thinking and practical engineering decisions.",
    aboutStackTitle: "What I work with",
    aboutStackBody:
      "React, Node.js, Express, MongoDB, and React Native, with a strong focus on real product flow and maintainable architecture.",
    aboutApproachTitle: "How I work",
    aboutApproachBody:
      "I care about clean structure, speed, responsive UI, and backend systems that make admin operations easy instead of painful.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "React Native", "Tailwind CSS", "JWT"],
    experienceTimeline: [
      {
        period: "Today",
        title: "Full Stack MERN Developer",
        subtitle: "Independent builder",
        description: "Designing and developing business websites, admin dashboards, internal tools, and mobile-ready products."
      },
      {
        period: "University journey",
        title: "BSc. Information Technology",
        subtitle: "University of Ghana",
        description: "Building technical depth through coursework, self-study, and practical product work."
      }
    ],
    faqItems: [
      {
        question: "What type of projects do you take on?",
        answer: "Business websites, product platforms, dashboards, internal tools, and mobile apps with a strong backend foundation."
      },
      {
        question: "Do you handle both frontend and backend?",
        answer: "Yes. I work across interface architecture, APIs, data modeling, admin tools, and deployment-minded implementation."
      }
    ],
    brands: ["SwiftCart", "Nova Labs", "LaunchStack", "PrimeCare Services"],
    location: "Accra, Ghana",
    yearsExperience: "4+",
    availability: "Open to freelance and contract projects",
    whatsapp: "+233550624203",
    email: "samtech@example.com"
  });

  await Project.insertMany([
    {
      title: "Ops Dashboard",
      slug: "ops-dashboard",
      category: "SaaS Platform",
      summary: "A role-based operations dashboard for approvals, live reporting, and internal process visibility.",
      stack: ["React", "Node.js", "MongoDB", "JWT"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
      ],
      problem:
        "The operations team was tracking approvals, exceptions, and reporting in disconnected spreadsheets, which slowed decisions and created errors.",
      solution:
        "I built a role-based dashboard with approval flows, reporting views, secure auth, and a backend structure that made operational updates easy to manage.",
      result:
        "The team moved from fragmented tracking to a single decision center with faster approvals, clearer reporting, and less manual follow-up.",
      caseStudyBody:
        "This project required both clean interface thinking and pragmatic backend structure. The main challenge was reducing operational friction without creating a bulky workflow.\n\nI focused on fast navigation, role-aware views, and stable APIs so different users could see only what mattered to them while management retained strong oversight.",
      metrics: [
        { label: "Approval time", value: "43% faster" },
        { label: "Ops team coverage", value: "28 staff users" },
        { label: "Manual follow-up", value: "Reduced by 12 hrs/week" }
      ],
      liveUrl: "https://example.com/ops-dashboard",
      repoUrl: "https://github.com/example/ops-dashboard",
      featured: true,
      order: 1
    },
    {
      title: "Delivery Mobile App",
      slug: "delivery-mobile-app",
      category: "React Native",
      summary: "A customer and rider mobile experience for real-time order tracking, notifications, and status updates.",
      stack: ["React Native", "Express", "MongoDB", "Expo"],
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
      ],
      problem:
        "Users needed better visibility into order progress, while riders needed a simpler way to manage updates and delivery status in the field.",
      solution:
        "I created a React Native app with real-time order states, rider actions, and backend APIs that kept customers and dispatch in sync.",
      result:
        "The mobile flow became easier to use, customer uncertainty dropped, and operations gained more reliable delivery-state updates.",
      caseStudyBody:
        "The project centered on reducing friction for two user groups at once: customers waiting for deliveries and riders moving quickly through orders.\n\nI designed the system around clear state transitions, mobile-first interaction patterns, and lightweight backend endpoints that supported live updates.",
      metrics: [
        { label: "Order visibility", value: "Live status across 3 key stages" },
        { label: "Support requests", value: "31% fewer tracking calls" },
        { label: "Mobile usage", value: "Used by riders daily" }
      ],
      liveUrl: "https://example.com/delivery-app",
      repoUrl: "https://github.com/example/delivery-app",
      featured: true,
      order: 2
    },
    {
      title: "Service Booking Platform",
      slug: "service-booking-platform",
      category: "Marketplace",
      summary: "A service booking platform with customer scheduling, provider management, and backend operations tools.",
      stack: ["React", "Express", "MongoDB", "Cloudinary"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
      ],
      problem:
        "Customers and providers were handling bookings manually, which caused scheduling conflicts, poor visibility, and weak admin control.",
      solution:
        "I built a booking workflow with provider management, customer scheduling, and backend operations tools for oversight and fulfillment.",
      result:
        "The booking process became easier to manage, scheduling errors dropped, and the admin side gained a more controlled workflow.",
      caseStudyBody:
        "This was a workflow-heavy build, so the focus was less on decorative UI and more on dependable flow between customers, providers, and admins.\n\nThe system was structured so operational tasks stayed visible and manageable as volume increased.",
      metrics: [
        { label: "Booking flow", value: "End-to-end digital scheduling" },
        { label: "Admin visibility", value: "Single dashboard view" },
        { label: "Scheduling issues", value: "Reduced significantly" }
      ],
      liveUrl: "https://example.com/service-booking",
      repoUrl: "https://github.com/example/service-booking",
      featured: true,
      order: 3
    },
    {
      title: "School Management Portal",
      slug: "school-management-portal",
      category: "Education System",
      summary: "An academic admin platform for student records, fees tracking, attendance, and role-based access.",
      stack: ["MERN", "JWT", "Charts"],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
      ],
      problem:
        "School records, payments, and attendance management were spread across disconnected tools with limited access control.",
      solution:
        "I created a role-based portal for academic records, payments, reporting, and institutional admin tasks with clearer system structure.",
      result:
        "The school gained better oversight, faster access to records, and a more organized daily admin workflow.",
      caseStudyBody:
        "This build combined data-heavy screens, permissions, and workflow clarity. The main priority was making institutional admin tasks easier without sacrificing control.\n\nI structured the system so staff roles could work independently while leadership retained visibility into critical records and reports.",
      metrics: [
        { label: "Record access", value: "Centralized portal" },
        { label: "Admin time", value: "Reduced repetitive manual work" },
        { label: "Role control", value: "Permissions across staff groups" }
      ],
      liveUrl: "https://example.com/school-portal",
      repoUrl: "https://github.com/example/school-portal",
      featured: true,
      order: 4
    }
  ]);

  await Service.insertMany([
    {
      title: "Business and company websites",
      copy:
        "High-quality websites for brands, businesses, schools, churches, and organizations that need credibility, speed, and a strong online presence.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      order: 1
    },
    {
      title: "Custom MERN web applications",
      copy:
        "Full-stack products with protected APIs, dashboards, database architecture, and admin flows built for real operational needs.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      order: 2
    },
    {
      title: "React Native mobile apps",
      copy:
        "Cross-platform mobile apps with clean user experience, API integrations, and backend systems that support reliable production use.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      order: 3
    }
  ]);

  await Testimonial.insertMany([
    {
      name: "Founder",
      company: "SwiftCart",
      quote: "SamTech delivered fast, communicated clearly, and built a system we could actually run with.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
      order: 1
    },
    {
      name: "Operations Manager",
      company: "Nova Labs",
      quote: "Strong engineering and clean product decisions. The admin side was especially solid.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
      order: 2
    },
    {
      name: "Product Lead",
      company: "LaunchStack",
      quote: "The frontend looked sharp, but what impressed us more was the backend structure and admin workflow.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
      order: 3
    },
    {
      name: "Managing Director",
      company: "PrimeCare Services",
      quote: "Reliable execution from start to finish. Requirements changed often, but the system stayed organized.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
      order: 4
    }
  ]);

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
