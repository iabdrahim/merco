import React from "react";

export default function Howwork() {
  return (
    <section className="howitwork w-full">
      <h4>How Stany works</h4>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
      <div className="steps flex gap-4 max-md:flex-col w-full justify-center items-center">
        <div className="step flex justify-center flex-col items-center gap-2">
          <img
            src="https://spn-sta.spinny.com/spinny-web/static-images/assets/images/pages/HomePage/components/CarBuyingProcess/assets/choose_from_the_best_pre_owned_cars.png?w=500"
            alt=""
          />
          <h4>Find An Ad</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="step flex justify-center flex-col items-center gap-2">
          <img
            src="https://spn-sta.spinny.com/spinny-web/static-images/assets/images/pages/HomePage/components/CarBuyingProcess/assets/take_a_test_drive_at_your_home_or_spinny_hub.png?w=500"
            alt=""
          />
          <h4>Order an ad</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="step flex justify-center flex-col items-center gap-2">
          <img
            src="https://spn-sta.spinny.com/spinny-web/static-images/assets/images/pages/HomePage/components/CarBuyingProcess/assets/online_payment_doorstep_delivery.png?w=500"
            alt=""
          />
          <h4>Find An Ad</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </section>
  );
}
