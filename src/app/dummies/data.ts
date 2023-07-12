import { ApiResponse } from '../models/api.response';

export const _prev: ApiResponse = {
  quotes: {
    RUBCNY: 0.079863,
    RUBEUR: 0.010042,
    RUBGBP: 0.008584,
    RUBJPY: 1.56043,
    RUBTRY: 0.287972,
    RUBUSD: 0.011044,
  },
  source: 'RUB',
  success: true,
  timestamp: 1689018423,
} as const;

export const _next: ApiResponse = {
  quotes: {
    RUBCNY: 0.079863,
    RUBEUR: 0.010041,
    RUBGBP: 0.008586,
    RUBJPY: 1.560597,
    RUBTRY: 0.287951,
    RUBUSD: 0.011044,
  },
  source: 'RUB',
  success: true,
  timestamp: 1689019384,
} as const;
