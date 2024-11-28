import { useQuery } from '@tanstack/react-query';

type API = {
  '?page=1&per_page=2': {
    pagination: {
      page: 1;
      pages: 75;
      per_page: 2;
      items: 150;
      urls: {
        last: 'https://api.discogs.com/artists/422014/releases?page=75&per_page=2';
        next: 'https://api.discogs.com/artists/422014/releases?page=2&per_page=2';
      };
    };
    releases: [
      {
        id: 304470;
        title: 'In Your Hands';
        type: 'master';
        main_release: 3637079;
        artist: 'Charlie Winston';
        role: 'Producer';
        resource_url: 'https://api.discogs.com/masters/304470';
        year: 2009;
        thumb: '';
        stats: {
          community: {
            in_wantlist: 5;
            in_collection: 6;
          };
        };
      },
      {
        id: 4437701;
        status: 'Accepted';
        type: 'release';
        format: 'CD, Album';
        label: 'Murrayfield Music, East West France, Murrayfield Music, East West France';
        title: "Chasser L'écume";
        resource_url: 'https://api.discogs.com/releases/4437701';
        role: 'Mixed by';
        artist: 'DUN LEIA';
        year: 2000;
        thumb: '';
        stats: {
          community: {
            in_wantlist: 1;
            in_collection: 11;
          };
        };
      }
    ];
  };
};

const endpoint: string = 'https://api.discogs.com/artists/';
const artistId: string = '422014';
export const useFetchQuery = <T extends keyof API>(path: T) => {
  useQuery({
    queryKey: [path],
    queryFn: async () => {
      console.log('fullPath', endpoint + artistId + path);
      // await wait(1);
      return await fetch(endpoint + artistId + path, {
        // cette option headers permet de s'assurer qu'on renvoie du json
        headers: {
          Accept: 'application.json',
        },
      }).then((result) => result.json() as Promise<API[T]>);
    },
  });
};
