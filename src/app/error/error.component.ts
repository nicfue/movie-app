import { Component, Input } from "@angular/core";
import { StateConfig } from "../movies-list/model/state-config.modal";


@Component({
	selector: 'app-error',
	template: `
	 <div class="error" *ngIf="errorState">
        <h3>Ett fel har inträffat</h3>
				<p>{{errorState.state == 'MOVIES' ? 'Inga filmer kan visas!' : 'Ingen film kan visas!'}}</p>
    </div>
	`,
	styles: [`
	div.error {
    color: red;
}
	`]

})
export class ErrorComponent {
	@Input() errorState: StateConfig;

}