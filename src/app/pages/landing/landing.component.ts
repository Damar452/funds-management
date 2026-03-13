import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureCardComponent, FundPreviewCardComponent, HeaderComponent } from '@shared';
import { features, fundPreviews } from './landing.consts';

@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [RouterLink, FeatureCardComponent, FundPreviewCardComponent, HeaderComponent],
	templateUrl: './landing.component.html',
})
export class LandingComponent {
	features = features;
	fundPreviews = fundPreviews;
}
