import { apiClientFactory } from './api-client-factory'

import type { ResponseWithMessage } from '@/models/api'
import type { TagItem } from '@/models/api/maps'
import type { PlaceDetail, KorrkPlace, PlaceItem } from '@/models/api/place'
import type { QueryParams } from '@/models/api/search'
import type {
  InviteLink,
  MapInfo,
  MapInviteInfoResponseType,
  UserByMapInfo,
} from '@/models/map'
import type { User } from '@/models/user'
import { createUserPatchFormData } from '../formdata'
import type { GptUsage } from '@/models/api/gpt'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {
  maps: {
    mapId: {
      delete: ({ mapId }: { mapId: string }) =>
        client.secure.delete(`/users/maps/${mapId}`),
    },
  },
  me: {
    get: (): Promise<ResponseWithMessage<User>> =>
      client.secure.get(`/users/me`),
    patch: (userData: {
      nickname?: User['nickname']
      profileImage?: File
    }): Promise<ResponseWithMessage<User>> => {
      return client.secure.patch(`/users/me`, createUserPatchFormData(userData))
    },
  },
  check: {
    nickname: {
      get: (nickname: string): Promise<ResponseWithMessage<User>> =>
        client.public.get(`/users/check/nickname?nickname=${nickname}`),
    },
  },
  id: {
    get: (id: User['id']): Promise<ResponseWithMessage<Omit<User, 'role'>>> =>
      client.secure.get(`/users/${id}`),
  },
}

const maps = {
  get: (): Promise<ResponseWithMessage<UserByMapInfo[]>> =>
    client.secure.get(`/maps`),
  post: (name: string): Promise<ResponseWithMessage<UserByMapInfo>> =>
    client.secure.post(`/maps`, { name }),
  id: {
    get: (id: MapInfo['id']): Promise<ResponseWithMessage<MapInfo>> =>
      client.secure.get(`/maps/${id}`, { tags: ['map', id] }),
    patch: ({
      id,
      name,
      description,
      isPublic,
    }: {
      id: MapInfo['id']
      name: string
      description: string
      isPublic: boolean
    }): Promise<ResponseWithMessage<MapInfo>> =>
      client.secure.patch(`/maps/${id}`, { name, description, isPublic }),

    tag: {
      get: (id: MapInfo['id']): Promise<ResponseWithMessage<TagItem[]>> =>
        client.secure.get(`/maps/${id}/tag`, { tags: ['tag', id] }),
      post: ({
        id,
        name,
      }: {
        id: MapInfo['id']
        name: string
      }): Promise<ResponseWithMessage<TagItem>> =>
        client.secure.post(`/maps/${id}/tag`, { name }),
    },

    inviteLinks: {
      post: (id: MapInfo['id']): Promise<ResponseWithMessage<InviteLink>> =>
        client.secure.post(`/maps/${id}/invite-links`),
    },
  },
  inviteLinks: {
    get: (
      token: string,
    ): Promise<ResponseWithMessage<MapInviteInfoResponseType>> =>
      client.public.get(`/maps/invite-links/${token}`),
    post: (token: string): Promise<ResponseWithMessage<{}>> =>
      client.secure.post(`/maps/invite-links/${token}`),
  },

  roles: {
    id: {
      userId: {
        patch: ({
          id,
          userId,
          role,
        }: {
          id: MapInfo['id']
          userId: User['id']
          role: UserByMapInfo['role']
        }): Promise<ResponseWithMessage<MapInfo>> =>
          client.secure.patch(`/maps/roles/${id}/${userId}`, {
            role,
            userId,
          }),
      },
    },
  },

  kick: {
    id: {
      post: ({ id, userId }: { id: MapInfo['id']; userId: User['id'] }) =>
        client.secure.post(`/maps/kick/${id}`, { userId }),
    },
  },
}

const search = {
  suggest: {
    get: (q: string): Promise<ResponseWithMessage<string[]>> =>
      client.public.get(`/search/suggest?q=${q}`),
  },
  places: {
    get: ({
      q,
      rect,
      mapId,
    }: QueryParams & { mapId: MapInfo['id'] }): Promise<
      ResponseWithMessage<PlaceItem[]>
    > =>
      client.public.get(`/search/places?q=${q}&rect=${rect}&mapId=${mapId}`, {
        tags: ['places', mapId],
      }),
  },
}

