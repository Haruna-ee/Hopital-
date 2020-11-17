import { AdminlayoutModule } from './adminlayout.module';

describe('LayoutModule', () => {
    let layoutModule: AdminlayoutModule;

    beforeEach(() => {
        layoutModule = new AdminlayoutModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
