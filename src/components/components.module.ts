import { NgModule } from '@angular/core';
import { BaseComponent } from './base/base';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
@NgModule({
	declarations: [BaseComponent,
    CustomLoggedHeaderComponent],
	imports: [],
	exports: [BaseComponent,
    CustomLoggedHeaderComponent]
})
export class ComponentsModule {}
