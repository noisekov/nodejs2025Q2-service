export const isValidUUID = (uuid: string): boolean => {
  const REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (REGEX.test(uuid)) {
    return true;
  }

  return false;
};
