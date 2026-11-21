import { test } from './fixtures/trello-test';

test.describe.configure({ mode: 'serial' });

test.describe("Suite", () => {
    const boardName = "first board";
    const listName = "first list";
    const secondListName = "2nd list"

    test('Verify webpage elements', async ({ request, getStartedPage }) => {
        await request.post('http://localhost:3000/api/reset');
        await getStartedPage.load();
        await getStartedPage.expectGetStartedPage();
    });

    test.describe("Main tests", () => {
        test.beforeEach(async ({request, getStartedPage}) => {
            await request.post('http://localhost:3000/api/reset');
            await getStartedPage.load();
            await getStartedPage.createFirstBoard(boardName);
        });

        test('Create first board and verify page', async ({ boardPage }) => {
            await boardPage.expectNewBoardLoaded(boardName);
        });

        test('Verify board list page after creating first board', async ({ boardPage, boardListPage }) => {
            await boardPage.goHome();
            await boardListPage.expectBoardListPage();
        });

        test('Create first list and verify', async ({ boardPage }) => {
            await boardPage.addList(listName);

            await boardPage.expectCreatedList(listName);
        });

        test('Create add cards and verify', async ({ boardPage }) => {
            const listOfCards = {
                "first_list": {
                    "index": 0,
                    "cards": ["first_card", "second card", "3rd card"]
                },
                "second_list": {
                    "index": 1,
                    "cards": ["1", "only 2 cards"]
                }
            }
            await boardPage.addList(listName);
            await boardPage.addCardToList(listOfCards["first_list"]["index"], listOfCards["first_list"]["cards"][0]);
            await boardPage.addCardToList(listOfCards["first_list"]["index"], listOfCards["first_list"]["cards"][1]);
            await boardPage.addCardToList(listOfCards["first_list"]["index"], listOfCards["first_list"]["cards"][2]);

            await boardPage.addList(secondListName);
            await boardPage.addCardToList(listOfCards["second_list"]["index"], listOfCards["second_list"]["cards"][0]);
            await boardPage.addCardToList(listOfCards["second_list"]["index"], listOfCards["second_list"]["cards"][1]);

            await boardPage.expectCreatedCardList(listOfCards["first_list"]["index"], listOfCards["first_list"]["cards"]);
            await boardPage.expectCreatedCardList(listOfCards["second_list"]["index"], listOfCards["second_list"]["cards"]);
        });

    });

    
});
