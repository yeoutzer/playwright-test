import List from '@/typings/list';
import { expect, type Locator, type Page } from '@playwright/test';

export class BoardPage {
    readonly page: Page;
    readonly favoriteButton: Locator;
    readonly boardOptionsButton: Locator;
    readonly boardTitle: Locator;
    readonly enterListTitle: Locator;
    readonly boardLists: Locator;
    readonly listName: Locator;
    readonly addAnotherCard: Locator;
    readonly enterCardTitle: Locator;
    readonly addCard: Locator;
    readonly cardTexts: Locator;
    readonly homeButton: Locator;
    readonly createListButton: Locator;
    readonly addListButton: Locator;
    readonly cancelAddListButton: Locator;
    readonly listOptionsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.favoriteButton = page.getByTestId('star');
        this.boardOptionsButton = page.getByTestId('board-options');
        this.boardTitle = page.getByTestId('board-title');
        this.enterListTitle = page.getByTestId('add-list-input');
        this.boardLists = page.getByTestId('list');
        this.listName = page.getByTestId('list-name');
        this.addAnotherCard = page.getByTestId('new-card');
        this.enterCardTitle = page.getByTestId('new-card-input');
        this.addCard = page.getByRole('button', { name: 'Add card' });
        this.cardTexts = page.getByTestId('card-text');
        this.homeButton = page.getByTestId('home');
        this.createListButton = page.getByTestId('create-list');
        this.addListButton = page.getByRole('button', { name: 'Add list' });
        this.cancelAddListButton = page.getByTestId('cancel');
        this.listOptionsButton = page.getByTestId('list-options');
    }

    async expectNewBoardLoaded(boardName: string) {
        await expect(this.boardTitle).toBeVisible;
        await expect(this.boardTitle).toHaveValue(boardName);
        await expect(this.boardLists);


        await expect(this.favoriteButton).toBeVisible();
        await expect(this.boardOptionsButton).toBeVisible();
        await expect(this.homeButton).toBeVisible();
        await expect(this.addListButton).toBeVisible();
        await expect(this.cancelAddListButton).toBeVisible();
        await expect(this.enterListTitle).toBeVisible();
        await expect(this.enterListTitle).toHaveAttribute('placeholder', 'Enter list title...');
    }

    async expectCancelAddList() {
        await expect(this.createListButton).toBeVisible();
        await expect(this.createListButton).toHaveText('Add a list');
    }

    async cancelAddList() {
        if (await this.cancelAddListButton.isVisible()) {
            await this.cancelAddListButton.click();
        }
    }

    async addList(listName: string) {
        if (await this.createListButton.isVisible()) {
            await this.createListButton.click();
        }
        await this.enterListTitle.fill(listName);
        await this.addListButton.click()
    }

    async expectCreatedList(listName: string) {
        await expect(this.listName).toHaveValue(listName);
        await expect(this.listOptionsButton).toBeVisible();
        await expect(this.addAnotherCard).toBeVisible();
        await expect(this.addAnotherCard).toHaveText('Add another card');
        await expect(this.addListButton).toBeVisible();
        await expect(this.enterListTitle).toBeVisible();
        await expect(this.enterListTitle).toHaveAttribute('placeholder', 'Enter list title...');
        await expect(this.cancelAddListButton).toBeVisible();
    }

    async addCardToList(listIndex: number, cardName: string) {
        if (!(await this.enterCardTitle.isVisible())) {
            await this.addAnotherCard.nth(listIndex).click();
        }
        await this.enterCardTitle.fill(cardName);
        await this.addCard.click()
    }

    async expectCreatedCardList(listIndex: number, cardNames: string[]) {
        await expect(this.boardLists.nth(listIndex).getByTestId('card-text')).toHaveText(cardNames);
    }

    async goHome() {
        await this.homeButton.click();
    }
}