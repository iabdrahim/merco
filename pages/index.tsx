import Container from "../components/Container";
import Header from "../components/headers/homeHeader";
import Featured from "../components/ui/featured";
import Catagories from "../components/ui/catagories";
import Howwork from "../components/ui/howwork";
export default function Page() {
  return (
    <>
      <Header />
      <Catagories />
      <Howwork />
      <Container>
        <Featured />
      </Container>
    </>
  );
}
