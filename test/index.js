import { Selector } from 'testcafe';

const baseURL = 'http://localhost:8080';

fixture `NavigationPrompt`
  .page `${baseURL}`;

const assertPath = ({ t, path }) => {
  return new Promise((resolve, reject) => {
    t.eval(() => document.documentURI).then(docURI => {
      return t.expect(docURI).eql(`${baseURL}${path}`);
    }).then(resolve).catch(reject);
  });
};
const getLink = (path) => Selector(`a[href$="${path}"]`)
const navCancel = Selector('.nav-cancel');
const navConfirm = Selector('.nav-confirm');

test('history is not blocked when User navigates away - (gh issue #3)', async t => {
  // "I first prompt and select no (do not navigate away)."
  await t.click(getLink('/issues'))
    .click(getLink('/issues/3'))
    .click(getLink('/issues/3/a'))
    .click(getLink('/issues/3/b'))
    .click(navCancel);
  await assertPath({ t, path: '/issues/3/a' });
  // "I then prompt and select yes (navigate away)."
  await t.click(getLink('/issues/3/b'))
    .click(navConfirm);
  await assertPath({ t, path: '/issues/3/b' });
  // "On my other page, I don't have the NavigationPrompt so no unblocking occurs there"
  // Assert that history was successfully unblocked:
  await t.click(getLink('/issues/3/a'))
  await assertPath({ t, path: '/issues/3/a' });
});

test('NavigationPrompt shows again after calling `onConfirm` - (gh issue #4)', async t => {
  await t.click(getLink('/issues'))
    .click(getLink('/issues/4'))
    .click(getLink('/issues/4/a'))
    .click(getLink('/issues/4/b'));
  await assertPath({ t, path: '/issues/4/a' });
  // call `onConfirm`
  await t.click(navConfirm);
  await assertPath({ t, path: '/issues/4/b' });
  await t.click(getLink('/issues/4/a'))
    // NavigationPrompt shows again
    .click(navConfirm);
  await assertPath({ t, path: '/issues/4/a' });
});

test('afterCancel is callable - (gh issue #11)', async t => {
  await t.click(getLink('/issues'))
    .click(getLink('/issues/11'))
    .click(getLink('/issues/11/with-prompt'))
    // cancel navigation away
    .click(getLink('/issues/11/without-prompt'))
    .click(navCancel);
  await assertPath({ t, path: '/issues/11/with-prompt' });
  // assert afterCancel was called
  await t.expect(Selector('.was-after-cancel-called').textContent).eql('true');
});

test('afterConfirm is callable (even when NavigationPrompt is unmounted) - (gh issue #11)', async t => {
  // render NavigationPrompt
  await t.click(getLink('/issues'))
    .click(getLink('/issues/11'))
    .click(getLink('/issues/11/with-prompt'))
    // confirm navigation away, unmounting NavigationPrompt
    .click(getLink('/issues/11/without-prompt'))
    .click(navConfirm);
  await assertPath({ t, path: '/issues/11/without-prompt' });
  // assert afterConfirm was called
  await t.expect(Selector('.was-after-confirm-called').textContent).eql('true');
});

test('search is updated when navigation is confirmed - (gh issue #20)', async t => {
  await t.click(getLink('/issues'))
    .click(getLink('/issues/20'))
    .click(getLink('/issues/20#main'))
    .click(navConfirm);
  await assertPath({ t, path: '/issues/20#main'})
  await t.click(getLink('/issues/20#main?lang=es'))
    .click(navConfirm);
  await assertPath({ t, path: '/issues/20#main?lang=es' })
});
