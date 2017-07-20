import { BelatrixPage } from './app.po';

describe('belatrix App', () => {
  let page: BelatrixPage;

  beforeEach(() => {
    page = new BelatrixPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
