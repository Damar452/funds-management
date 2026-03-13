import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '@core/models';

@Component({
	selector: 'app-view-toggle',
	standalone: true,
	imports: [],
	templateUrl: './view-toggle.component.html',
})
export class ViewToggleComponent {
	@Input() currentView: ViewMode = ViewMode.CARDS;
	@Input() showTimeline = false;
	@Output() viewChange = new EventEmitter<ViewMode>();

	readonly ViewMode = ViewMode;

	setView(view: ViewMode): void {
		this.viewChange.emit(view);
	}
}
