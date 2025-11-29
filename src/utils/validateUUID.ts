import { validate } from 'uuid';

export const isValidUUID = (uuid: string): boolean => {
  return validate(uuid);
};
