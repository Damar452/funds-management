import { Fund } from '@core/models';

export const MOCK_FUNDS: Fund[] = [
	{
		id: 1,
		name: 'FPV_BTG_PACTUAL_RECAUDADORA',
		description: 'Fondo de pensiones voluntarias',
		minAmount: 75000,
		category: 'FPV',
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
	{
		id: 2,
		name: 'FPV_BTG_PACTUAL_ECOPETROL',
		description: 'Fondo de pensiones voluntarias con inversión en Ecopetrol',
		minAmount: 125000,
		category: 'FPV',
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
	{
		id: 3,
		name: 'DEUDAPRIVADA',
		description: 'Fondo de inversión colectiva en deuda privada',
		minAmount: 50000,
		category: 'FIC',
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
];
