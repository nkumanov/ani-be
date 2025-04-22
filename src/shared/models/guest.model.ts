export interface INewGuest {
  attend: EGuestAttend;
  meal?: string;
  alergy?: string;
  name: string;
}

export enum EGuestAttend {
  ATTEND = 'comming',
  NOT_ATTEND = 'notComming',
}

export interface INewGuestDto {
  name: string;
  meal: string;
  alergy: string;
}

export interface INewNotCommingGuestDto {
  attend: EGuestAttend;
  name: string;
}

export interface INewCommingGuestDto {
  attend: EGuestAttend;
  guests: INewGuestDto[];
}
