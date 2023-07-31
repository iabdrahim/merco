import React, { useState } from "react";
import { BiImageAdd, BiLeftArrow } from "react-icons/bi";
import Container from "../components/Container";
import {
  PiComputerTowerDuotone,
  PiBagSimpleDuotone,
  PiCarSimpleDuotone,
  PiHouseLineDuotone,
  PiTShirtDuotone,
  PiGameControllerDuotone,
  PiArmchairDuotone,
  PiDiceFourDuotone,
} from "react-icons/pi";
import ALL from "../ALL.config";

export default function Post() {
  let [adData, setData] = useState<{
    catagorie: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    city: string;
  }>({
    catagorie: "",
    title: "",
    description: "",
    price: 0,
    images: [""],
    city: "",
  });
  let onChangeCtg = (e: any) => {
    console.log(adData);
    document
      .querySelectorAll(".ctgs button.active")
      .forEach((el) => el.classList.remove("active"));
    setData({
      ...adData,
      catagorie: e.target.textContent.toLowerCase().trim(),
    });
    e.target.classList.add("active");
  };
  let postAd = async () => {
    let res = await fetch(ALL.ApiEndPoint + "/ads", {
      method: "POST",
      body: JSON.stringify(adData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await res.json();
    return data;
  };
  //upload a image to cloud
  let handleUpload = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ilmamcdn");
    let config: RequestInit = {
      method: "POST",
      body: data,
    };
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgvxswr30/image/upload",
      config
    );
    const file: { secure_url: string } = await res.json();

    setData({ ...adData, images: [...adData.images, file.secure_url] });
    // e.target.style.backgoroundImage=url
  };
  return (
    <div className="sell">
      <div className="back absolute left-4 top-4">
        <BiLeftArrow size={24} />
      </div>
      <Container className="flex justify-start items-center flex-col">
        <h2>Post an Ad</h2>
        <div className="table">
          <div className="">
            <h4>Catagorie</h4>
            <div className="ctgs w-full relative">
              <button onClick={onChangeCtg} className="active">
                electonics <PiComputerTowerDuotone />
              </button>
              <button onClick={onChangeCtg}>
                jobs <PiBagSimpleDuotone />
              </button>
              <button onClick={onChangeCtg}>
                automobiles <PiCarSimpleDuotone />
              </button>
              <button onClick={onChangeCtg}>
                estate <PiHouseLineDuotone />
              </button>
              <button onClick={onChangeCtg}>
                fashion <PiTShirtDuotone />
              </button>
              <button onClick={onChangeCtg}>
                entertainment <PiGameControllerDuotone />
              </button>
              <button onClick={onChangeCtg}>
                lifestyle <PiArmchairDuotone />
              </button>
              <button onClick={onChangeCtg}>
                others <PiDiceFourDuotone />
              </button>
            </div>
          </div>
          <div className="">
            <h4>Include Some Details</h4>
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Ad title
              </label>

              <input
                type="text"
                placeholder=""
                value={adData.title}
                onChange={(e) => setData({ ...adData, title: e.target.value })}
                name="title"
                className="mt-2 block w-full max-w-xs placeholder-gray-400/70 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-gray-700 focus:border-black focus:outline-none"
              />

              <p className="mt-1 text-sm text-gray-500">
                Mention the key features of your item (e.g. brand, model, age,
                type)
              </p>
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block mt-4 text-sm text-gray-500 dark:text-gray-300"
              >
                Description
              </label>

              <textarea
                placeholder=""
                value={adData.description}
                onChange={(e) =>
                  setData({ ...adData, description: e.target.value })
                }
                className="block mt-2 w-full max-w-sm placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border-2 border-gray-300 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-purple-400"
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                Include condition, features and reason for selling...
              </p>
            </div>
          </div>
          <div className="">
            <h4>Set a Price</h4>
            <div>
              <label
                htmlFor="price"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                price
              </label>

              <div className="flex items-center justify-start mt-2">
                <input
                  type="number"
                  placeholder="100"
                  min={3}
                  value={adData.price}
                  onChange={(e) =>
                    setData({ ...adData, price: Number(e.target.value) })
                  }
                  name="price"
                  className="block w-full max-w-xs rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-gray-700 focus:border-purple-400 focus:outline-none-purple-300"
                />
                <p className="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rounded-r-lg">
                  DH
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <h4>Upload Up To 6 Photos</h4>
            <div className="flex gap-4 flex-wrap">
              <div className="img">
                <BiImageAdd size={24} className="relative" />
                <input
                  type="file"
                  onInput={handleUpload}
                  className="opacity-0 absolute w-full h-full left-0 top-0"
                />
              </div>
              <div className="img">
                <input
                  type="file"
                  onInput={handleUpload}
                  className="opacity-0 absolute w-full h-full left-0 top-0"
                />
                <BiImageAdd size={24} />
              </div>
              <div className="img">
                <input
                  type="file"
                  onInput={handleUpload}
                  className="opacity-0 absolute w-full h-full left-0 top-0"
                />
                <BiImageAdd size={24} />
              </div>
              <div className="img">
                <BiImageAdd size={24} className="" />
                <input
                  type="text"
                  className="opacity-0 absolute w-full h-full -left-0 top-0"
                />
              </div>
              <div className="img">
                <input
                  type="file"
                  onInput={handleUpload}
                  className="opacity-0 absolute w-full h-full left-0 top-0"
                />
                <BiImageAdd size={24} />
              </div>
              <div className="img">
                <input
                  type="file"
                  onInput={handleUpload}
                  className="opacity-0 absolute w-full h-full left-0 top-0"
                />
                <BiImageAdd size={24} />
              </div>
            </div>
          </div>
          <div className="">
            <h4>Confirm Your Location</h4>
            <div className="flex flex-col gap-4">
              <label htmlFor="slist">City</label>
              <select
                name="slist"
                className="px-3 py-2"
                onChange={(e) => setData({ ...adData, city: e.target.value })}
              >
                <option value="Agadir" selected>
                  Agadir
                </option>
                <option value="Al Hoceima">Al Hoceima</option>
                <option value="Azilal">Azilal</option>
                <option value="Beni Mellal">Beni Mellal</option>
                <option value="Ben Slimane">Ben Slimane</option>
                <option value="Boulemane">Boulemane</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Chaouen">Chaouen</option>
                <option value="El Jadida">El Jadida</option>
                <option value="El Kelaa des Sraghna">
                  El Kelaa des Sraghna
                </option>
                <option value="Er Rachidia">Er Rachidia</option>
                <option value="Essaouira">Essaouira</option>
                <option value="Fes">Fes</option>
                <option value="Figuig">Figuig</option>
                <option value="Guelmim">Guelmim</option>
                <option value="Ifrane">Ifrane</option>
                <option value="Kenitra">Kenitra</option>
                <option value="Khemisset">Khemisset</option>
                <option value="Khenifra">Khenifra</option>
                <option value="Khouribga">Khouribga</option>
                <option value="Laayoune">Laayoune</option>
                <option value="Larache">Larache</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Meknes">Meknes</option>
                <option value="Nador">Nador</option>
                <option value="Ouarzazate">Ouarzazate</option>
                <option value="Oujda">Oujda</option>
                <option value="Rabat-Sale">Rabat-Sale</option>
                <option value="Safi">Safi</option>
                <option value="Settat">Settat</option>
                <option value="Sidi Kacem">Sidi Kacem</option>
                <option value="Tangier">Tangier</option>
                <option value="Tan-Tan">Tan-Tan</option>
                <option value="Taounate">Taounate</option>
                <option value="Taroudannt">Taroudannt</option>
                <option value="Tata">Tata</option>
                <option value="Taza">Taza</option>
                <option value="Tetouan">Tetouan</option>
                <option value="Tiznit">Tiznit</option>
              </select>
            </div>
          </div>
          <div className="">
            <h4>Rreview Your Details</h4>
            <div className="name">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="">
                <label htmlFor="">name</label>
                <input type="text" />
              </div>
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                phone number
              </label>

              <div className="flex items-center mt-2">
                <p className="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">
                  +212
                </p>
                <input
                  type="number"
                  placeholder="100"
                  name="number"
                  className="block w-full max-w-xs rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-gray-700 focus:border-purple-400 focus:outline-none-purple-300"
                />
              </div>
            </div>
          </div>
          <div className="">
            <button className="post" onClick={() => postAd()}>
              post Now
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
