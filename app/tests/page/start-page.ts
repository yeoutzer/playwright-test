import { expect, type Locator, type Page } from '@playwright/test';

export class GetStartedPage {
    readonly page: Page;
    readonly firstBoardInput: Locator;
    readonly pageHeading: Locator;
    readonly pageParagraph: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstBoardInput = page.getByPlaceholder('Name of your first board')
        this.pageHeading = page.getByRole('heading');
        this.pageParagraph = page.getByRole('paragraph');
    }

    async expectGetStartedPage() {
        await expect(this.pageHeading).toHaveText('Get started!');
        await expect(this.pageParagraph).toHaveText('Go ahead and create your first board!');
        await expect(this.firstBoardInput).toBeEmpty();
        await expect(this.firstBoardInput).toHaveAttribute('placeholder', 'Name of your first board');
    }

    async load() {
        await this.page.goto("http://localhost:3000/")
    }

    async createFirstBoard(name: string) {
        await this.firstBoardInput.fill(name);
        await this.firstBoardInput.press("Enter");
    }
}

