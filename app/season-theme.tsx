'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { CalendarDays } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const seasons = {
  autumn: {
    name: 'Autumn',
    dark: '#f4a267',
    light: '#a34314',
    secondDark: '#e7bc6b',
    secondLight: '#89620c',
  },
  winter: {
    name: 'Winter',
    dark: '#80c9f1',
    light: '#126a94',
    secondDark: '#9aaeff',
    secondLight: '#5653a7',
  },
  spring: {
    name: 'Spring',
    dark: '#85d7ab',
    light: '#267446',
    secondDark: '#c1d77c',
    secondLight: '#647821',
  },
  summer: {
    name: 'Summer',
    dark: '#eaca78',
    light: '#896317',
    secondDark: '#f2aa7b',
    secondLight: '#a34822',
  },
};
export type Season = keyof typeof seasons;
export function seasonForDate(date: Date): Season {
  const month = date.getMonth();
  return month >= 2 && month <= 4
    ? 'spring'
    : month >= 5 && month <= 7
      ? 'summer'
      : month >= 8 && month <= 10
        ? 'autumn'
        : 'winter';
}
export function useSeasonTheme() {
  const [light, setLight] = useState(false);
  const [choice, setChoice] = useState<Season | 'auto'>('auto');
  const [today, setToday] = useState<Season>('autumn');
  const [greeting, setGreeting] = useState('Hello there');
  const [dateLabel, setDateLabel] = useState('Cybersecurity + AI');
  useEffect(() => {
    function refresh() {
      const now = new Date();
      setToday(seasonForDate(now));
      setGreeting(
        now.getHours() < 12
          ? 'Good morning'
          : now.getHours() < 18
            ? 'Good afternoon'
            : 'Good evening',
      );
      setDateLabel(
        new Intl.DateTimeFormat('en-CA', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }).format(now),
      );
    }
    refresh();
    try {
      const mode = localStorage.getItem('anmol-portfolio-theme');
      // Read browser preferences after hydration to preserve the static export.
      // oxlint-disable-next-line react/react-compiler
      setLight(mode === 'light');
      const saved = localStorage.getItem('anmol-portfolio-season');
      if (saved && (saved === 'auto' || saved in seasons))
        setChoice(saved as Season | 'auto');
    } catch {
      /* Preferences are optional. */
    }
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, []);
  const season = choice === 'auto' ? today : choice;
  const palette = seasons[season];
  const accent = light ? palette.light : palette.dark;
  const second = light ? palette.secondLight : palette.secondDark;
  useEffect(() => {
    document.documentElement.className = light ? 'light' : 'dark';
    document.documentElement.style.setProperty('--primary', accent);
    document.documentElement.style.setProperty('--second', second);
    document.documentElement.dataset.season = season;
  }, [light, accent, second, season]);
  function toggleMode() {
    setLight((value) => {
      try {
        localStorage.setItem('anmol-portfolio-theme', value ? 'dark' : 'light');
      } catch {}
      return !value;
    });
  }
  function choose(value: Season | 'auto') {
    setChoice(value);
    try {
      localStorage.setItem('anmol-portfolio-season', value);
    } catch {}
  }
  return {
    light,
    toggleMode,
    choice,
    choose,
    season,
    palette,
    greeting,
    dateLabel,
    style: { '--primary': accent, '--second': second } as CSSProperties,
  };
}
export function SeasonPicker({
  choice,
  choose,
  label,
}: {
  choice: Season | 'auto';
  choose: (s: Season | 'auto') => void;
  label: string;
}) {
  return (
    <Select
      value={choice}
      onValueChange={(value) => {
        if (value === 'auto' || (value && value in seasons))
          choose(value as Season | 'auto');
      }}
    >
      <SelectTrigger className="season-trigger" aria-label="Color palette">
        <CalendarDays size={15} />
        <SelectValue>
          {choice === 'auto' ? label : seasons[choice].name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className="season-options"
        align="end"
        alignItemWithTrigger={false}
      >
        <SelectItem value="auto">Follow the season</SelectItem>
        {Object.entries(seasons).map(([id, s]) => (
          <SelectItem key={id} value={id}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
