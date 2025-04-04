// This is a simplified version. In a real implementation, you might use a library like color-thief
// to extract dominant colors from images dynamically.

export const getGradientFromImage = (colorScheme) => {
    const { primary, secondary } = colorScheme;
    return `linear-gradient(to bottom, ${primary} 0%, ${secondary} 100%)`;
  };
  
  export const getTextColor = (backgroundColor) => {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return white for dark backgrounds, black for light backgrounds
    return brightness > 125 ? '#000000' : '#FFFFFF';
  };