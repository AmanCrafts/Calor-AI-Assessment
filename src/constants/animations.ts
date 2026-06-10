import { FadeInUp } from 'react-native-reanimated';

export const screenEnter = FadeInUp.duration(280).withInitialValues({
  opacity: 0,
  transform: [{ translateY: 8 }],
});
