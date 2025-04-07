import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class ResumeLibraryComponent {
    private router;
    constructor(router: Router);
    cardItem: any;
    visibleSections: string[];
    isVisible(section: string): boolean;
    getSkillsColor(item: number): string;
    getSkills(item: number): string;
    getSkillText(item: number): string;
    getMotivationColor(item: string): string;
    viewUser(event: Event, id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResumeLibraryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ResumeLibraryComponent, "lib-resume", never, { "cardItem": { "alias": "cardItem"; "required": false; }; "visibleSections": { "alias": "visibleSections"; "required": false; }; }, {}, never, never, true, never>;
}
