import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search-input',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
	@Input() placeholder = 'Buscar...';
	@Output() search = new EventEmitter<string>();

	searchTerm = '';

	onSearch(): void {
		this.search.emit(this.searchTerm.trim());
	}

	onClear(): void {
		this.searchTerm = '';
		this.search.emit('');
	}
}
