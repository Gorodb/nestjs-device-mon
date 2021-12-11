import { TokenTypes } from '../enums/token-types.enum';

export interface JwtPayload {
  email: string;
  type: TokenTypes;
}