interface PlaceIdWithMapId {
  placeId: KorrkPlace['place']['id']
  mapId: MapInfo['id']
}

const place = {
  mapId: {
    get: (mapId: MapInfo['id']): Promise<ResponseWithMessage<KorrkPlace[]>> =>
      client.secure.get(`/place/${mapId}`),
    nearby: {
      get: ({
        mapId,
        lat,
        lng,
        radius,
      }: {
        mapId: MapInfo['id']
        lat: number
        lng: number
        radius: number
      }): Promise<ResponseWithMessage<KorrkPlace[]>> =>
        client.secure.get(
          `/place/${mapId}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`,
        ),
    },
    userId: {
      get: ({
        mapId,
        userId,
      }: {
        mapId: MapInfo['id']
        userId: User['id']
      }): Promise<ResponseWithMessage<KorrkPlace[]>> =>
        client.secure.get(`/place/${mapId}/${userId}`),
    },

    placeId: {
      delete: ({ placeId, mapId }: PlaceIdWithMapId) =>
        client.secure.delete(`/place/${mapId}/${placeId}`),

      like: {
        put: ({ placeId, mapId }: PlaceIdWithMapId) =>
          client.secure.put(`/place/${mapId}/${placeId}/like`),

        delete: ({ placeId, mapId }: PlaceIdWithMapId) =>
          client.secure.delete(`/place/${mapId}/${placeId}/like`),
      },
    },

    kakao: {
      kakaoPlaceId: {
        get: ({
          mapId,
          kakaoPlaceId,
        }: {
          mapId: MapInfo['id']
          kakaoPlaceId: KorrkPlace['place']['kakaoPlace']['id']
        }): Promise<ResponseWithMessage<PlaceDetail>> =>
          client.secure.get(`/place/${mapId}/kakao/${kakaoPlaceId}`),

        post: ({
          mapId,
          kakaoPlaceId,
          tagNames,
        }: {
          mapId: MapInfo['id']
          kakaoPlaceId: KorrkPlace['place']['kakaoPlace']['id']
          tagNames: TagItem['name'][]
        }): Promise<ResponseWithMessage<KorrkPlace>> =>
          client.secure.post(`/place/${mapId}/kakao/${kakaoPlaceId}`, {
            tagNames,
          }),
      },
    },
  },
  placeId: {
    get: (placeId: string): Promise<ResponseWithMessage<KorrkPlace>> =>
      client.secure.get(`place/${placeId}`),
  },
  differ: {
    mapId: {
      userId: {
        get: ({
          mapId,
          userId,
        }: {
          mapId: MapInfo['id']
          userId: User['id']
        }): Promise<ResponseWithMessage<number>> =>
          client.secure.get(`/place/differ/${mapId}/${userId}`),
      },
    },
  },
  like: {
    mapId: {
      userId: {
        get: ({
          userId,
          mapId,
        }: {
          userId: User['id']
          mapId: MapInfo['id']
        }): Promise<ResponseWithMessage<KorrkPlace[]>> =>
          client.secure.get(`/place/like/${mapId}/${userId}`),
      },
    },
  },
}

const proxy = {
  get: (url: string): Promise<any> => client.public.get(`/proxy?url=${url}`),
}

const gpt = {
  usage: {
    get: (): Promise<ResponseWithMessage<GptUsage>> =>
      client.secure.get('/gpt/usage'),
  },
  restaurants: {
    recommend: {
      get: (question: string, x: string, y: string): Promise<any> =>
        client.secure.get(
          `/gpt/restaurants/recommend?question=${question}&x=${x}&y=${y}`,
        ),
      test: {
        get: (question: string, x: string, y: string): Promise<any> =>
          client.secure.get(
            `/gpt/restaurants/recommend/test?question=${question}&x=${x}&y=${y}`,
          ),
      },
    },
  },
}

export const api = {
  users,
  maps,
  search,
  place,
  proxy,
  gpt,
} as const
