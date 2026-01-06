import {
  Award,
  CalendarCheck,
  Clock,
  Eye,
  Hand,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Send,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

const iconMap = {
  Award,
  CalendarCheck,
  Clock,
  Eye,
  Hand,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Send,
  Shield,
  Sparkles,
  Star,
};

export const getIconByName = (name?: string) => {
  if (!name) {
    return Sparkles;
  }
  return iconMap[name as keyof typeof iconMap] ?? Sparkles;
};
