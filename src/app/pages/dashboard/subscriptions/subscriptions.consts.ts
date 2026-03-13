import { TableColumn } from '@shared/components/data-table/data-table.component';

export const SUBSCRIPTIONS_TABLE_COLUMNS: TableColumn[] = [
    { key: 'category', header: 'Categoría' },
    { key: 'fund', header: 'Fondo' },
    { key: 'amount', header: 'Monto Invertido' },
    { key: 'notification', header: 'Notificación' },
    { key: 'date', header: 'Fecha' },
    { key: 'action', header: 'Acción' },
];