import { Star } from 'lucide-react';

interface PopularityBadgeProps {
  popularity?: number; // 1-5
}

const levelLabels: Record<number, string> = {
  5: '热门',
  4: '常见',
  3: '一般',
  2: '小众',
  1: '稀有',
};

const levelColors: Record<number, string> = {
  5: 'text-amber-400 fill-amber-400',
  4: 'text-amber-400',
  3: 'text-gray-300',
  2: 'text-gray-300',
  1: 'text-gray-200',
};

export function PopularityBadge({ popularity }: PopularityBadgeProps) {
  const stars = Math.max(1, Math.min(5, popularity ?? 3));
  const label = levelLabels[stars] ?? '一般';

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium">
      <span className="flex items-center gap-0.5" title={`热度: ${stars}/5 星 - ${label}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-3.5 h-3.5 ${n <= stars ? levelColors[stars] : 'text-gray-200'}`}
            fill={n <= stars ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="text-gray-400">{stars}/5</span>
    </span>
  );
}
