
export const getGradientFromImage = (colorScheme) => {
    const { primary, secondary } = colorScheme;
    return `linear-gradient(to bottom, ${primary} 0%, ${secondary} 100%)`;
  };
  
  export const getTextColor = (backgroundColor) => {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? '#000000' : '#FFFFFF';
  };