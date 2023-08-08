import useSWR from "swr";
import { IAd, IChat, IUser } from "./interfaces";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
const updater = async (url: string, body: {}) => {
  let data = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((err) => err);
  let r = await data.json();
  return r;
};
const deleter = async (url: string, id: string | undefined) => {
  let data = await fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((err) => err);
  let r = await data.json();
  return r;
};
const poster = async (url: string, body: {}) => {
  let data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((err) => err);
  let r = await data.json();
  return r;
};

function useAd(id: string | any) {
  const {
    data,
    error,
    isLoading,
  }: { data: IAd; isLoading: boolean; error: undefined } = useSWR(
    `/api/ads/${id}`,
    fetcher
  );

  return {
    ad: data?._id ? data : null,
    isLoading,
    error: error,
  };
}

function useAds(query?: unknown) {
  const {
    data,
    error,
    isLoading,
  }: { data: IAd[]; isLoading: boolean; error: undefined } = useSWR(
    `/api/ads${query ? "?" + query : ""}`,
    fetcher
  );

  return {
    ads: data,
    isLoading,
    error: error,
  };
}
function useProfile() {
  const {
    data,
    error,
    isLoading,
  }: { data: IUser; isLoading: boolean; error: undefined } = useSWR(
    "/api/users/profile",
    fetcher
  );
  if (!data || error) {
    return {
      profile: null,
      isLoading: false,
      error: null,
    };
  }

  return {
    profile: data?._id ? data : null,
    isLoading: isLoading,
    error: error,
  };
}

function useAUser(id: unknown) {
  const {
    data,
    error,
    isLoading,
  }: { data: IUser; isLoading: boolean; error: undefined } = useSWR(
    `/api/users/${id}`,
    fetcher
  );

  return {
    user: data?._id ? data : null,
    isLoading,
    error: error,
  };
}

function useSearch(queries?: string | any) {
  const {
    data,
    error,
    isLoading,
  }: { data: IAd[]; isLoading: boolean; error: undefined } = useSWR(
    `/api/ads/search${queries ? queries : ""}`,
    fetcher
  );

  return {
    ads: data,
    isLoading,
    error: error,
  };
}

function useChats() {
  const {
    data,
    error,
    isLoading,
  }: { data: IChat[]; isLoading: boolean; error: undefined } = useSWR(
    `/api/chats`,
    fetcher
  );

  return {
    chats: data,
    isLoading,
    error: error,
  };
}

function useChat(id: string | null) {
  const {
    data,
    mutate,
    isLoading,
  }: {
    data: IChat;
    isLoading: boolean;
    mutate: (v: any) => void;
  } = useSWR(`/api/chats/${id}`, fetcher);

  return {
    chat: data?._id ? data : null,
    isLoading,
    mutate,
  };
}

export {
  fetcher,
  poster,
  updater,
  useAUser,
  useAd,
  deleter,
  useChats,
  useChat,
  useAds,
  useProfile,
  useSearch,
};
