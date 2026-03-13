import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
	let component: SearchInputComponent;
	let fixture: ComponentFixture<SearchInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchInputComponent, FormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('inputs', () => {
		it('should have default placeholder', () => {
			expect(component.placeholder).toBe('Buscar...');
		});

		it('should have empty searchTerm initially', () => {
			expect(component.searchTerm).toBe('');
		});
	});

	describe('onSearch', () => {
		it('should emit trimmed search term', () => {
			spyOn(component.search, 'emit');
			component.searchTerm = '  test  ';
			component.onSearch();
			expect(component.search.emit).toHaveBeenCalledWith('test');
		});

		it('should emit empty string when searchTerm is empty', () => {
			spyOn(component.search, 'emit');
			component.searchTerm = '';
			component.onSearch();
			expect(component.search.emit).toHaveBeenCalledWith('');
		});
	});

	describe('onClear', () => {
		it('should clear searchTerm and emit empty string', () => {
			spyOn(component.search, 'emit');
			component.searchTerm = 'test';
			component.onClear();
			expect(component.searchTerm).toBe('');
			expect(component.search.emit).toHaveBeenCalledWith('');
		});
	});
});
