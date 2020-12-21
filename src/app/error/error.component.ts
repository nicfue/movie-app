import { Component, Input } from "@angular/core";

@Component({
	selector: 'app-error',
	template: `
	 <div class="error" *ngIf="showError">
        <h3>Ett fel har inträffat</h3>
				<p>Ingen film kunde visas!</p>
    </div>
	`,
	styles: [`
	div.error {
    color: red;
}
	`]

})
export class ErrorComponent {
	@Input() showError: boolean;
}