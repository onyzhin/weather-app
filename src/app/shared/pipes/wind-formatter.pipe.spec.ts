import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';
import { WindFormatterPipe } from './wind-formatter.pipe';

describe('WindFormatterPipe', () => {
  let spectator: SpectatorPipe<WindFormatterPipe>;
  const createPipe = createPipeFactory(WindFormatterPipe);

  it('should handle non-numeric values', () => {
    spectator = createPipe(`{{ undefined | windFormatter }}`);
    expect(spectator.element).toHaveText('');
  });

  it('should add m/s and format number', () => {
    spectator = createPipe(`{{ 4 | windFormatter }}`);
    expect(spectator.element).toHaveText('4.0m/s');
  });
});
