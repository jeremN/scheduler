export const formattedModifiers = (baseClassName, modifiers = []) => Array.isArray(modifiers) && modifiers.length ? modifiers.map(modifier => `${baseClassName}--${modifier}`).join(' ') : '';
export const formattedClasses = classes =>  Array.isArray(classes) && classes.length ? classes.join(' ') : '';

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps
});
