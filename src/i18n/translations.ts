export type Locale = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh';

export interface LocaleConfig {
  code: Locale;
  badge: string;
  label: string;
  flag: string;
  ogLocale: string;
}

export const LOCALES: LocaleConfig[] = [
  { code: 'en', badge: 'US', label: 'English', flag: '🇺🇸', ogLocale: 'en_US' },
  { code: 'es', badge: 'ES', label: 'Español', flag: '🇪🇸', ogLocale: 'es_ES' },
  { code: 'pt', badge: 'BR', label: 'Português', flag: '🇧🇷', ogLocale: 'pt_BR' },
  { code: 'de', badge: 'DE', label: 'Deutsch', flag: '🇩🇪', ogLocale: 'de_DE' },
  { code: 'fr', badge: 'FR', label: 'Français', flag: '🇫🇷', ogLocale: 'fr_FR' },
  { code: 'ja', badge: 'JP', label: '日本語', flag: '🇯🇵', ogLocale: 'ja_JP' },
  { code: 'zh', badge: 'CN', label: '简体中文', flag: '🇨🇳', ogLocale: 'zh_CN' },
];

export const DEFAULT_LOCALE: Locale = 'en';

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brand: string;
    tagline: string;
    privacyBadge: string;
    languageLabel: string;
    themeLight: string;
    themeDark: string;
    themeToggleAria: string;
    supportCta: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    pillPrivacy: string;
    pillPrivacyDesc: string;
    pillHeatmap: string;
    pillHeatmapDesc: string;
    pillExport: string;
    pillExportDesc: string;
  };
  tracker: {
    boardTitleLabel: string;
    boardTitlePlaceholder: string;
    defaultHabits: {
      coding: string;
      fitness: string;
      reading: string;
      mindfulness: string;
    };
    addHabitBtn: string;
    newHabitPrompt: string;
    deleteHabitTitle: string;
    yearSelectorLabel: string;
    rolling365: string;
    yearPrefix: string;
    downloadGraphBtn: string;
    downloadingBtn: string;
    exportSuccessAlert: string;
    logTodayBtn: string;
    todayLoggedBadge: string;
    paintModeLabel: string;
    modeCycle: string;
    brushPrefix: string;
    sampleStreakBtn: string;
    clearYearBtn: string;
    clearConfirmTitle: string;
    clearConfirmYes: string;
    clearConfirmCancel: string;
    exportJsonBtn: string;
    importJsonBtn: string;
    importSuccessAlert: string;
    importErrorAlert: string;
    stats: {
      activeDays: string;
      activeDaysSub: string;
      currentStreak: string;
      currentStreakSub: string;
      longestStreak: string;
      longestStreakSub: string;
      totalScore: string;
      totalScoreSub: string;
      completionRate: string;
      daysUnit: string;
      ptsUnit: string;
    };
    levels: {
      less: string;
      more: string;
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level0Short: string;
      level1Short: string;
      level2Short: string;
      level3Short: string;
    };
    months: string[];
    weekdaysShort: string[];
    tooltipClickHint: string;
    mobileSwipeHint: string;
    storageStatus: string;
  };
  seoSection: {
    howItWorksTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    footerCopyright: string;
    footerPrivacyNote: string;
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en: {
    meta: {
      title: 'HabitGrid | 365-Day Zero-Server Habit Tracker',
      description:
        'A 100% client-side web application built with Astro and React that allows users to track daily habits via a GitHub-style 365-day contribution heatmap. Zero server uploads, ensuring total privacy. Data is persisted entirely in the browser via LocalStorage.',
      keywords:
        'habit tracker, github contribution heatmap, 365 day habit grid, zero server habit tracker, localstorage habit tracker, daily streak graph, download habit graph png',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: '365-Day Zero-Server Habit Tracker',
      privacyBadge: '100% LocalStorage • Zero Server',
      languageLabel: 'Select Language',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
      themeToggleAria: 'Toggle Light or Dark Theme',
      supportCta: 'Support the Developer',
    },
    hero: {
      badge: '100% Client-Side • GitHub-Style 365-Day Heatmap',
      titleStart: 'Build Unbreakable Daily Streaks on a',
      titleHighlight: '365-Day Contribution Grid',
      subtitle:
        'Click any day square to cycle through 4 custom activity intensity levels. Every check-in saves instantly in your browser via LocalStorage with zero accounts, zero servers, and one-click HD PNG export.',
      pillPrivacy: 'Zero-Server Privacy',
      pillPrivacyDesc: '100% persisted in browser LocalStorage',
      pillHeatmap: '4-Level Custom Palette',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: 'Instant PNG Export',
      pillExportDesc: 'High-DPI HTML5 Canvas social graph card',
    },
    tracker: {
      boardTitleLabel: 'Active Habit Board',
      boardTitlePlaceholder: 'Enter habit name (e.g., Daily Coding, Deep Work, Workout)...',
      defaultHabits: {
        coding: 'Daily Coding & Ship',
        fitness: 'Workout & Movement',
        reading: 'Deep Reading (30m)',
        mindfulness: 'Hydration & Focus',
      },
      addHabitBtn: 'New Habit',
      newHabitPrompt: 'Habit Title...',
      deleteHabitTitle: 'Remove this habit board',
      yearSelectorLabel: 'Timeframe / Year',
      rolling365: 'Last 365 Days',
      yearPrefix: 'Year',
      downloadGraphBtn: 'Download Graph',
      downloadingBtn: 'Rendering PNG...',
      exportSuccessAlert: 'HD PNG Habit Graph downloaded!',
      logTodayBtn: 'Log Today (+1)',
      todayLoggedBadge: 'Today Level',
      paintModeLabel: 'Click Action',
      modeCycle: 'Cycle (0→3)',
      brushPrefix: 'Paint',
      sampleStreakBtn: 'Demo Pattern',
      clearYearBtn: 'Reset Year',
      clearConfirmTitle: 'Clear all squares for this period?',
      clearConfirmYes: 'Yes, Clear',
      clearConfirmCancel: 'Cancel',
      exportJsonBtn: 'Backup JSON',
      importJsonBtn: 'Restore JSON',
      importSuccessAlert: 'Habit data restored to LocalStorage!',
      importErrorAlert: 'Invalid backup JSON file.',
      stats: {
        activeDays: 'Active Days',
        activeDaysSub: 'Days with intensity ≥ 1',
        currentStreak: 'Current Streak',
        currentStreakSub: 'Consecutive active days',
        longestStreak: 'Longest Streak',
        longestStreakSub: 'Best streak in period',
        totalScore: 'Intensity Score',
        totalScoreSub: 'Total cumulative points',
        completionRate: 'Consistency',
        daysUnit: 'days',
        ptsUnit: 'pts',
      },
      levels: {
        less: 'Less',
        more: 'More',
        level0: 'Level 0 • Empty (#FFEFC4)',
        level1: 'Level 1 • Low Intensity (#97D7FF)',
        level2: 'Level 2 • Medium Intensity (#4D8DBA)',
        level3: 'Level 3 • High Intensity (#086288)',
        level0Short: 'L0 Empty',
        level1Short: 'L1 Low',
        level2Short: 'L2 Medium',
        level3Short: 'L3 High',
      },
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tooltipClickHint: 'Click to cycle intensity (0 → 1 → 2 → 3)',
      mobileSwipeHint: 'Swipe horizontally to explore all 53 weeks →',
      storageStatus: 'Synced to LocalStorage',
    },
    seoSection: {
      howItWorksTitle: 'How HabitGrid Works — Zero-Server Architecture',
      step1Title: '1. Click Any Day Square to Toggle Intensity',
      step1Desc:
        'Each square represents a single day across a 53-week GitHub-style contribution matrix. Click or tap a square to cycle through 4 distinct intensity states: Empty (#FFEFC4), Low (#97D7FF), Medium (#4D8DBA), and High (#086288).',
      step2Title: '2. Instant LocalStorage Persistence & Multi-Year Isolation',
      step2Desc:
        'Powered by a custom React useLocalStorage hook, your habit matrix is immediately serialized to your browser storage. Switch effortlessly between the current year (2026) and future years (2027–2030) with zero data collision.',
      step3Title: '3. Export Crisp PNG Streak Cards via HTML5 Canvas',
      step3Desc:
        'Click "Download Graph" to invoke our native high-DPI HTML5 Canvas engine. It renders your complete 365-day contribution heatmap, streak metrics, and custom color legend into a clean, shareable PNG image.',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is my habit tracker data ever uploaded to a server?',
      faq1A:
        'Never. HabitGrid is a 100% zero-server client-side application. Your habit boards and daily intensity logs live exclusively inside your browser via the LocalStorage API. You can also export a JSON backup file anytime.',
      faq2Q: 'How do the 4 heatmap intensity colors work?',
      faq2A:
        'Clicking a day square cycles through four carefully calibrated hex tones: Level 0 Empty (#FFEFC4 warm cream), Level 1 Low (#97D7FF sky blue), Level 2 Medium (#4D8DBA ocean blue), and Level 3 High (#086288 deep teal).',
      faq3Q: 'Can I track current and future years and export my graph for social media?',
      faq3A:
        'Yes! Use the year selector to log and plan habits across 2026, 2027, 2028, 2029, and 2030. Each year is isolated in LocalStorage, and clicking "Download Graph" exports a high-resolution PNG image ready to share.',
      footerCopyright: '© 2026 HabitGrid. Crafted with Astro, React & Tailwind CSS.',
      footerPrivacyNote: '100% Client-Side • Zero Tracking • Persisted Locally in Your Browser.',
    },
  },
  es: {
    meta: {
      title: 'HabitGrid | Rastreador de Hábitos de 365 Días Sin Servidor',
      description:
        'Aplicación web 100% en el navegador creada con Astro y React para registrar hábitos diarios en un mapa de calor de 365 días estilo GitHub. Cero servidores, privacidad total en LocalStorage y exportación PNG.',
      keywords:
        'rastreador de hábitos, mapa de calor github, hábitos 365 días, habit tracker sin servidor, localstorage, exportar gráfico de hábitos png',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: 'Mapa de Hábitos de 365 Días Sin Servidor',
      privacyBadge: '100% LocalStorage • Cero Servidor',
      languageLabel: 'Seleccionar idioma',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Oscuro',
      themeToggleAria: 'Cambiar entre tema claro y oscuro',
      supportCta: 'Apoyar al Desarrollador',
    },
    hero: {
      badge: '100% en tu Navegador • Mapa de Calor de 365 Días Estilo GitHub',
      titleStart: 'Construye Rachas Diarias Imparables en una',
      titleHighlight: 'Cuadrícula de 365 Días',
      subtitle:
        'Haz clic en cualquier día para alternar entre 4 niveles de intensidad. Cada registro se guarda al instante en tu navegador mediante LocalStorage sin cuentas, sin servidores y con descarga en PNG.',
      pillPrivacy: 'Privacidad Sin Servidor',
      pillPrivacyDesc: 'Guardado 100% en LocalStorage del navegador',
      pillHeatmap: 'Paleta de 4 Niveles',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: 'Exportación PNG Instantánea',
      pillExportDesc: 'Gráfico HD generado con HTML5 Canvas',
    },
    tracker: {
      boardTitleLabel: 'Tablero de Hábito Activo',
      boardTitlePlaceholder: 'Nombre del hábito (ej. Programar, Ejercicio, Lectura)...',
      defaultHabits: {
        coding: 'Código y Proyectos Diarios',
        fitness: 'Entrenamiento y Salud',
        reading: 'Lectura Profunda (30m)',
        mindfulness: 'Hidratación y Enfoque',
      },
      addHabitBtn: 'Nuevo Hábito',
      newHabitPrompt: 'Nombre del hábito...',
      deleteHabitTitle: 'Eliminar este hábito',
      yearSelectorLabel: 'Periodo / Año',
      rolling365: 'Últimos 365 Días',
      yearPrefix: 'Año',
      downloadGraphBtn: 'Descargar Gráfico',
      downloadingBtn: 'Generando PNG...',
      exportSuccessAlert: '¡Gráfico PNG descargado con éxito!',
      logTodayBtn: 'Marcar Hoy (+1)',
      todayLoggedBadge: 'Nivel de Hoy',
      paintModeLabel: 'Modo de Clic',
      modeCycle: 'Alternar (0→3)',
      brushPrefix: 'Pintar',
      sampleStreakBtn: 'Patrón Demo',
      clearYearBtn: 'Reiniciar Año',
      clearConfirmTitle: '¿Borrar todos los días de este periodo?',
      clearConfirmYes: 'Sí, Borrar',
      clearConfirmCancel: 'Cancelar',
      exportJsonBtn: 'Respaldar JSON',
      importJsonBtn: 'Importar JSON',
      importSuccessAlert: '¡Datos restaurados en LocalStorage!',
      importErrorAlert: 'Archivo JSON no válido.',
      stats: {
        activeDays: 'Días Activos',
        activeDaysSub: 'Días con intensidad ≥ 1',
        currentStreak: 'Racha Actual',
        currentStreakSub: 'Días activos consecutivos',
        longestStreak: 'Mejor Racha',
        longestStreakSub: 'Récord en este periodo',
        totalScore: 'Puntaje Total',
        totalScoreSub: 'Puntos de intensidad acumulados',
        completionRate: 'Consistencia',
        daysUnit: 'días',
        ptsUnit: 'pts',
      },
      levels: {
        less: 'Menos',
        more: 'Más',
        level0: 'Nivel 0 • Vacío (#FFEFC4)',
        level1: 'Nivel 1 • Intensidad Baja (#97D7FF)',
        level2: 'Nivel 2 • Intensidad Media (#4D8DBA)',
        level3: 'Nivel 3 • Intensidad Alta (#086288)',
        level0Short: 'N0 Vacío',
        level1Short: 'N1 Bajo',
        level2Short: 'N2 Medio',
        level3Short: 'N3 Alto',
      },
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      tooltipClickHint: 'Clic para cambiar intensidad (0 → 1 → 2 → 3)',
      mobileSwipeHint: 'Desliza horizontalmente para ver las 53 semanas →',
      storageStatus: 'Sincronizado en LocalStorage',
    },
    seoSection: {
      howItWorksTitle: 'Cómo Funciona HabitGrid — Arquitectura Sin Servidor',
      step1Title: '1. Haz Clic en Cualquier Cuadro para Cambiar su Intensidad',
      step1Desc:
        'Cada cuadro representa un día dentro de una matriz de 53 semanas estilo GitHub. Haz clic para alternar entre 4 estados: Vacío (#FFEFC4), Bajo (#97D7FF), Medio (#4D8DBA) y Alto (#086288).',
      step2Title: '2. Persistencia Instantánea en LocalStorage y Selector de Año',
      step2Desc:
        'Mediante nuestro hook React useLocalStorage, tu progreso se guarda automáticamente en el navegador. Cambia entre el año actual (2026) y los años futuros (2027–2030) manteniendo los datos aislados de forma segura.',
      step3Title: '3. Descarga tu Mapa en PNG con HTML5 Canvas',
      step3Desc:
        'Pulsa "Descargar Gráfico" para capturar el mapa de calor completo en alta resolución PNG listo para compartir en redes sociales.',
      faqTitle: 'Preguntas Frecuentes',
      faq1Q: '¿Mis datos de hábitos se envían a algún servidor?',
      faq1A:
        'Nunca. HabitGrid funciona 100% en el cliente. Tus registros permanecen exclusivamente en tu navegador mediante LocalStorage.',
      faq2Q: '¿Cómo funcionan los 4 niveles de color del mapa de calor?',
      faq2A:
        'Cada clic avanza el nivel del día: Nivel 0 Vacío (#FFEFC4), Nivel 1 Bajo (#97D7FF), Nivel 2 Medio (#4D8DBA) y Nivel 3 Alto (#086288).',
      faq3Q: '¿Puedo planificar años actuales y futuros y exportar una imagen PNG?',
      faq3A:
        'Sí. El selector de año aísla los datos de 2026, 2027, 2028, 2029 y 2030 en LocalStorage, y el botón Descargar Gráfico genera un PNG nítido al instante.',
      footerCopyright: '© 2026 HabitGrid. Creado con Astro, React y Tailwind CSS.',
      footerPrivacyNote: '100% en tu Navegador • Cero Servidores • Privacidad Total.',
    },
  },
  pt: {
    meta: {
      title: 'HabitGrid | Rastreador de Hábitos de 365 Dias Sem Servidor',
      description:
        'Aplicação web 100% client-side construída com Astro e React para acompanhar hábitos diários em um mapa de calor de 365 dias estilo GitHub. Zero servidor, privacidade total via LocalStorage e exportação PNG.',
      keywords:
        'rastreador de hábitos, mapa de calor github, hábitos 365 dias, habit tracker localstorage, exportar gráfico de hábitos png',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: 'Rastreador de Hábitos 365 Dias Sem Servidor',
      privacyBadge: '100% LocalStorage • Zero Servidor',
      languageLabel: 'Selecionar Idioma',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Escuro',
      themeToggleAria: 'Alternar entre tema claro e escuro',
      supportCta: 'Apoiar o Desenvolvedor',
    },
    hero: {
      badge: '100% no Navegador • Mapa de Calor de 365 Dias Estilo GitHub',
      titleStart: 'Construa Sequências Diárias Inquebráveis em uma',
      titleHighlight: 'Grade de Contribuição de 365 Dias',
      subtitle:
        'Clique em qualquer quadrado diário para alternar entre 4 níveis de intensidade. Tudo é salvo instantaneamente no LocalStorage do seu navegador sem contas, sem servidor e com exportação PNG.',
      pillPrivacy: 'Privacidade Zero-Servidor',
      pillPrivacyDesc: '100% salvo no LocalStorage do navegador',
      pillHeatmap: 'Paleta de 4 Níveis',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: 'Exportação PNG Instantânea',
      pillExportDesc: 'Imagem HD gerada via HTML5 Canvas',
    },
    tracker: {
      boardTitleLabel: 'Quadro de Hábito Ativo',
      boardTitlePlaceholder: 'Digite o nome do hábito (ex: Programação, Treino, Leitura)...',
      defaultHabits: {
        coding: 'Programação Diária',
        fitness: 'Treino e Movimento',
        reading: 'Leitura Focada (30m)',
        mindfulness: 'Hidratação e Foco',
      },
      addHabitBtn: 'Novo Hábito',
      newHabitPrompt: 'Nome do hábito...',
      deleteHabitTitle: 'Remover este hábito',
      yearSelectorLabel: 'Período / Ano',
      rolling365: 'Últimos 365 Dias',
      yearPrefix: 'Ano',
      downloadGraphBtn: 'Baixar Gráfico',
      downloadingBtn: 'Gerando PNG...',
      exportSuccessAlert: 'Gráfico PNG em alta definição baixado!',
      logTodayBtn: 'Marcar Hoje (+1)',
      todayLoggedBadge: 'Nível de Hoje',
      paintModeLabel: 'Ação do Clique',
      modeCycle: 'Alternar (0→3)',
      brushPrefix: 'Pintar',
      sampleStreakBtn: 'Padrão Demo',
      clearYearBtn: 'Limpar Ano',
      clearConfirmTitle: 'Limpar todos os dias deste período?',
      clearConfirmYes: 'Sim, Limpar',
      clearConfirmCancel: 'Cancelar',
      exportJsonBtn: 'Backup JSON',
      importJsonBtn: 'Importar JSON',
      importSuccessAlert: 'Dados restaurados no LocalStorage!',
      importErrorAlert: 'Arquivo JSON inválido.',
      stats: {
        activeDays: 'Dias Ativos',
        activeDaysSub: 'Dias com intensidade ≥ 1',
        currentStreak: 'Sequência Atual',
        currentStreakSub: 'Dias ativos seguidos',
        longestStreak: 'Maior Sequência',
        longestStreakSub: 'Melhor marca no período',
        totalScore: 'Pontuação Total',
        totalScoreSub: 'Pontos acumulados',
        completionRate: 'Consistência',
        daysUnit: 'dias',
        ptsUnit: 'pts',
      },
      levels: {
        less: 'Menos',
        more: 'Mais',
        level0: 'Nível 0 • Vazio (#FFEFC4)',
        level1: 'Nível 1 • Intensidade Baixa (#97D7FF)',
        level2: 'Nível 2 • Intensidade Média (#4D8DBA)',
        level3: 'Nível 3 • Intensidade Alta (#086288)',
        level0Short: 'N0 Vazio',
        level1Short: 'N1 Baixo',
        level2Short: 'N2 Médio',
        level3Short: 'N3 Alto',
      },
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      tooltipClickHint: 'Clique para alternar a intensidade (0 → 1 → 2 → 3)',
      mobileSwipeHint: 'Deslize horizontalmente para ver as 53 semanas →',
      storageStatus: 'Salvo no LocalStorage',
    },
    seoSection: {
      howItWorksTitle: 'Como o HabitGrid Funciona — Arquitetura Zero-Servidor',
      step1Title: '1. Clique em Qualquer Dia para Alternar a Intensidade',
      step1Desc:
        'Cada quadrado representa um dia em uma grade de 53 semanas estilo GitHub. Clique para alternar entre 4 níveis: Vazio (#FFEFC4), Baixo (#97D7FF), Médio (#4D8DBA) e Alto (#086288).',
      step2Title: '2. Persistência Instantânea no LocalStorage por Ano',
      step2Desc:
        'Com o hook React useLocalStorage, seu progresso é salvo automaticamente no navegador. Alterne entre o ano atual (2026) e anos futuros (2027–2030) com dados totalmente isolados.',
      step3Title: '3. Exporte seu Gráfico em PNG via HTML5 Canvas',
      step3Desc:
        'Clique em "Baixar Gráfico" para renderizar seu mapa de calor completo em uma imagem PNG de alta resolução pronta para compartilhar.',
      faqTitle: 'Perguntas Frequentes',
      faq1Q: 'Meus dados são enviados para algum servidor?',
      faq1A:
        'Nunca. O HabitGrid roda 100% no seu navegador e salva tudo localmente via LocalStorage.',
      faq2Q: 'Como funcionam as 4 cores de intensidade?',
      faq2A:
        'Cada clique alterna entre Nível 0 Vazio (#FFEFC4), Nível 1 Baixo (#97D7FF), Nível 2 Médio (#4D8DBA) e Nível 3 Alto (#086288).',
      faq3Q: 'Posso acompanhar o ano atual e anos futuros e baixar o gráfico em PNG?',
      faq3A:
        'Sim! Selecione 2026, 2027, 2028, 2029 ou 2030 no seletor de ano e exporte um cartão PNG completo com um único clique.',
      footerCopyright: '© 2026 HabitGrid. Desenvolvido com Astro, React e Tailwind CSS.',
      footerPrivacyNote: '100% Client-Side • Zero Rastreamento • Salvo Localmente no Navegador.',
    },
  },
  de: {
    meta: {
      title: 'HabitGrid | 365-Tage Zero-Server Gewohnheits-Tracker',
      description:
        'Eine 100% clientseitige Web-App mit Astro und React zum Verfolgen täglicher Gewohnheiten über eine 365-Tage-Heatmap im GitHub-Stil. Keine Server-Uploads, volle Privatsphäre via LocalStorage.',
      keywords:
        'Gewohnheitstracker, Habit Tracker, GitHub Heatmap, 365 Tage Gewohnheiten, LocalStorage Tracker, PNG Export',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: '365-Tage Zero-Server Habit-Tracker',
      privacyBadge: '100% LocalStorage • Kein Server',
      languageLabel: 'Sprache wählen',
      themeLight: 'Heller Modus',
      themeDark: 'Dunkler Modus',
      themeToggleAria: 'Zwischen hellem und dunklem Design wechseln',
      supportCta: 'Entwickler unterstützen',
    },
    hero: {
      badge: '100% Client-Seitig • 365-Tage-Heatmap im GitHub-Stil',
      titleStart: 'Baue tägliche Gewohnheiten auf einem',
      titleHighlight: '365-Tage-Aktivitätsraster auf',
      subtitle:
        'Klicke auf ein beliebiges Tagesfeld, um durch 4 Intensitätsstufen zu wechseln. Jeder Eintrag wird sofort via LocalStorage in deinem Browser gespeichert – ohne Konto, ohne Server und mit direktem PNG-Export.',
      pillPrivacy: 'Zero-Server Privatsphäre',
      pillPrivacyDesc: '100% lokal im Browser-LocalStorage',
      pillHeatmap: '4-Stufen-Farbpalette',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: 'Sofortiger PNG-Export',
      pillExportDesc: 'Gestochen scharfer HTML5-Canvas-Download',
    },
    tracker: {
      boardTitleLabel: 'Aktives Gewohnheits-Board',
      boardTitlePlaceholder: 'Gewohnheit eingeben (z.B. Programmieren, Sport, Lesen)...',
      defaultHabits: {
        coding: 'Tägliches Programmieren',
        fitness: 'Workout & Bewegung',
        reading: 'Konzentriertes Lesen (30m)',
        mindfulness: 'Fokus & Achtsamkeit',
      },
      addHabitBtn: 'Neue Gewohnheit',
      newHabitPrompt: 'Name der Gewohnheit...',
      deleteHabitTitle: 'Gewohnheit entfernen',
      yearSelectorLabel: 'Zeitraum / Jahr',
      rolling365: 'Letzte 365 Tage',
      yearPrefix: 'Jahr',
      downloadGraphBtn: 'Graph herunterladen',
      downloadingBtn: 'PNG wird erstellt...',
      exportSuccessAlert: 'HD-PNG-Graph erfolgreich heruntergeladen!',
      logTodayBtn: 'Heute eintragen (+1)',
      todayLoggedBadge: 'Heute Stufe',
      paintModeLabel: 'Klick-Modus',
      modeCycle: 'Wechseln (0→3)',
      brushPrefix: 'Malen',
      sampleStreakBtn: 'Demo-Muster',
      clearYearBtn: 'Jahr leeren',
      clearConfirmTitle: 'Alle Einträge dieses Zeitraums zurücksetzen?',
      clearConfirmYes: 'Ja, leeren',
      clearConfirmCancel: 'Abbrechen',
      exportJsonBtn: 'JSON-Backup',
      importJsonBtn: 'JSON importieren',
      importSuccessAlert: 'Gewohnheitsdaten im LocalStorage wiederhergestellt!',
      importErrorAlert: 'Ungültige JSON-Datei.',
      stats: {
        activeDays: 'Aktive Tage',
        activeDaysSub: 'Tage mit Intensität ≥ 1',
        currentStreak: 'Aktuelle Serie',
        currentStreakSub: 'Aufeinanderfolgende Tage',
        longestStreak: 'Längste Serie',
        longestStreakSub: 'Bestwert im Zeitraum',
        totalScore: 'Intensitäts-Punkte',
        totalScoreSub: 'Gesamtpunktzahl',
        completionRate: 'Konstanz',
        daysUnit: 'Tage',
        ptsUnit: 'Pkt',
      },
      levels: {
        less: 'Weniger',
        more: 'Mehr',
        level0: 'Stufe 0 • Leer (#FFEFC4)',
        level1: 'Stufe 1 • Niedrig (#97D7FF)',
        level2: 'Stufe 2 • Mittel (#4D8DBA)',
        level3: 'Stufe 3 • Hoch (#086288)',
        level0Short: 'S0 Leer',
        level1Short: 'S1 Niedrig',
        level2Short: 'S2 Mittel',
        level3Short: 'S3 Hoch',
      },
      months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      tooltipClickHint: 'Klicken zum Wechseln der Intensität (0 → 1 → 2 → 3)',
      mobileSwipeHint: 'Horizontal wischen, um alle 53 Wochen zu sehen →',
      storageStatus: 'Im LocalStorage gespeichert',
    },
    seoSection: {
      howItWorksTitle: 'Wie HabitGrid funktioniert — Zero-Server Architektur',
      step1Title: '1. Tagesquadrat anklicken & Intensität wählen',
      step1Desc:
        'Jedes Quadrat steht für einen Tag im 53-Wochen-Raster. Ein Klick schaltet zwischen Leer (#FFEFC4), Niedrig (#97D7FF), Mittel (#4D8DBA) und Hoch (#086288) um.',
      step2Title: '2. Sofortige LocalStorage-Speicherung & Jahresauswahl',
      step2Desc:
        'Über den React-Hook useLocalStorage bleibt dein Fortschritt dauerhaft im Browser erhalten. Wechsle nahtlos zwischen dem aktuellen Jahr (2026) und zukünftigen Jahren (2027–2030).',
      step3Title: '3. Als hochauflösendes PNG-Bild exportieren',
      step3Desc:
        'Mit einem Klick auf „Graph herunterladen“ zeichnet HTML5 Canvas deine komplette 365-Tage-Heatmap als teilbare PNG-Grafik.',
      faqTitle: 'Häufig gestellte Fragen (FAQ)',
      faq1Q: 'Werden meine Daten jemals auf einen Server hochgeladen?',
      faq1A:
        'Nein. HabitGrid läuft vollständig lokal in deinem Browser. Alle Daten bleiben im LocalStorage auf deinem Gerät.',
      faq2Q: 'Was bedeuten die 4 Farben der Heatmap?',
      faq2A:
        'Stufe 0 (#FFEFC4) steht für keinen Eintrag, Stufe 1 (#97D7FF) für niedrige, Stufe 2 (#4D8DBA) für mittlere und Stufe 3 (#086288) für hohe Aktivitätsintensität.',
      faq3Q: 'Kann ich das aktuelle Jahr und zukünftige Jahre planen und als PNG speichern?',
      faq3A:
        'Ja, über die Jahresauswahl kannst du zwischen 2026, 2027, 2028, 2029 und 2030 wechseln und jedes Raster als PNG herunterladen.',
      footerCopyright: '© 2026 HabitGrid. Entwickelt mit Astro, React & Tailwind CSS.',
      footerPrivacyNote: '100% Client-Seitig • Kein Tracking • Lokal im Browser gespeichert.',
    },
  },
  fr: {
    meta: {
      title: 'HabitGrid | Suivi d’Habitudes 365 Jours Sans Serveur',
      description:
        'Application web 100% côté client conçue avec Astro et React pour suivre vos habitudes quotidiennes via une carte thermique de 365 jours style GitHub. Zéro serveur, confidentialité totale via LocalStorage.',
      keywords:
        'suivi des habitudes, habit tracker, carte thermique github, grille 365 jours, localstorage, exporter graphique habitudes png',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: 'Suivi d’Habitudes 365 Jours Sans Serveur',
      privacyBadge: '100% LocalStorage • Zéro Serveur',
      languageLabel: 'Choisir la langue',
      themeLight: 'Mode Clair',
      themeDark: 'Mode Sombre',
      themeToggleAria: 'Basculer entre le mode clair et sombre',
      supportCta: 'Soutenir le Développeur',
    },
    hero: {
      badge: '100% Côté Client • Carte Thermique 365 Jours Style GitHub',
      titleStart: 'Forgez des Séries Quotidiennes sur une',
      titleHighlight: 'Grille de Contribution 365 Jours',
      subtitle:
        'Cliquez sur n’importe quelle case journalière pour faire défiler 4 niveaux d’intensité. Chaque action est sauvegardée instantanément dans LocalStorage sans compte, sans serveur, avec export PNG HD.',
      pillPrivacy: 'Confidentialité Zéro-Serveur',
      pillPrivacyDesc: '100% stocké dans le LocalStorage du navigateur',
      pillHeatmap: 'Palette à 4 Niveaux',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: 'Export PNG Instantané',
      pillExportDesc: 'Rendu haute résolution via HTML5 Canvas',
    },
    tracker: {
      boardTitleLabel: 'Tableau d’Habitude Actif',
      boardTitlePlaceholder: 'Nom de l’habitude (ex: Code quotidien, Sport, Lecture)...',
      defaultHabits: {
        coding: 'Code & Projets Quotidiens',
        fitness: 'Sport & Mouvement',
        reading: 'Lecture Profonde (30m)',
        mindfulness: 'Hydratation & Focus',
      },
      addHabitBtn: 'Nouvelle Habitude',
      newHabitPrompt: 'Titre de l’habitude...',
      deleteHabitTitle: 'Supprimer cette habitude',
      yearSelectorLabel: 'Période / Année',
      rolling365: '365 Derniers Jours',
      yearPrefix: 'Année',
      downloadGraphBtn: 'Télécharger le Graphique',
      downloadingBtn: 'Rendu PNG...',
      exportSuccessAlert: 'Graphique PNG HD téléchargé avec succès !',
      logTodayBtn: 'Valider Aujourd’hui (+1)',
      todayLoggedBadge: 'Niveau du Jour',
      paintModeLabel: 'Action au Clic',
      modeCycle: 'Alterner (0→3)',
      brushPrefix: 'Peindre',
      sampleStreakBtn: 'Modèle Démo',
      clearYearBtn: 'Réinitialiser',
      clearConfirmTitle: 'Effacer toutes les cases de cette période ?',
      clearConfirmYes: 'Oui, Effacer',
      clearConfirmCancel: 'Annuler',
      exportJsonBtn: 'Sauvegarde JSON',
      importJsonBtn: 'Importer JSON',
      importSuccessAlert: 'Données restaurées dans LocalStorage !',
      importErrorAlert: 'Fichier JSON invalide.',
      stats: {
        activeDays: 'Jours Actifs',
        activeDaysSub: 'Jours avec intensité ≥ 1',
        currentStreak: 'Série Actuelle',
        currentStreakSub: 'Jours actifs consécutifs',
        longestStreak: 'Meilleure Série',
        longestStreakSub: 'Record sur la période',
        totalScore: 'Score d’Intensité',
        totalScoreSub: 'Total des points cumulés',
        completionRate: 'Régularité',
        daysUnit: 'jours',
        ptsUnit: 'pts',
      },
      levels: {
        less: 'Moins',
        more: 'Plus',
        level0: 'Niveau 0 • Vide (#FFEFC4)',
        level1: 'Niveau 1 • Intensité Faible (#97D7FF)',
        level2: 'Niveau 2 • Intensité Moyenne (#4D8DBA)',
        level3: 'Niveau 3 • Intensité Élevée (#086288)',
        level0Short: 'N0 Vide',
        level1Short: 'N1 Faible',
        level2Short: 'N2 Moyen',
        level3Short: 'N3 Élevé',
      },
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      tooltipClickHint: 'Cliquez pour changer l’intensité (0 → 1 → 2 → 3)',
      mobileSwipeHint: 'Faites glisser horizontalement pour voir les 53 semaines →',
      storageStatus: 'Synchronisé dans LocalStorage',
    },
    seoSection: {
      howItWorksTitle: 'Comment Fonctionne HabitGrid — Architecture Sans Serveur',
      step1Title: '1. Cliquez sur un Jour pour Ajuster l’Intensité',
      step1Desc:
        'Chaque carré représente une journée sur une grille de 53 semaines style GitHub. Cliquez pour alterner entre Vide (#FFEFC4), Faible (#97D7FF), Moyen (#4D8DBA) et Élevé (#086288).',
      step2Title: '2. Sauvegarde LocalStorage Instantanée & Sélection d’Année',
      step2Desc:
        'Grâce au hook React useLocalStorage, votre grille est sauvegardée en temps réel dans votre navigateur. Basculez entre l’année en cours (2026) et les années futures (2027–2030) en toute sécurité.',
      step3Title: '3. Exportez Votre Carte en PNG via HTML5 Canvas',
      step3Desc:
        'Cliquez sur « Télécharger le Graphique » pour générer une image PNG haute résolution prête à être partagée sur vos réseaux sociaux.',
      faqTitle: 'Questions Fréquentes',
      faq1Q: 'Mes données d’habitudes sont-elles envoyées sur un serveur ?',
      faq1A:
        'Jamais. HabitGrid fonctionne à 100% dans votre navigateur. Toutes vos données restent privées dans votre LocalStorage.',
      faq2Q: 'Comment fonctionnent les 4 couleurs de la palette ?',
      faq2A:
        'Chaque clic fait évoluer la case : Niveau 0 Vide (#FFEFC4), Niveau 1 Faible (#97D7FF), Niveau 2 Moyen (#4D8DBA) et Niveau 3 Élevé (#086288).',
      faq3Q: 'Puis-je suivre l’année en cours et les années futures et exporter un PNG ?',
      faq3A:
        'Oui, le sélecteur d’année isole proprement 2026, 2027, 2028, 2029 et 2030 dans LocalStorage et permet d’exporter n’importe quelle grille en PNG.',
      footerCopyright: '© 2026 HabitGrid. Conçu avec Astro, React & Tailwind CSS.',
      footerPrivacyNote: '100% Côté Client • Zéro Pistage • Stocké Localement dans Votre Navigateur.',
    },
  },
  ja: {
    meta: {
      title: 'HabitGrid | 365日ゼロサーバー習慣トラッカー',
      description:
        'AstroとReactで構築された100%クライアントサイドの習慣トラッカー。GitHub風の365日コントリビューションヒートマップで毎日の習慣を記録し、ブラウザのLocalStorageに完全保存します。',
      keywords:
        '習慣トラッカー, GitHub風ヒートマップ, 365日習慣カレンダー, ゼロサーバー, LocalStorage, PNG画像出力',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: '365日ゼロサーバー習慣トラッカー',
      privacyBadge: '100% LocalStorage • サーバー通信なし',
      languageLabel: '言語を選択',
      themeLight: 'ライトモード',
      themeDark: 'ダークモード',
      themeToggleAria: 'ライトモードとダークモードを切り替え',
      supportCta: '開発者を支援する',
    },
    hero: {
      badge: '100% ブラウザ完結 • GitHub風 365日ヒートマップ',
      titleStart: '毎日の継続を視覚化する',
      titleHighlight: '365日コントリビューショングリッド',
      subtitle:
        '日付マスをクリックして4段階の達成度（0〜3）を切り替え。アカウント登録不要・サーバー送信ゼロでブラウザのLocalStorageに即座に保存され、ワンクリックで高画質PNG画像として保存できます。',
      pillPrivacy: 'ゼロサーバーの完全プライバシー',
      pillPrivacyDesc: 'ブラウザのLocalStorageに100%ローカル保存',
      pillHeatmap: '4段階カスタムカラーパレット',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: '高画質PNGエクスポート',
      pillExportDesc: 'HTML5 CanvasによるSNS共有用カード出力',
    },
    tracker: {
      boardTitleLabel: '現在の習慣ボード',
      boardTitlePlaceholder: '習慣名を入力（例：毎日コーディング、筋トレ、読書）...',
      defaultHabits: {
        coding: '毎日のコーディング・開発',
        fitness: 'ワークアウト・運動',
        reading: '集中読書 (30分)',
        mindfulness: '水分補給・マインドフルネス',
      },
      addHabitBtn: '新しい習慣',
      newHabitPrompt: '習慣のタイトル...',
      deleteHabitTitle: 'この習慣ボードを削除',
      yearSelectorLabel: '表示期間 / 年',
      rolling365: '過去365日間',
      yearPrefix: '年',
      downloadGraphBtn: 'グラフをPNG保存',
      downloadingBtn: 'PNG生成中...',
      exportSuccessAlert: '高画質PNGヒートマップを保存しました！',
      logTodayBtn: '今日を記録 (+1)',
      todayLoggedBadge: '今日のレベル',
      paintModeLabel: 'クリック動作',
      modeCycle: '順送り (0→3)',
      brushPrefix: 'ペイント',
      sampleStreakBtn: 'デモパターン',
      clearYearBtn: '期間をリセット',
      clearConfirmTitle: 'この期間の記録をすべてリセットしますか？',
      clearConfirmYes: 'はい、リセット',
      clearConfirmCancel: 'キャンセル',
      exportJsonBtn: 'JSONバックアップ',
      importJsonBtn: 'JSON復元',
      importSuccessAlert: 'LocalStorageにデータを復元しました！',
      importErrorAlert: '無効なJSONファイルです。',
      stats: {
        activeDays: '達成日数',
        activeDaysSub: 'レベル1以上の記録日',
        currentStreak: '現在の連続記録',
        currentStreakSub: '継続中のストリーク',
        longestStreak: '最長ストリーク',
        longestStreakSub: '期間内の最高連続記録',
        totalScore: '合計スコア',
        totalScoreSub: '累積インテンシティポイント',
        completionRate: '達成率',
        daysUnit: '日',
        ptsUnit: 'pt',
      },
      levels: {
        less: '少',
        more: '多',
        level0: 'レベル0 • 未記録 (#FFEFC4)',
        level1: 'レベル1 • 低 (#97D7FF)',
        level2: 'レベル2 • 中 (#4D8DBA)',
        level3: 'レベル3 • 高 (#086288)',
        level0Short: 'L0 空',
        level1Short: 'L1 低',
        level2Short: 'L2 中',
        level3Short: 'L3 高',
      },
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
      tooltipClickHint: 'クリックで強度を切り替え (0 → 1 → 2 → 3)',
      mobileSwipeHint: '横にスワイプして53週間すべてを表示 →',
      storageStatus: 'LocalStorageに自動保存済み',
    },
    seoSection: {
      howItWorksTitle: 'HabitGridの仕組み — ゼロサーバー設計',
      step1Title: '1. 日付スクエアをクリックして強度（0〜3）を切り替え',
      step1Desc:
        'GitHubスタイルの53週間グリッド上で、任意の日付をクリックするだけ。空（#FFEFC4）、低（#97D7FF）、中（#4D8DBA）、高（#086288）の4段階カラーで視覚化されます。',
      step2Title: '2. LocalStorageへの即時保存と年別切り替え',
      step2Desc:
        'カスタムReactフック useLocalStorage により、ページをリロードしても寸分違わずグリッドが復元されます。今年（2026年）および将来の年（2027年〜2030年）のデータも安全に分離保存されます。',
      step3Title: '3. HTML5 Canvasによる鮮明なPNG画像ダウンロード',
      step3Desc:
        '「グラフをPNG保存」ボタンを押すと、365日間のヒートマップ全体と統計情報を高解像度PNG画像として瞬時に書き出せます。',
      faqTitle: 'よくある質問（FAQ）',
      faq1Q: '習慣データが外部サーバーに送信されることはありますか？',
      faq1A:
        '一切ありません。HabitGridは100%ブラウザ内で動作し、すべてのデータはお使いの端末のLocalStorageにのみ保存されます。',
      faq2Q: '4段階のカラーパレットはどのように機能しますか？',
      faq2A:
        'マスをクリックするたびに、レベル0（#FFEFC4）、レベル1（#97D7FF）、レベル2（#4D8DBA）、レベル3（#086288）の順で切り替わります。',
      faq3Q: '今年や将来の年を計画してSNSシェア用の画像を保存できますか？',
      faq3A:
        'はい。年セレクターで2026年、2027年、2028年、2029年、2030年に切り替えられ、いつでもPNG画像としてダウンロード可能です。',
      footerCopyright: '© 2026 HabitGrid. Astro, React & Tailwind CSSで構築。',
      footerPrivacyNote: '100% クライアントサイド • トラッキングなし • ブラウザ内ローカル保存。',
    },
  },
  zh: {
    meta: {
      title: 'HabitGrid | 365天零服务器习惯打卡热力图',
      description:
        '基于 Astro 与 React 构建的 100% 纯前端每日习惯追踪应用，采用 GitHub 风格 365 天贡献热力图。零服务器上传，数据完全保存在浏览器 LocalStorage 中，支持一键导出高清 PNG。',
      keywords:
        '习惯追踪器, GitHub热力图, 365天习惯打卡, 零服务器习惯网格, LocalStorage打卡, 导出习惯热力图PNG',
    },
    nav: {
      brand: 'HabitGrid',
      tagline: '365天零服务器习惯追踪网格',
      privacyBadge: '100% 本地存储 • 零服务器',
      languageLabel: '选择语言',
      themeLight: '浅色模式',
      themeDark: '深色模式',
      themeToggleAria: '切换浅色或深色主题',
      supportCta: '支持开发者',
    },
    hero: {
      badge: '100% 纯前端运行 • GitHub 风格 365 天贡献热力图',
      titleStart: '在 365 天贡献网格上打造',
      titleHighlight: '牢不可破的每日习惯连击',
      subtitle:
        '点击任意日期方格即可在 4 种自定义强度等级间循环切换。所有打卡记录通过 LocalStorage 实时保存在您的浏览器中，无需注册账号、零服务器上传，并支持一键导出高清 PNG 分享卡片。',
      pillPrivacy: '零服务器隐私保护',
      pillPrivacyDesc: '100% 持久保存在浏览器 LocalStorage',
      pillHeatmap: '4 级定制色彩方案',
      pillHeatmapDesc: '#FFEFC4 • #97D7FF • #4D8DBA • #086288',
      pillExport: '一键导出 PNG 卡片',
      pillExportDesc: '基于 HTML5 Canvas 生成高清社交分享图',
    },
    tracker: {
      boardTitleLabel: '当前习惯看板',
      boardTitlePlaceholder: '输入习惯名称（例如：每日编程、健身运动、深度阅读）...',
      defaultHabits: {
        coding: '每日编程与创造',
        fitness: '健身与体能训练',
        reading: '深度阅读 (30分钟)',
        mindfulness: '饮水与正念专注',
      },
      addHabitBtn: '新建习惯',
      newHabitPrompt: '输入新习惯名称...',
      deleteHabitTitle: '删除此习惯看板',
      yearSelectorLabel: '时间范围 / 年份',
      rolling365: '过去 365 天',
      yearPrefix: '年份',
      downloadGraphBtn: '下载热力图',
      downloadingBtn: '正在生成 PNG...',
      exportSuccessAlert: '高清 PNG 习惯热力图已下载！',
      logTodayBtn: '今日打卡 (+1)',
      todayLoggedBadge: '今日等级',
      paintModeLabel: '点击模式',
      modeCycle: '循环切换 (0→3)',
      brushPrefix: '画笔',
      sampleStreakBtn: '示例数据',
      clearYearBtn: '清空本年',
      clearConfirmTitle: '确定要清空当前时间段的所有打卡方格吗？',
      clearConfirmYes: '确认清空',
      clearConfirmCancel: '取消',
      exportJsonBtn: '备份 JSON',
      importJsonBtn: '恢复 JSON',
      importSuccessAlert: '习惯数据已成功恢复至 LocalStorage！',
      importErrorAlert: '无效的 JSON 备份文件。',
      stats: {
        activeDays: '活跃天数',
        activeDaysSub: '强度 ≥ 1 的打卡天数',
        currentStreak: '当前连续打卡',
        currentStreakSub: '连续活跃天数',
        longestStreak: '最长连击纪录',
        longestStreakSub: '当前周期最佳连击',
        totalScore: '累计强度积分',
        totalScoreSub: '总活跃度得分',
        completionRate: '坚持率',
        daysUnit: '天',
        ptsUnit: '分',
      },
      levels: {
        less: '少',
        more: '多',
        level0: '等级 0 • 空白 (#FFEFC4)',
        level1: '等级 1 • 低强度 (#97D7FF)',
        level2: '等级 2 • 中强度 (#4D8DBA)',
        level3: '等级 3 • 高强度 (#086288)',
        level0Short: 'L0 空白',
        level1Short: 'L1 低',
        level2Short: 'L2 中',
        level3Short: 'L3 高',
      },
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
      tooltipClickHint: '点击切换强度等级 (0 → 1 → 2 → 3)',
      mobileSwipeHint: '左右滑动查看完整 53 周热力图 →',
      storageStatus: '已实时同步至 LocalStorage',
    },
    seoSection: {
      howItWorksTitle: 'HabitGrid 工作原理 — 零服务器架构',
      step1Title: '1. 点击任意日期方格切换 4 级活跃强度',
      step1Desc:
        '每个方格代表 GitHub 风格 53 周矩阵中的一天。点击方格即可在空白 (#FFEFC4)、低强度 (#97D7FF)、中强度 (#4D8DBA) 与高强度 (#086288) 之间循环切换。',
      step2Title: '2. LocalStorage 实时持久化与跨年份数据隔离',
      step2Desc:
        '通过自定义 React Hook useLocalStorage，您的打卡状态会立即保存在本地浏览器中。刷新页面后完美还原，并支持自由切换当前年份 (2026) 与未来年份 (2027–2030)。',
      step3Title: '3. 使用 HTML5 Canvas 导出高清 PNG 分享图',
      step3Desc:
        '点击“下载热力图”按钮即可通过原生 HTML5 Canvas 渲染完整 365 天打卡矩阵、连击统计与图例，生成干净的高清 PNG 图片以便分享到社交媒体。',
      faqTitle: '常见问题解答 (FAQ)',
      faq1Q: '我的习惯打卡数据会上传到服务器吗？',
      faq1A:
        '绝不会。HabitGrid 是 100% 纯前端应用，所有数据完全保存在您浏览器的 LocalStorage 中，您还可以随时导出 JSON 备份文件。',
      faq2Q: '4 种热力图颜色等级代表什么？',
      faq2A:
        '每次点击方格会依次切换：等级 0 空白 (#FFEFC4)、等级 1 低强度 (#97D7FF)、等级 2 中强度 (#4D8DBA) 和等级 3 高强度 (#086288)。',
      faq3Q: '我可以规划今年与未来年份的习惯并导出图片吗？',
      faq3A:
        '可以！使用年份选择器即可切换 2026、2027、2028、2029 和 2030 年，每个年份的数据在 LocalStorage 中独立安全存储，且均可一键导出 PNG。',
      footerCopyright: '© 2026 HabitGrid. 使用 Astro, React 与 Tailwind CSS 构建。',
      footerPrivacyNote: '100% 纯前端运行 • 零追踪 • 数据完全保存在本地浏览器。',
    },
  },
};

export function getTranslations(locale: string | undefined): TranslationDictionary {
  if (locale && locale in TRANSLATIONS) {
    return TRANSLATIONS[locale as Locale];
  }
  return TRANSLATIONS[DEFAULT_LOCALE];
}

export function getLocalePath(locale: Locale): string {
  return locale === 'en' ? '/' : `/?lang=${locale}`;
}
