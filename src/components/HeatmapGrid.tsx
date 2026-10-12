import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar,
  Download,
  Flame,
  CheckCircle2,
  RotateCcw,
  Plus,
  Trash2,
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  exportHeatmapToPng,
  LEVEL_HEX_PALETTE,
  type DayCell,
  type WeekColumn,
  type IntensityLevel,
} from '../utils/exportCanvas';
import { getTranslations, type Locale } from '../i18n/translations';

interface Props {
  locale?: Locale;
}

export interface HabitBoardMeta {
  id: string;
  name: string;
}

export interface MonthGroup {
  monthIndex: number;
  monthLabel: string;
  leadingEmptyDays: number;
  days: DayCell[];
}

const CURRENT_YEAR = new Date().getFullYear();

export type YearOption = string;

const YEAR_OPTIONS: YearOption[] = [
  String(CURRENT_YEAR),
  String(CURRENT_YEAR + 1),
  String(CURRENT_YEAR + 2),
  String(CURRENT_YEAR + 3),
  String(CURRENT_YEAR + 4),
];

const INTENSITY_TAILWIND_CLASSES: Record<IntensityLevel, string> = {
  0: 'bg-[#FFEFC4] border-[#086288]/15 dark:border-[#FFEFC4]/20 hover:ring-2 hover:ring-[#4D8DBA]',
  1: 'bg-[#97D7FF] border-[#086288]/25 dark:border-[#97D7FF]/40 hover:ring-2 hover:ring-[#086288]',
  2: 'bg-[#4D8DBA] border-[#086288]/35 dark:border-[#97D7FF]/40 hover:ring-2 hover:ring-[#FFEFC4]',
  3: 'bg-[#086288] border-[#041821]/40 dark:border-[#FFEFC4]/50 hover:ring-2 hover:ring-[#FFEFC4]',
};

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function buildCalendarMatrix(
  period: YearOption,
  monthsShort: string[]
): {
  weeks: WeekColumn[];
  months: MonthGroup[];
  activeDaysList: DayCell[];
  todayKey: string;
} {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayKey = formatDateKey(today);

  const yearNum = parseInt(period, 10) || CURRENT_YEAR;
  const rangeStart = new Date(yearNum, 0, 1);
  const rangeEnd = new Date(yearNum, 11, 31);

  const gridStart = new Date(rangeStart);
  gridStart.setDate(rangeStart.getDate() - rangeStart.getDay());

  const gridEnd = new Date(rangeEnd);
  gridEnd.setDate(rangeEnd.getDate() + (6 - rangeEnd.getDay()));

  const weeks: WeekColumn[] = [];
  const activeDaysList: DayCell[] = [];
  const monthBuckets: DayCell[][] = Array.from({ length: 12 }, () => []);

  const cursor = new Date(gridStart);
  let weekIndex = 0;
  let lastLabeledMonth = -1;

  while (cursor <= gridEnd) {
    const days: DayCell[] = [];
    let weekMonthLabel: string | undefined = undefined;

    for (let dow = 0; dow < 7; dow++) {
      const cellDate = new Date(cursor);
      const dateStr = formatDateKey(cellDate);
      const inRange = cellDate >= rangeStart && cellDate <= rangeEnd;
      const month = cellDate.getMonth();
      const dayOfMonth = cellDate.getDate();

      if (inRange && (dayOfMonth <= 7 || weekIndex === 0) && month !== lastLabeledMonth) {
        weekMonthLabel = monthsShort[month];
        lastLabeledMonth = month;
      }

      const cell: DayCell = {
        dateStr,
        date: cellDate,
        dayOfWeek: dow,
        month,
        dayOfMonth,
        year: cellDate.getFullYear(),
        inRange,
        isToday: dateStr === todayKey,
      };

      days.push(cell);
      if (inRange) {
        activeDaysList.push(cell);
        monthBuckets[month].push(cell);
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push({
      weekIndex,
      monthLabel: weekMonthLabel,
      days,
    });
    weekIndex++;
  }

  const months: MonthGroup[] = monthBuckets.map((mDays, mIdx) => ({
    monthIndex: mIdx,
    monthLabel: monthsShort[mIdx] || '',
    leadingEmptyDays: mDays.length > 0 ? mDays[0].dayOfWeek : 0,
    days: mDays,
  }));

  return { weeks, months, activeDaysList, todayKey };
}

export default function HeatmapGrid({ locale: initialLocale = 'en' }: Props) {
  const [activeLocale, setActiveLocale] = useState<Locale>(initialLocale);
  const t = useMemo(() => getTranslations(activeLocale), [activeLocale]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<Locale>;
      if (custom.detail) {
        setActiveLocale(custom.detail);
      }
    };
    window.addEventListener('habitgrid:locale-changed', handler);
    return () => window.removeEventListener('habitgrid:locale-changed', handler);
  }, []);

  // Multiple Habits stored in LocalStorage
  const initialBoards: HabitBoardMeta[] = useMemo(
    () => [{ id: 'default', name: t.tracker.defaultHabits.coding }],
    [t]
  );

  const [boards, setBoards] = useLocalStorage<HabitBoardMeta[]>(
    'habitgrid-boards-v2',
    initialBoards
  );
  const [activeBoardId, setActiveBoardId] = useLocalStorage<string>(
    'habitgrid-active-board-v2',
    'default'
  );

  const activeBoard = useMemo(() => {
    return (
      boards.find((b) => b.id === activeBoardId) ??
      boards[0] ?? { id: 'default', name: t.tracker.defaultHabits.coding }
    );
  }, [boards, activeBoardId, t]);

  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  // Selected year (current year + future years) isolated in LocalStorage
  const [rawSelectedYear, setSelectedYear] = useLocalStorage<YearOption>(
    'habitgrid-selected-year-v2',
    String(CURRENT_YEAR)
  );
  const selectedYear: YearOption = YEAR_OPTIONS.includes(rawSelectedYear)
    ? rawSelectedYear
    : String(CURRENT_YEAR);

  // Isolated LocalStorage key per (habitId + year)
  const storageKey = `habitgrid-matrix-${activeBoard.id}-${selectedYear}`;
  const [gridData, setGridData, isHydrated] = useLocalStorage<Record<string, IntensityLevel>>(
    storageKey,
    {}
  );

  const [isExporting, setIsExporting] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    dateStr: string;
    level: IntensityLevel;
  } | null>(null);

  const exportCardRef = useRef<HTMLDivElement | null>(null);

  const { weeks, months, activeDaysList, todayKey } = useMemo(
    () => buildCalendarMatrix(selectedYear, t.tracker.months),
    [selectedYear, t.tracker.months]
  );

  const stats = useMemo(() => {
    let activeCount = 0;
    let totalScore = 0;
    let longestStreak = 0;
    let runningStreak = 0;
    let latestLoggedDate = '';

    for (const day of activeDaysList) {
      const lvl = gridData[day.dateStr] ?? 0;
      if (lvl > 0) {
        activeCount++;
        totalScore += lvl;
        runningStreak++;
        latestLoggedDate = day.dateStr;
        if (runningStreak > longestStreak) {
          longestStreak = runningStreak;
        }
      } else {
        runningStreak = 0;
      }
    }

    let currentStreak = 0;
    const referenceList = [...activeDaysList].reverse();
    let startedCounting = false;
    const anchorDate = latestLoggedDate > todayKey ? latestLoggedDate : todayKey;

    for (const day of referenceList) {
      if (day.dateStr > anchorDate) continue;
      const lvl = gridData[day.dateStr] ?? 0;
      if (lvl > 0) {
        currentStreak++;
        startedCounting = true;
      } else {
        if (!startedCounting && day.dateStr === anchorDate) continue;
        break;
      }
    }

    const totalDaysInPeriod = activeDaysList.length || 365;
    return {
      activeCount,
      totalScore,
      currentStreak,
      longestStreak,
      totalDaysInPeriod,
    };
  }, [activeDaysList, gridData, todayKey]);

  const handleCellClick = (dateStr: string) => {
    setGridData((prev) => {
      const currentLevel = (prev[dateStr] ?? 0) as IntensityLevel;
      const nextLevel = ((currentLevel + 1) % 4) as IntensityLevel;
      const updated = { ...prev };
      if (nextLevel === 0) {
        delete updated[dateStr];
      } else {
        updated[dateStr] = nextLevel;
      }
      return updated;
    });
  };

  const handleRenameActiveHabit = (newName: string) => {
    setBoards((prev) =>
      prev.map((b) => (b.id === activeBoard.id ? { ...b, name: newName } : b))
    );
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newHabitName.trim();
    if (!trimmed) return;
    const id = `habit-${Date.now().toString(36)}`;
    setBoards((prev) => [...prev, { id, name: trimmed }]);
    setActiveBoardId(id);
    setNewHabitName('');
    setIsAddingHabit(false);
  };

  const handleDeleteActiveHabit = () => {
    if (boards.length <= 1) return;
    const remaining = boards.filter((b) => b.id !== activeBoard.id);
    setBoards(remaining);
    setActiveBoardId(remaining[0].id);
  };

  const handleDownloadPng = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const isDark =
        typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark');
      const periodLabel = `${t.tracker.yearPrefix} ${selectedYear}`;

      await exportHeatmapToPng({
        domElement: exportCardRef.current,
        habitName: activeBoard.name || 'HabitGrid',
        periodLabel,
        weeks,
        gridData,
        weekdaysShort: t.tracker.weekdaysShort,
        lessLabel: t.tracker.levels.less,
        moreLabel: t.tracker.levels.more,
        stats: {
          activeDaysLabel: t.tracker.stats.activeDays,
          activeDaysValue: `${stats.activeCount} / ${stats.totalDaysInPeriod}`,
          currentStreakLabel: t.tracker.stats.currentStreak,
          currentStreakValue: `${stats.currentStreak} ${t.tracker.stats.daysUnit}`,
          longestStreakLabel: t.tracker.stats.longestStreak,
          longestStreakValue: `${stats.longestStreak} ${t.tracker.stats.daysUnit}`,
          scoreLabel: t.tracker.stats.totalScore,
          scoreValue: `${stats.totalScore} ${t.tracker.stats.ptsUnit}`,
        },
        isDark,
      });

      setStatusToast(t.tracker.exportSuccessAlert);
      setTimeout(() => setStatusToast(null), 2800);
    } catch (err) {
      console.error('PNG Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const getLevelDescription = (lvl: IntensityLevel): string => {
    if (lvl === 0) return t.tracker.levels.level0;
    if (lvl === 1) return t.tracker.levels.level1;
    if (lvl === 2) return t.tracker.levels.level2;
    return t.tracker.levels.level3;
  };

  return (
    <div id="heatmap-section" className="w-full space-y-3">
      {statusToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#086288] text-[#FFEFC4] font-semibold text-xs shadow-xl border border-[#97D7FF]/40"
        >
          <CheckCircle2 className="w-4 h-4 text-[#FFEFC4] shrink-0" />
          <span>{statusToast}</span>
        </div>
      )}

      {/* Minimal Multi-Habit Switcher Strip */}
      <div className="flex flex-wrap items-center gap-2">
        {boards.map((board) => {
          const isSelected = board.id === activeBoard.id;
          return (
            <button
              key={board.id}
              type="button"
              onClick={() => setActiveBoardId(board.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#086288] text-[#FFEFC4] shadow-sm'
                  : 'bg-white/80 dark:bg-[#072534]/80 text-[#086288] dark:text-[#97D7FF] hover:bg-[#97D7FF]/25 border border-[#4D8DBA]/25'
              }`}
            >
              <span
                className="w-2 h-2 rounded-[2px] shrink-0"
                style={{ backgroundColor: isSelected ? '#FFEFC4' : '#4D8DBA' }}
              />
              <span className="truncate max-w-[160px]">{board.name}</span>
            </button>
          );
        })}

        {!isAddingHabit ? (
          <button
            type="button"
            onClick={() => setIsAddingHabit(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFEFC4]/85 hover:bg-[#FFEFC4] text-[#086288] border border-[#086288]/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.tracker.addHabitBtn}</span>
          </button>
        ) : (
          <form onSubmit={handleCreateHabit} className="inline-flex items-center gap-1.5">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder={t.tracker.newHabitPrompt}
              aria-label={t.tracker.newHabitPrompt}
              autoFocus
              className="px-3 py-1 rounded-xl text-xs bg-white dark:bg-[#041821] text-slate-900 dark:text-white border border-[#4D8DBA] focus:outline-none focus:ring-2 focus:ring-[#086288]"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#086288] text-[#FFEFC4]"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingHabit(false);
                setNewHabitName('');
              }}
              className="px-2 py-1 rounded-xl text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          </form>
        )}
      </div>

      {/* Single Ultra-Minimal Heatmap Card */}
      <div
        ref={exportCardRef}
        id="heatmap-export-target"
        className="card-surface p-4 sm:p-7 space-y-5"
      >
        {/* Top Row: Editable Active Habit Name + Streak Pill + Year Selector + Download Graph Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4D8DBA]/15 dark:border-[#97D7FF]/15">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            <label htmlFor="habit-title-input" className="sr-only">
              {t.tracker.boardTitleLabel}
            </label>
            <input
              id="habit-title-input"
              type="text"
              value={activeBoard.name}
              onChange={(e) => handleRenameActiveHabit(e.target.value)}
              placeholder={t.tracker.boardTitlePlaceholder}
              className="px-2.5 py-1 rounded-lg text-base sm:text-lg font-display font-bold bg-transparent hover:bg-[#97D7FF]/15 focus:bg-white dark:focus:bg-[#041821] text-[#086288] dark:text-[#FFEFC4] border border-transparent hover:border-[#4D8DBA]/25 focus:border-[#4D8DBA] focus:outline-none transition-colors max-w-[220px]"
            />

            {boards.length > 1 && (
              <button
                type="button"
                onClick={handleDeleteActiveHabit}
                title={t.tracker.deleteHabitTitle}
                aria-label={t.tracker.deleteHabitTitle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold text-[#086288] dark:text-[#97D7FF] bg-[#97D7FF]/15 dark:bg-[#041821]/80 px-2.5 py-1 rounded-lg border border-[#4D8DBA]/20">
              <span className="inline-flex items-center gap-1" title={t.tracker.stats.currentStreak}>
                <Flame className="w-3.5 h-3.5 text-[#086288] dark:text-[#FFEFC4]" />
                {stats.currentStreak} {t.tracker.stats.daysUnit}
              </span>
              <span className="opacity-40">•</span>
              <span title={t.tracker.stats.activeDays}>
                {stats.activeCount}/{stats.totalDaysInPeriod}
              </span>
            </div>
          </div>

          {/* Right: Year Dropdown (Current + Future Years) & Download Graph CTA */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <div className="relative flex items-center">
              <Calendar
                className="w-3.5 h-3.5 text-[#086288] dark:text-[#97D7FF] absolute left-3 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="year-selector-select"
                aria-label={t.tracker.yearSelectorLabel}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as YearOption)}
                className="pl-8 pr-7 py-2 rounded-xl text-xs font-mono font-bold bg-[#97D7FF]/20 dark:bg-[#041821] text-[#086288] dark:text-[#FFEFC4] border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 focus:outline-none focus:ring-2 focus:ring-[#086288] cursor-pointer"
              >
                {YEAR_OPTIONS.map((yr) => (
                  <option
                    key={yr}
                    value={yr}
                    className="bg-white dark:bg-[#072534] text-slate-900 dark:text-white"
                  >
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              id="download-graph-btn"
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#086288] hover:bg-[#4D8DBA] text-[#FFEFC4] shadow-sm transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#4D8DBA]"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>{isExporting ? t.tracker.downloadingBtn : t.tracker.downloadGraphBtn}</span>
            </button>
          </div>
        </div>

        {/* 1. DESKTOP VIEW (lg+): Expansive Horizontal 53-Week GitHub Heatmap */}
        <div
          className="hidden lg:block py-1 select-none"
          role="region"
          aria-label="365-Day Habit Contribution Heatmap (Desktop)"
        >
          <div className="flex flex-col w-max mx-auto">
            {/* Month Labels */}
            <div className="flex items-center mb-2 pl-8">
              {weeks.map((week) => (
                <div
                  key={`month-${week.weekIndex}`}
                  className="w-[15px] mr-[4px] text-[10px] font-semibold text-[#4D8DBA] dark:text-[#97D7FF] overflow-visible whitespace-nowrap"
                >
                  {week.monthLabel ?? ''}
                </div>
              ))}
            </div>

            {/* Weekday Labels + 53 Week Columns */}
            <div className="flex items-start">
              <div className="flex flex-col gap-[4px] pr-2 text-[10px] font-medium text-slate-400 w-8 shrink-0">
                {t.tracker.weekdaysShort.map((dayName, idx) => (
                  <div
                    key={`dow-${idx}`}
                    className="h-[15px] flex items-center leading-none"
                  >
                    {idx % 2 === 1 ? dayName : ''}
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-[4px]"
                onMouseLeave={() => setHoveredCell(null)}
              >
                {weeks.map((week) => (
                  <div key={`week-${week.weekIndex}`} className="flex flex-col gap-[4px]">
                    {week.days.map((day) => {
                      if (!day.inRange) {
                        return (
                          <div
                            key={day.dateStr}
                            className="w-[15px] h-[15px] rounded-[4px] bg-slate-200/25 dark:bg-slate-800/20 pointer-events-none"
                            aria-hidden="true"
                          />
                        );
                      }

                      const rawLevel = isHydrated ? (gridData[day.dateStr] ?? 0) : 0;
                      const level = (
                        rawLevel >= 0 && rawLevel <= 3 ? rawLevel : 0
                      ) as IntensityLevel;

                      return (
                        <button
                          key={day.dateStr}
                          type="button"
                          data-date={day.dateStr}
                          data-level={level}
                          aria-label={`${day.dateStr}: ${getLevelDescription(level)}`}
                          onClick={() => {
                            handleCellClick(day.dateStr);
                            setHoveredCell({
                              dateStr: day.dateStr,
                              level: ((level + 1) % 4) as IntensityLevel,
                            });
                          }}
                          onMouseEnter={() => setHoveredCell({ dateStr: day.dateStr, level })}
                          style={{ backgroundColor: LEVEL_HEX_PALETTE[level] }}
                          className={`w-[15px] h-[15px] rounded-[4px] border transition-transform duration-100 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#086288] ${
                            INTENSITY_TAILWIND_CLASSES[level]
                          } ${
                            day.isToday
                              ? 'ring-2 ring-[#086288] dark:ring-[#FFEFC4] ring-offset-1 ring-offset-white dark:ring-offset-[#072534]'
                              : ''
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MOBILE & TABLET VIEW (< lg): Device-Fitted Vertical Scrollable 12-Month Grid (Zero Horizontal Scroll) */}
        <div
          className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 select-none"
          role="region"
          aria-label="365-Day Habit Contribution Grid (Mobile & Tablet Vertical View)"
        >
          {months.map((mGroup) => (
            <div
              key={`mobile-month-${mGroup.monthIndex}`}
              className="p-2.5 sm:p-3 rounded-xl bg-[#FCFBF7]/80 dark:bg-[#041821]/70 border border-[#4D8DBA]/15 dark:border-[#97D7FF]/15"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-display font-bold text-[#086288] dark:text-[#FFEFC4]">
                  {mGroup.monthLabel}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {
                    mGroup.days.filter((d) => (isHydrated ? (gridData[d.dateStr] ?? 0) > 0 : false))
                      .length
                  }
                  /{mGroup.days.length}
                </span>
              </div>

              {/* 7-Day Column Headers */}
              <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                {t.tracker.weekdaysShort.map((wd, wIdx) => (
                  <span
                    key={`m-${mGroup.monthIndex}-wd-${wIdx}`}
                    className="text-[9px] font-mono text-slate-400 leading-none"
                  >
                    {wd.slice(0, 1)}
                  </span>
                ))}
              </div>

              {/* Month Day Squares Fitted to Device Width */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: mGroup.leadingEmptyDays }).map((_, emptyIdx) => (
                  <span
                    key={`empty-${mGroup.monthIndex}-${emptyIdx}`}
                    className="aspect-square rounded-[3px] opacity-0 pointer-events-none"
                    aria-hidden="true"
                  />
                ))}

                {mGroup.days.map((day) => {
                  const rawLevel = isHydrated ? (gridData[day.dateStr] ?? 0) : 0;
                  const level = (
                    rawLevel >= 0 && rawLevel <= 3 ? rawLevel : 0
                  ) as IntensityLevel;

                  return (
                    <button
                      key={`mob-${day.dateStr}`}
                      type="button"
                      data-date={day.dateStr}
                      data-level={level}
                      aria-label={`${day.dateStr}: ${getLevelDescription(level)}`}
                      onClick={() => {
                        handleCellClick(day.dateStr);
                        setHoveredCell({
                          dateStr: day.dateStr,
                          level: ((level + 1) % 4) as IntensityLevel,
                        });
                      }}
                      style={{ backgroundColor: LEVEL_HEX_PALETTE[level] }}
                      className={`aspect-square w-full rounded-[3px] border transition-transform duration-100 active:scale-90 focus:outline-none ${
                        INTENSITY_TAILWIND_CLASSES[level]
                      } ${
                        day.isToday
                          ? 'ring-2 ring-[#086288] dark:ring-[#FFEFC4]'
                          : ''
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Minimal Hover Readout / Reset + 4-Color Palette Legend */}
        <div className="pt-3 border-t border-[#4D8DBA]/15 dark:border-[#97D7FF]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3 min-h-[20px]">
            {hoveredCell ? (
              <span className="font-mono text-[#086288] dark:text-[#97D7FF] inline-flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-[2px] border border-[#086288]/30 inline-block"
                  style={{ backgroundColor: LEVEL_HEX_PALETTE[hoveredCell.level] }}
                />
                <strong>{hoveredCell.dateStr}</strong>
                <span>•</span>
                <span>{getLevelDescription(hoveredCell.level)}</span>
              </span>
            ) : (
              <span className="text-[11px]">{t.tracker.tooltipClickHint}</span>
            )}

            {stats.activeCount > 0 && (
              <button
                type="button"
                onClick={() => setGridData({})}
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                title={t.tracker.clearYearBtn}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.tracker.clearYearBtn}</span>
              </button>
            )}
          </div>

          {/* 4-Color Custom Palette Legend (#FFEFC4, #97D7FF, #4D8DBA, #086288) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-medium">{t.tracker.levels.less}</span>
            {([0, 1, 2, 3] as IntensityLevel[]).map((lvl) => (
              <span
                key={`legend-${lvl}`}
                title={getLevelDescription(lvl)}
                style={{ backgroundColor: LEVEL_HEX_PALETTE[lvl] }}
                className="w-3.5 h-3.5 rounded-[3px] border border-[#086288]/20 dark:border-[#FFEFC4]/25"
              />
            ))}
            <span className="text-[11px] font-medium">{t.tracker.levels.more}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
