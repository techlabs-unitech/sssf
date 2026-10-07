import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  GraduationCap,
  Utensils,
  CalendarDays,
  Megaphone,
  Camera,
  HandCoins,
  BriefcaseBusiness,
  Wrench,
} from "lucide-react";

export type VolunteerOpportunity = {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel: string;
  status: string;
};

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    title: "Medical volunteering",
    description: "Volunteer opportunities may include health camp assistance, logistics, patient coordination, and medical outreach support. Availability and current requirements will be confirmed by the foundation.",
    icon: Stethoscope,
    actionLabel: "I can support medical outreach",
    status: "Availability to be confirmed",
  },
  {
    title: "Teaching / Education",
    description: "Volunteer opportunities may include tutoring, education support coordination, learning material assistance, and classroom-community engagement. Availability and current requirements will be confirmed by the foundation.",
    icon: GraduationCap,
    actionLabel: "I can support education",
    status: "Availability to be confirmed",
  },
  {
    title: "Food distribution / Annadanam",
    description: "Volunteer opportunities may include food service support, meal coordination, logistics, and community care assistance. Availability and current requirements will be confirmed by the foundation.",
    icon: Utensils,
    actionLabel: "I can help with food service",
    status: "Availability to be confirmed",
  },
  {
    title: "Event volunteering",
    description: "Volunteer opportunities may include event setup, guest support, material coordination, and program service assistance. Availability and current requirements will be confirmed by the foundation.",
    icon: CalendarDays,
    actionLabel: "I can support an event",
    status: "Availability to be confirmed",
  },
  {
    title: "Social media",
    description: "Volunteer opportunities may include communication support, campaign coordination, photo documentation, and digital storytelling where verified and approved. Availability and current requirements will be confirmed by the foundation.",
    icon: Megaphone,
    actionLabel: "I can support communications",
    status: "Availability to be confirmed",
  },
  {
    title: "Photography / Video",
    description: "Volunteer opportunities may include photo documentation, field coverage, visual story capture, and support for documented program activity. Availability and current requirements will be confirmed by the foundation.",
    icon: Camera,
    actionLabel: "I can contribute media support",
    status: "Availability to be confirmed",
  },
  {
    title: "Fundraising",
    description: "Volunteer opportunities may include donor outreach, event coordination, campaign support, and practical fundraising help. Availability and current requirements will be confirmed by the foundation.",
    icon: HandCoins,
    actionLabel: "I can support fundraising",
    status: "Availability to be confirmed",
  },
  {
    title: "Corporate volunteering",
    description: "Volunteer opportunities may include employee engagement, skills days, service days, and practical team project support. Availability and current requirements will be confirmed by the foundation.",
    icon: BriefcaseBusiness,
    actionLabel: "I can support a team effort",
    status: "Availability to be confirmed",
  },
  {
    title: "Skills-based volunteering",
    description: "Volunteer opportunities may include professional skills, technical support, logistics planning, mentoring, and project advisory help. Availability and current requirements will be confirmed by the foundation.",
    icon: Wrench,
    actionLabel: "I can offer a skill",
    status: "Availability to be confirmed",
  },
];
