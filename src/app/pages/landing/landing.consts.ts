export const features = [
    {
        title: 'Visualiza Fondos',
        description: 'Explora todos los fondos disponibles con información detallada sobre montos mínimos y categorías.',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        colorClass: 'primary' as const,
    },
    {
        title: 'Suscríbete a Fondos',
        description: 'Invierte en los fondos que prefieras y elige cómo recibir notificaciones de tus operaciones.',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        colorClass: 'secondary' as const,
    },
    {
        title: 'Historial Completo',
        description: 'Consulta todas tus transacciones, suscripciones y cancelaciones en un solo lugar.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        colorClass: 'accent' as const,
    },
];

export const fundPreviews = [
    {
        category: 'FPV' as const,
        categoryLabel: 'Fondo de Pensiones Voluntarias',
        title: 'Pensiones Voluntarias',
        description: 'Ahorra para tu futuro con beneficios tributarios. Ideal para complementar tu pensión obligatoria.',
        minAmount: 75000,
    },
    {
        category: 'FIC' as const,
        categoryLabel: 'Fondo de Inversión Colectiva',
        title: 'Inversión Colectiva',
        description: 'Diversifica tu portafolio con acceso a diferentes mercados y activos financieros.',
        minAmount: 50000,
    },
];