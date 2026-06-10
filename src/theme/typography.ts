import { Platform } from 'react-native';

export const typography = {
    hero: {
        fontSize: 34,
        lineHeight: 38,
        fontWeight: '700' as const,
        letterSpacing: -0.8,
    },
    title: {
        fontSize: 26,
        lineHeight: 31,
        fontWeight: '700' as const,
        letterSpacing: -0.4,
    },
    heading: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '700' as const,
    },
    body: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400' as const,
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 0.2,
    },
    displayFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'system-ui' }),
} as const;
