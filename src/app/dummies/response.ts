import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.response';

export function generateSampleResponse() {
  function withNoise(val: number) {
    if (Math.random() < 0.33) return val;
    const actual = 1 / val;
    return (
      1 /
      (actual +
        ((Math.random() * actual) / 50) * (Math.random() > 0.5 ? -1 : 1))
    );
  }

  return new Observable<ApiResponse>((subscriber) => {
    subscriber.next({
      success: true,
      timestamp: 0,
      source: 'RUB',
      quotes: {
        RUBCNY: withNoise(0.079863),
        RUBEUR: withNoise(0.010042),
        RUBGBP: withNoise(0.008584),
        RUBJPY: withNoise(1.56043),
        RUBTRY: withNoise(0.287972),
        RUBUSD: withNoise(0.011044),
      },
    });
  });
}
