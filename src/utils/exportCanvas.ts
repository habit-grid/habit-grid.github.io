export type IntensityLevel = 0 | 1 | 2 | 3;

export interface DayCell {
  dateStr: string; // YYYY-MM-DD
  date: Date;
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  month: number; // 0 - 11
  dayOfMonth: number;
  year: number;
  inRange: boolean; // True if within the 365-day / target year window; false for padding cells
  isToday: boolean;
}

export interface WeekColumn {
  weekIndex: number;
  monthLabel?: string;
  days: DayCell[];
}

export const LEVEL_HEX_PALETTE: Record<IntensityLevel, string> = {
  0: '#FFEFC4', // level_0_empty
  1: '#97D7FF', // level_1_low
  2: '#4D8DBA', // level_2_medium
  3: '#086288', // level_3_high
};

export interface ExportGraphOptions {
  domElement?: HTMLElement | null;
  habitName: string;
  periodLabel: string;
  weeks: WeekColumn[];
  gridData: Record<string, IntensityLevel>;
  weekdaysShort: string[];
  lessLabel: string;
  moreLabel: string;
  stats: {
    activeDaysLabel: string;
    activeDaysValue: string;
    currentStreakLabel: string;
    currentStreakValue: string;
    longestStreakLabel: string;
    longestStreakValue: string;
    scoreLabel: string;
    scoreValue: string;
  };
  isDark: boolean;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/**
 * Renders the 365-day heatmap DOM structure and metrics onto a high-DPI HTML5 Canvas
 * and triggers a clean PNG file download for social media sharing.
 */
export async function exportHeatmapToPng(options: ExportGraphOptions): Promise<void> {
  const {
    domElement,
    habitName,
    periodLabel,
    weeks,
    gridData,
    weekdaysShort,
    lessLabel,
    moreLabel,
    stats,
    isDark,
  } = options;

  // Read live DOM computed background if available to honor current theme surface
  const computedCardBg =
    domElement && typeof window !== 'undefined'
      ? window.getComputedStyle(domElement).backgroundColor
      : null;

  const scale = 2; // 2x Retina High-DPI export
  const cellSize = 16;
  const cellGap = 4;
  const numWeeks = weeks.length;

  const leftLabelWidth = 42;
  const gridWidth = numWeeks * (cellSize + cellGap) - cellGap;
  const gridHeight = 7 * (cellSize + cellGap) - cellGap;

  const paddingX = 44;
  const paddingY = 40;
  const width = Math.max(1140, paddingX * 2 + leftLabelWidth + gridWidth + 24);
  const height = 430;

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('HTML5 2D Canvas context unavailable');
  }
  ctx.scale(scale, scale);

  // 1. Background Surface
  const outerBg = isDark ? '#041821' : '#FCFBF7';
  const cardBg = isDark
    ? '#072534'
    : computedCardBg && computedCardBg !== 'rgba(0, 0, 0, 0)'
      ? computedCardBg
      : '#FFFFFF';
  const borderColor = isDark ? 'rgba(151, 215, 255, 0.28)' : 'rgba(77, 141, 186, 0.32)';
  const primaryText = isDark ? '#FFEFC4' : '#086288';
  const secondaryText = isDark ? '#97D7FF' : '#4D8DBA';
  const mutedText = isDark ? '#94A3B8' : '#64748B';

  ctx.fillStyle = outerBg;
  ctx.fillRect(0, 0, width, height);

  // Main Card Container
  drawRoundedRect(ctx, 18, 18, width - 36, height - 36, 22);
  ctx.fillStyle = cardBg;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  // 2. Top Header: Brand Mini Grid Icon + Habit Title + Period Badge
  const iconX = paddingX;
  const iconY = paddingY;
  drawRoundedRect(ctx, iconX, iconY, 40, 40, 10);
  ctx.fillStyle = '#086288';
  ctx.fill();

