import Bestofall from "./components/bestofall";

import Dontmiss from "./components/dontmiss";
import Essentials from "./components/categories";
import Featured from "./components/featured";

import Footerhead from "./components/footerhead";
import Gearup from "./components/gearup";

import Hero from "./components/hero";
// import Getproducts from "./components/getproducts";

export default function Home() {
  return (
    <>
    
      <Hero />
      {/* <Getproducts/> */}
      <Bestofall />
      <Featured />
      <Gearup />
      <Dontmiss />
      <Essentials />
      <Footerhead />
    </>
  );
}
