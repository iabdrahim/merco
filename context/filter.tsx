import { createContext, useState, useEffect } from "react";
export const filterQueryContext = createContext({
  filterQuery: {
    q: "",
    city: "",
    catagorie: "",
    tags: [""],
    priceRange: "10-90",
    sort: "",
    limit: 10,
  },
  setFilterQuery: (v: any) => {},
});
export default function EditorProvider({ children }: { children: any }) {
  const [filterQuery, setFilterQuery] = useState({
    q: "",
    city: "",
    catagorie: "",
    tags: [],
    priceRange: "0-0",
    sort: "",
    limit: 10,
  });
  let [isLoad, isDataLoad] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("filterQuery")) {
      setFilterQuery(JSON.parse(localStorage.getItem("filterQuery") || ""));
    }
    isDataLoad(true);
  }, []);

  let stringQuery = (obj: any) => {
    let str = "";
    let sortDec: any = {
      Oldest: "createdAt",
      Newest: "-createdAt",
      Popular: "-loved",
      Highestprice: "price",
      Lowestprice: "-price",
    };
    let obs = Object.entries(obj);
    for (let i: number = 0; i < obs.length; i++) {
      let k = obs[i][0];
      let v = obs[i][1] as string;
      if (v) {
        if (k == "sort") {
          v = v.replaceAll(" ", "");
          v = sortDec[v];
        }
        str += `${k}=${Array.isArray(v) ? v.join(",") : v}|`;
      }
    }
    let arr = str.split("|");
    arr = arr.filter((el) => el != "");

    return "?" + arr.join("&");
  };
  useEffect(() => {
    let getTag = (tg: string) => {
      if (!tg) return;
      let btn: any = null;
      document
        .querySelectorAll("ul.tagsList li")
        .forEach((e) => (e.textContent?.trim() == tg ? (btn = e) : false));
      if (!btn) return;
      btn.firstElementChild?.classList.add("checked");
    };
    let getCtg = (ctg: string) => {
      document
        .querySelectorAll(".ctgs button.active")
        .forEach((el) => el.classList.remove("active"));
      let btn: any = null;
      document
        .querySelectorAll(".ctgs button")
        .forEach((e) =>
          e.textContent?.toLowerCase() == ctg.toLowerCase() ? (btn = e) : false
        );
      if (btn) {
        btn.className = "active";
      }
    };
    let makeSort = (s: string) => {
      if (!s) return;
      let btn: any = null;
      document
        .querySelectorAll(".sortingList > button.active")
        .forEach((el) => el.classList.remove("active"));
      document
        .querySelectorAll(".sortingList > button")
        .forEach((e) => (e.textContent?.trim() == s ? (btn = e) : false));

      if (!btn) return;
      btn.classList.add("active");
    };

    if (filterQuery.catagorie) {
      getCtg(filterQuery.catagorie);
    }
    if (filterQuery.tags) {
      filterQuery.tags.forEach((el: string) => {
        getTag(el);
      });
    }
    if (filterQuery.sort) {
      makeSort(filterQuery.sort);
    }
  }, []);

  // get localstorage
  useEffect(() => {
    if (!isLoad) return;
    localStorage.setItem("filterQuery", JSON.stringify(filterQuery));
    console.log(stringQuery(filterQuery));
  }, [filterQuery, isLoad]);

  useEffect(() => {
    if (!isLoad) return;
    let getTag = (tg: string) => {
      if (!tg) return;
      let btn: any = null;
      document
        .querySelectorAll("ul.tagsList li")
        .forEach((e) => (e.textContent?.trim() == tg ? (btn = e) : false));
      if (!btn) return;
      btn.firstElementChild?.classList.add("checked");
    };
    let getCtg = (ctg: string | string[]) => {
      document
        .querySelectorAll(".ctgs button.active")
        .forEach((el) => el.classList.remove("active"));
      let btn: any = null;
      document
        .querySelectorAll(".ctgs button")
        .forEach((e) => (e.textContent?.trim() == ctg ? (btn = e) : false));
      if (btn) {
        btn.className = "active";
      }
    };
    let makeSort = (s: string) => {
      if (!s) return;
      let btn: any = null;
      document
        .querySelectorAll(".sortingList > button.active")
        .forEach((el) => el.classList.remove("active"));
      document
        .querySelectorAll(".sortingList > button")
        .forEach((e) => (e.textContent?.trim() == s ? (btn = e) : false));
      console.log(
        document.querySelector(".sortingList > button")?.textContent?.trim(),
        s
      );
      if (!btn) return;
      btn.classList.add("active");
    };

    if (filterQuery.catagorie) {
      getCtg(filterQuery.catagorie);
    }
    if (filterQuery.tags) {
      filterQuery.tags.forEach((el: string) => {
        getTag(el);
      });
    }
    if (filterQuery.sort) {
      makeSort(filterQuery.sort);
    }
  }, [isLoad]);
  return (
    <filterQueryContext.Provider value={{ filterQuery, setFilterQuery }}>
      {children}
    </filterQueryContext.Provider>
  );
}