  const miniColors = [
    '#FFEFC4', '#97D7FF', '#4D8DBA',
    '#97D7FF', '#FFEFC4', '#97D7FF',
    '#4D8DBA', '#97D7FF', '#FFEFC4',
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      drawRoundedRect(ctx, iconX + 7 + c * 9.5, iconY + 7 + r * 9.5, 7, 7, 1.8);
      ctx.fillStyle = miniColors[r * 3 + c];
      ctx.fill();
    }
  }

  ctx.font = '800 22px "Plus Jakarta Sans", Inter, system-ui, sans-serif';
  ctx.fillStyle = primaryText;
  ctx.fillText(habitName || 'HabitGrid 365', iconX + 54, iconY + 20);

  ctx.font = '600 13px Inter, system-ui, sans-serif';
  ctx.fillStyle = secondaryText;
  ctx.fillText(`${periodLabel}  •  HabitGrid 365-Day Contribution Heatmap`, iconX + 54, iconY + 38);

  // 3. Top-Right Stat Pills
  const statItems = [
    { label: stats.activeDaysLabel, value: stats.activeDaysValue, accent: '#086288' },
    { label: stats.currentStreakLabel, value: stats.currentStreakValue, accent: '#4D8DBA' },
    { label: stats.longestStreakLabel, value: stats.longestStreakValue, accent: '#086288' },
    { label: stats.scoreLabel, value: stats.scoreValue, accent: '#4D8DBA' },
  ];

  const pillW = 132;
  const pillH = 52;
  const pillGap = 10;
  const totalPillsW = statItems.length * pillW + (statItems.length - 1) * pillGap;
  let pillStartX = width - paddingX - totalPillsW;

  statItems.forEach((item) => {
    drawRoundedRect(ctx, pillStartX, paddingY - 4, pillW, pillH, 12);
    ctx.fillStyle = isDark ? '#041821' : '#F6FAFD';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillStyle = primaryText;
    ctx.fillText(item.value, pillStartX + 12, paddingY + 19);

    ctx.font = '600 10.5px Inter, system-ui, sans-serif';
    ctx.fillStyle = mutedText;
    ctx.fillText(item.label, pillStartX + 12, paddingY + 36);

    pillStartX += pillW + pillGap;
  });

  // 4. Heatmap Container Box
  const gridOriginX = paddingX + leftLabelWidth;
  const gridOriginY = 148;

  drawRoundedRect(
    ctx,
    paddingX,
    gridOriginY - 34,
    width - paddingX * 2,
    gridHeight + 54,
    16
  );
  ctx.fillStyle = isDark ? '#041821' : '#FCFBF7';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  // Month Labels along the top of the heatmap
  ctx.font = '600 11px Inter, system-ui, sans-serif';
  ctx.fillStyle = secondaryText;
  let lastMonthX = -100;
  weeks.forEach((week, colIndex) => {
    if (week.monthLabel) {
      const xPos = gridOriginX + 12 + colIndex * (cellSize + cellGap);
      if (xPos - lastMonthX >= 34) {
        ctx.fillText(week.monthLabel, xPos, gridOriginY - 11);
        lastMonthX = xPos;
      }
    }
  });

  // Weekday Labels (Mon, Wed, Fri) on the left
  ctx.font = '600 10.5px Inter, system-ui, sans-serif';
  ctx.fillStyle = mutedText;
  [1, 3, 5].forEach((dayIdx) => {
    const label = weekdaysShort[dayIdx] || '';
    const yPos = gridOriginY + dayIdx * (cellSize + cellGap) + 12;
    ctx.fillText(label, paddingX + 12, yPos);
  });

  // 5. Draw 365-Day Squares using the exact custom palette (#FFEFC4, #97D7FF, #4D8DBA, #086288)
  weeks.forEach((week, colIndex) => {
    week.days.forEach((day, rowIndex) => {
      const cellX = gridOriginX + 12 + colIndex * (cellSize + cellGap);
      const cellY = gridOriginY + rowIndex * (cellSize + cellGap);

      if (!day.inRange) {
        drawRoundedRect(ctx, cellX, cellY, cellSize, cellSize, 4);
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(8, 98, 136, 0.04)';
        ctx.fill();
        return;
      }

      const rawVal = gridData[day.dateStr] ?? 0;
      const level = (rawVal >= 0 && rawVal <= 3 ? rawVal : 0) as IntensityLevel;
      const fillHex = LEVEL_HEX_PALETTE[level];

      drawRoundedRect(ctx, cellX, cellY, cellSize, cellSize, 4);
      ctx.fillStyle = fillHex;
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle =
        level === 0
          ? isDark
            ? 'rgba(255, 239, 196, 0.25)'
            : 'rgba(8, 98, 136, 0.16)'
          : 'rgba(8, 98, 136, 0.22)';
      ctx.stroke();
    });
  });

  // 6. Footer Watermark & 4-Color Palette Legend
  const footerY = height - 42;
  ctx.font = '600 12px "JetBrains Mono", monospace';
  ctx.fillStyle = secondaryText;
  ctx.fillText('habit-grid.github.io  •  100% Zero-Server Habit Tracker', paddingX, footerY);

  // Legend on bottom-right
  const legendLevels: IntensityLevel[] = [0, 1, 2, 3];
  ctx.font = '600 12px Inter, system-ui, sans-serif';
  const moreWidth = ctx.measureText(moreLabel).width;
  const boxesWidth = legendLevels.length * 16 + (legendLevels.length - 1) * 5;
  const lessWidth = ctx.measureText(lessLabel).width;

  let curLegendX = width - paddingX - (lessWidth + 10 + boxesWidth + 10 + moreWidth);
  ctx.fillStyle = mutedText;
  ctx.fillText(lessLabel, curLegendX, footerY);
  curLegendX += lessWidth + 10;

  legendLevels.forEach((lvl) => {
    drawRoundedRect(ctx, curLegendX, footerY - 12, 16, 16, 4);
    ctx.fillStyle = LEVEL_HEX_PALETTE[lvl];
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(8, 98, 136, 0.22)';
    ctx.stroke();
    curLegendX += 21;
  });

  ctx.fillStyle = mutedText;
  ctx.fillText(moreLabel, curLegendX + 4, footerY);

  // 7. Convert Canvas to PNG Blob and trigger download
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) {
    throw new Error('Failed to generate PNG blob');
  }

  const safeSlug = (habitName || 'habit-grid')
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'habit-grid';
  const safePeriod = periodLabel.toLowerCase().replace(/[^a-z0-9-_]+/g, '-');

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `habitgrid-${safeSlug}-${safePeriod}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
