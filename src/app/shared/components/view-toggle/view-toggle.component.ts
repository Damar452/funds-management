import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ViewMode = 'cards' | 'table';

@Component({
	selector: 'app-view-toggle',
	standalone: true,
	imports: [],
	templateUrl: './view-toggle.component.html',
})
export class ViewToggleComponent {
	@Input() currentView: ViewMode = 'cards';
	@Output() viewChange = new EventEmitter<ViewMode>();

	setView(view: ViewMode): void {
		this.viewChange.emit(view);
	}
}
