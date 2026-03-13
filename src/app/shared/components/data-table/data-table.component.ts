import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface TableColumn {
	key: string;
	header: string;
	width?: string;
}

@Component({
	selector: 'app-data-table',
	standalone: true,
	imports: [NgTemplateOutlet],
	templateUrl: './data-table.component.html',
})
export class DataTableComponent<T> {
	@Input({ required: true }) columns!: TableColumn[];
	@Input({ required: true }) data!: T[];
	@Input() trackBy: keyof T = 'id' as keyof T;
	@Input() emptyMessage = 'No hay datos disponibles';

	@ContentChild('rowTemplate') rowTemplate!: TemplateRef<{ $implicit: T; index: number }>;

	trackByFn(index: number, item: T): unknown {
		return item[this.trackBy];
	}
}
