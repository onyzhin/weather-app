import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';
import { TemperatureFormatterPipe } from './temperature-formatter.pipe';

describe('TemperatureFormatterPipe', () => {
  let spectator: SpectatorPipe<TemperatureFormatterPipe>;
  const createPipe = createPipeFactory(TemperatureFormatterPipe);

  it('should handle non-numeric values', () => {
    spectator = createPipe(`{{ undefined | temperatureFormatter }}`);
    expect(spectator.element).toHaveText('');
  });

  it('should handle non-numeric values if paramter was set', () => {
    spectator = createPipe(`{{ undefined | temperatureFormatter : 'F' }}`);
    expect(spectator.element).toHaveText('');
  });

  it('should add celsius as default formatter', () => {
    spectator = createPipe(`{{ 10 | temperatureFormatter }}`);
    expect(spectator.element).toHaveText('10.0 °C');
  });

  it('should add celsius if parameter was set', () => {
    spectator = createPipe(`{{ 10 | temperatureFormatter : 'C' }}`);
    expect(spectator.element).toHaveText('10.0 °C');
  });

  it('should convert to fahrenheit', () => {
    spectator = createPipe(`{{ 10 | temperatureFormatter : 'F' }}`);
    expect(spectator.element).toHaveText('50.0 °F');
  });
});
