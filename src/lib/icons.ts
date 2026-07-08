import {
  Shield, Sparkles, Moon, Scale, HeartPulse,
  Microscope, Heart, Bone, Gem, Eye,
  Zap, Activity, FlaskRound,
  FlaskConical, Search, Factory, Beaker, Pill,
  Globe, DollarSign, Award, Package, ShoppingBag,
  Leaf, Dumbbell, Venus, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  sparkles: Sparkles,
  moon: Moon,
  scale: Scale,
  'heart-pulse': HeartPulse,
  microscope: Microscope,
  heart: Heart,
  bone: Bone,
  gem: Gem,
  eye: Eye,
  zap: Zap,
  activity: Activity,
  'flask-round': FlaskRound,
  'flask-conical': FlaskConical,
  search: Search,
  factory: Factory,
  beaker: Beaker,
  pill: Pill,
  globe: Globe,
  'dollar-sign': DollarSign,
  award: Award,
  package: Package,
  'shopping-bag': ShoppingBag,
  leaf: Leaf,
  dumbbell: Dumbbell,
  venus: Venus,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || FlaskConical;
}

export { Shield, Sparkles, Moon, Scale, HeartPulse, Microscope, Heart, Bone, Gem, Eye, Zap, Activity, FlaskRound, FlaskConical, Search, Factory, Beaker, Pill, Globe, DollarSign, Award, Package, ShoppingBag, Leaf, Dumbbell, Venus };
