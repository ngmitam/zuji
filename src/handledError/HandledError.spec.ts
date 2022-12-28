import { HandledError } from './HandledError';

describe('HandledError', () => {
  it('should be defined', () => {
    expect(new HandledError()).toBeDefined();
  });
});
