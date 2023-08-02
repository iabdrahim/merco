import useSWR from "swr";
import ALL from "../ALL.config";
import { IAd, IUser } from "./interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
const poster = (url: string, body: {}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((err) => err)
    .then((d) => d);
};

let API_URL = ALL.ApiEndPoint;
function useAd(id: string | any) {
  const {
    data,
    error,
    isLoading,
  }: { data: IAd; isLoading: boolean; error: undefined } = useSWR(
    `${API_URL}/ads/${id}`,
    fetcher
  );

  return {
    ad: data,
    isLoading,
    error: error,
  };
}

function setAd(body?: {}) {
  if (!body) return;
  let isLoading = true;
  let error = null;
  let res: any = poster(API_URL + "/ads", body);
  res.catch((err: Error) => ((isLoading = false), (error = err)));
  res.then((d: any) => d.json());
  res.then((d: any) => {
    isLoading = false;
    return d;
  });

  return {
    data: res,
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
    `${API_URL}/ads${query ? "?" + query : ""}`,
    fetcher
  );

  return {
    ads: data,
    isLoading,
    error: error,
  };
}
function useProfile() {
  const { user } = useUser();
  const {
    data,
    error,
    isLoading,
  }: { data: IUser; isLoading: boolean; error: undefined } = useSWR(
    `${API_URL}/auth/profile?email=${user?.email}&picture=${user?.picture}`,
    fetcher
  );

  return {
    profile: data,
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
    `${API_URL}/users/${id}`,
    fetcher
  );

  return {
    user: data,
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
    `${API_URL}/ads/search${queries ? queries : ""}`,
    fetcher
  );

  return {
    ads: data,
    isLoading,
    error: error,
  };
}
export { useAd, useAds, useSearch, useAUser, useProfile, setAd, fetcher };
