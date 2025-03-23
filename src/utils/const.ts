type PageCodes =
  | 'home'
  | 'auth'
  | 'profile'
  | 'createTrip';

type PageConf = { link: string };


export const pages: { [code in PageCodes]: PageConf } = {
  home: { link: '/' },
  auth: { link: '/auth' },
  profile: { link: '/profile' },
  createTrip: { link: '/create-trip' },
};