import { Platform } from 'react-native';

export const shadows = {
    soft: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOpacity: 0.28,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
        },
        android: {
            elevation: 10,
        },
        default: {},
    }),
    strong: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOpacity: 0.42,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 14 },
        },
        android: {
            elevation: 14,
        },
        default: {},
    }),
} as const;
