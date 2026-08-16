import test from 'node:test';
import assert from 'node:assert/strict';
import { getPreferredCurrency } from './utils.js';

test('maps common locales to their expected currencies', () => {
  assert.equal(getPreferredCurrency('en-US'), 'USD');
  assert.equal(getPreferredCurrency('en-GB'), 'GBP');
  assert.equal(getPreferredCurrency('en-IN'), 'INR');
  assert.equal(getPreferredCurrency('de-DE'), 'EUR');
  assert.equal(getPreferredCurrency('fr-FR'), 'EUR');
  assert.equal(getPreferredCurrency('en-AU'), 'AUD');
});
