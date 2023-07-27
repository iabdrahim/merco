import { IAd } from "../../utils/interfaces";
import { useSearch } from "../../utils/useApi";
import Cards from "../cards";

export default function Content({ ad }: { ad: IAd }) {
  let { ads, isLoading, error } = useSearch(
    "?tags=" + ad.tags.join(",") + "&catagorie=" + ad.catagorie
  );
  return (
    <section className="w-full flex justify-start items-start flex-col gap-4 ">
      <div className="bigImage w-full flex flex-col gap-4">
        <div className="banner w-full">
          <img
            src="https://content.avito.ma/classifieds/images/10102722141?t=images"
            alt=""
          />
        </div>
        <div className="imgs">
          <div className="img active">
            <img
              src="https://content.avito.ma/classifieds/images/10102722141?t=images"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="desc">
        <h3>Description</h3>
        <p>{ad.description}</p>
      </div>
      <div className="over">
        <h3>Ad Overview</h3>
        <div className="table">
          <div className="flex flex-col items-start justify-start">
            <span>State</span>
            <h5>really cool</h5>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span>State</span>
            <h5>really cool</h5>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span>State</span>
            <h5>really cool</h5>
          </div>
        </div>
        <div className="more mt-8">
          <h3>Find More like that:</h3>
          <Cards data={ads} />
        </div>
      </div>
    </section>
  );
}
