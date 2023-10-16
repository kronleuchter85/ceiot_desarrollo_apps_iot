import { FormatDatePipe } from './format-date.pipe';

describe('SpacefyPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });
});
