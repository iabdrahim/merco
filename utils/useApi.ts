import useSWR from "swr";
import ALL from "../ALL.config";
import { IAd } from "./interfaces";
const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
const poster = (url: string, body: {}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
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
  let res = poster(API_URL + "/ads", body);
  res.catch((err) => (error = err));

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
function useUser(id: unknown) {
  const {
    data,
    error,
    isLoading,
  }: { data: IAd; isLoading: boolean; error: undefined } = useSWR(
    `${API_URL}/users/${id}`,
    fetcher
  );

  return {
    ads: data,
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
export { useAd, useAds, useSearch, useUser, setAd, fetcher };
