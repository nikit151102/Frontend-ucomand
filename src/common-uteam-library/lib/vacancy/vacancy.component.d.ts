import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class VacancyLibraryComponent {
    private router;
    constructor(router: Router);
    cardItem: any;
    getSkillsColor(item: number): string;
    getSkills(item: number): string;
    getMotivationColor(item: string): string;
    viewUser(event: Event, id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VacancyLibraryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VacancyLibraryComponent, "lib-vacancy", never, { "cardItem": { "alias": "cardItem"; "required": false; }; }, {}, never, never, true, never>;
}
