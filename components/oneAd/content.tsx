import { useState } from "react";
import { IAd } from "../../utils/interfaces";
import { useSearch } from "../../utils/useApi";
import Cards from "../cards";

export default function Content({ ad }: { ad: IAd }) {
  let { ads, isLoading, error } = useSearch("?catagorie=" + ad.catagorie);
  let [selectedImage, setSelected] = useState(0);
  return (
    <section className="w-full flex justify-start items-start flex-col gap-4 ">
      <div className="bigImage w-full flex flex-col gap-4">
        <div className="banner w-full">
          <img
            src={
              ad.images[selectedImage] ||
              "https://content.avito.ma/classifieds/images/10102722141?t=images"
            }
            alt=""
          />
        </div>
        <div className="imgs">
          {ad.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`img ${selectedImage == i ? "active" : ""}`}
            >
              <img src={img || ""} alt={ad.title} />
            </div>
          ))}
        </div>
      </div>
      <div className="desc">
        <h3>Description</h3>
        <p>{ad.description}</p>
      </div>
      <div className="over">
        <h3>Ad Overview</h3>
        <div className="table">
          {ad.details.map((d) => (
            <div
              key={d._id}
              className="flex flex-col items-start justify-start"
            >
              <span>{d.name}</span>
              <h5>{d.value}</h5>
            </div>
          ))}
        </div>
        <div className="more mt-8">
          <h3>Find More like that:</h3>
          <Cards data={ads?.filter((e) => e._id != ad._id)} />
        </div>
      </div>
    </section>
  );
}
